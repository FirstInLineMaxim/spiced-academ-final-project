import axios from "./axios";

export default function Account({ toggleMenu, toggleUploader }) {
    const logout = () => {
        axios
            .get("/logout")
            .then(() => {
                location.replace("/");
            })
            .catch((error) => {
                console.log("error in logout", error);
            });
    };

    const deleteAccout = () => {
        console.log("deleteaccount");
        axios
            .post("/delete-account")
            .then(() => {
                location.replace("/");
                localStorage.clear();
            })
            .catch((error) => {
                console.log("error in deleteaccount", error);
            });
    };

    return (
        <>
            <div className="overlay">
                <div className="uploadModal formField">
                    <div className="header">
                        <h2>Account</h2>
                    </div>
                    <div className="form">
                        <button
                            onClick={function (event) {
                                toggleMenu(event);
                                toggleUploader();
                            }}
                        >
                            Edit profile
                        </button>
                        <button
                            className="deleteAcc"
                            onClick={() =>
                                window.confirm(
                                    "Are your sure you wish to delete your account?"
                                ) && 
                                deleteAccout()
                            }
                        >
                            Delete account
                        </button>
                        <button className='logout' onClick={logout}>Logout</button>
                    </div>
                    <div className="outer" onClick={toggleMenu}>
                        <div className="inner">
                            <label>Close</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}