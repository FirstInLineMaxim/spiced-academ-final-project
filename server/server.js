const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bc");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require( "./ses");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
const { s3Url } = require("./config.json");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

let secret;
process.env.NODE_ENV === "production"
    ? (secret = process.env)
    : (secret = require("./secrets.json"));

app.use(
    express.json({
        extended: false,
    })
);

const cookieSessionMiddleware = 
    cookieSession({
        secret: `${secret}`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
    });

//this MUST come after cookie session
app.use(cookieSessionMiddleware);

//this is socket stuff
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));


app.get("/home", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/home/registration", (req, res) => {
    const { first, last, email, password} = req.body;
    hash(password)
        .then((hashedPw) => {
            db.addUser(first, last, email, hashedPw)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.json({ error: false });
                })
                .catch((error) => {
                    console.log("error in addUser: ", error);
                    res.json({ error: true });
                });
        })
        .catch((error) => {
            console.log("error in hash: ", error);
        });
});

app.post("/home/login", (req, res) => {
    const { email, password } = req.body;
    db.getUserInfo(email)
        .then(({ rows }) => {
            if (rows.length > 0) {
                compare(password, rows[0].password)
                    .then((result) => {
                        if (result) {
                            req.session.userId = rows[0].id;
                            res.json({ error: false });
                        } else {
                            res.json({ error: true });
                        }
                    }).catch((error) => {
                        console.log("error in compare password", error);
                        res.json({ error: true });
                    });
            } else {
                res.json({ error: true });
            }
        }).catch((error) => {
            console.log("error in getUserInfo", error);
            res.json({ error: true });
        });
});

app.post("/home/reset-password/start", (req, res) => {
    const { email } = req.body;
    db.getUserEmail(email)
        .then(({ rows }) => {
            if (rows.length > 0) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                db.addCode(email, secretCode)
                    .then(() => {
                        //send the email
                        var subj = "Social Network Password Reset";
                        var msg = 
`Greetings from Social Network,

To reset your password for Social Network, please enter the followingcode and the new password in the reset password page.
    ${secretCode}

If you don't want to reset your password, you can ignore this message - someone probably typed in your username or email address by mistake.
                        
Thanks! 
Team Social Network`;
                        sendEmail(email, msg, subj)
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch((error) => {
                                console.log("error in sendEmail", error);
                                res.json({ error: true });
                            });
                    })
                    .catch((error) => {
                        console.log("error in addCode", error);
                        res.json({ error: true });
                    });
            } else {
                res.json({ error: true });
            }
        })
        .catch((error) => {
            console.log("error in getUserEmail", error);
            res.json({ error: true });
        });
});

app.post("/home/reset-password/verify", (req, res) => {
    const { email, resetCode, password } = req.body;
    db.getCode(email)
        .then(({ rows }) => {
            if (resetCode === rows[0].code) {
                console.log('alterar senha');
                hash(password)
                    .then((hashedPw) => {
                        db.editPassword(email, hashedPw)
                            .then(({rows}) => {
                                console.log("editPassword worked", rows);
                                res.json({ success: true });
                            }).catch((error) => {
                                console.log('error in editPassword', error);
                                res.json({ error: true });
                            });
                    });
            } else {
                console.log('code doesnt match');
                res.json({ error: true });
            }
        })
        .catch((error) => {
            console.log('error in getCode: ', error);
            res.json({ error: true });
        });
});

app.get('/profile.json', (req, res) => {
    db.getUserProfile(req.session.userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        }).catch((error) => {
            console.log("error in /profile route - getUserProfile", error);
            res.json({ error: true });
        });
});

app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    if (req.file) {
        const url = `${s3Url}${req.session.userId}/${req.file.filename}`;
        console.log('url', url);
        db.editProfilePic(req.session.userId, url)
            .then(() => {
                res.json({ sucess: true, url: url });
            })
            .catch((error) => {
                console.log("Error in editProfilePic: ", error);
                res.json({ error: true });
            });
    } else {
        res.json({ error: true });
    }
});

app.post(("/edit-bio"), (req, res) => {
    const { draftBio } = req.body;
    db.editBio(req.session.userId, draftBio)
        .then(() => {
            res.json({
                success: true,
                bio: draftBio
            });
        })
        .catch((error) => {
            console.log("error in editBio", error);
            res.json({ error: true });
        });
});

app.post("/delete-bio", (req, res) => {
    const draftBio = null;
    db.editBio(req.session.userId, draftBio)
        .then(() => {
            res.json({
                success: true,
                bio: draftBio,
            });
        })
        .catch((error) => {
            console.log("error in editBio", error);
            res.json({ error: true });
        });
});

