const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "magaliimageboard", //my own bucket
            ACL: "public-read", //basically people can view this filepublic
            Key: `${req.session.userId}/${filename}`,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise(); //this makes it returns any promises

    promise
        .then(() => {
            console.log("amazon upload complete :)");
            next();
            fs.unlink(path, () => {});
        })
        .catch((err) => {
            console.log("Something went wrong in uploading to S3", err);
            res.statusCode(404);
        });
};

module.exports.delete = (req, res, next) => {
    console.log(req.body.image);
    const filename = req.body.profile_pic.substr(42);

    const promise = s3
        .deleteObject({
            Bucket: "magaliimageboard", //my own bucket
            Key: filename,
        })
        .promise(); //this makes it returns any promises

    promise
        .then(() => {
            console.log("amazon delete complete :)");
            next();
        })
        .catch((err) => {
            console.log("Something went wrong in deletion to S3", err);
            res.statusCode(404); //confirm if this error is correct
        });
};