app.post("/delete-profile-pic", s3.delete, (req, res) => {
    const newUrl = null;
    db.editProfilePic(req.session.userId, newUrl)
        .then(() => {
            res.json({ sucess: true, url: newUrl });
        })
        .catch((error) => {
            console.log("Error in delete-profile-pic: ", error);
            res.json({ error: true });
        });

});

app.get("/member/:id", (req, res) => {
    const { id } = req.params;
    db.getOtherUserProfile(id)
        .then(({ rows }) => {
            if (rows.length > 0) {
                rows[0]["loggedId"] = req.session.userId;
                rows[0].success = true;
                res.json(rows[0]);
            } else {
                res.status(404);
            }
        })
        .catch((error) => {
            console.log("/member/:id error ", error);
            res.json({ error: true });
        });
});

app.get("/latest-users", (req, res) => {
    db.getUsers()
        .then(({ rows }) => {
            res.json(rows);
        }).catch((error) => {
            console.log("/latest-users error ", error);
            res.json({ error: true });
        });
});

app.get("/find-users/:query", (req, res) => {
    db.getMatchingPeople(req.params.query)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((error) => {
            console.log("/find-users/ error ", error);
            res.json({ error: true });
        });
});


app.get('/logout', (req, res) => {
    req.session.userId = null;
    res.json({ logout: true });
});

app.post("/delete-account", (req, res) => {
    db.deleteAccountChat(req.session.userId)
        .then(() => {
            console.log("next");
            db.deleteAccountFriendships(req.session.userId)
                .then(() => {
                    console.log('next2');
                    db.deleteAccountUsers(req.session.userId)
                        .then(() => {
                            console.log("next3");
                            req.session.userId = null;
                            res.redirect("/home");
                            localStorage.clear();
                        })
                        .catch((error) => {
                            console.log("error deleteAccountUsers", error);
                        });
                })
                .catch((error) => {
                    console.log("error deleteAccountFriendships", error);
                });
        })
        .catch((error) => {
            console.log("error deleteAccountChat", error);
        });
});

app.post('/delete-comment', (req, res) => {
    const { msgId } = req.body;
    console.log("/delete-comment", msgId);
    db.deleteMsgChat(msgId)
        .then(({ rows }) => {
            res.json(rows);
            console.log("rows", rows);
        })
        .catch((error) => {
            console.log("error", error);
        });
});

app.post("/questionnaire", (req, res) => {
    const { hairType, hairHealth } = req.body;
    console.log("post request on /questionnaire", req.body);
    db.addSurveyResults(req.session.userId, hairType, hairHealth)
        .then(() => {
            console.log("addSurveyResults worked");
            res.json({ success: true });
        })
        .catch((error) => {
            console.log("error in addSurveyResults", error);
            res.json({ error: true });
        });
});

app.get("/questionnaire-results/:hairHealth", (req, res) => {
    console.log("get request to /questionnaire-results", req.params);
    const { hairHealth } = req.params;
    if (hairHealth != 'undefined') {
        db.getSurveyResults(hairHealth)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch((error) => {
                console.log("error in addSurveyResults", error);
                res.json({ error: true });
            });
    } else {
        return;
    }
});

//ALWAYS AT THE END BEFORE THE app.listen
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/home");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

//this is our socket code. we will write 100% of our erver-side socket code here
io.on('connection', (socket) => {
    // console.log(`Socket with id ${socket.id} just connected!`);
    // console.log(
    //     `UserId ${socket.request.session.userId} just connected!`
    // );

    //when the user post a new message...
    socket.on("New message", (data) => {
        //this will run whatever the user posts a new chat message!
        //1. INSERT new message into a our new 'chat_messages' table
        db.newMessage(socket.request.session.userId, data)
            .then(({ rows }) => {
                const { message, create_at, id } = rows[0];
                // 2. emit a message back to the client
                db.getUserProfile(socket.request.session.userId).then(
                    ({ rows }) => {
                        const { profile_pic, full_name } = rows[0];
                        io.sockets.emit("New message and user", {
                            message: message,
                            create_at: create_at,
                            id: id,
                            profile_pic: profile_pic,
                            full_name: full_name,
                        });
                    });
            })
            .catch((error) => {
                console.log("error in newMessage", error);
            });
    });

    //code for redenring the messages
    db.getMostRecentMessages()
        .then(({ rows }) => {
            socket.emit("Most recent messages", rows);
        })
        .catch((error) => {
            console.log("error in getMostRecentMessages", error);
        });
    
    socket.on("disconnect", () => {
        // console.log(`Socket with id: ${socket.id} just disconnected`);
    });
});// closes io.on('connection')
