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
            .post("/delete-account", this.state)
            .then(() => {
                location.replace("/");
            })
            .catch((error) => {
                console.log("error in deleteaccount", error);
            });
    };

    return (
        <>
            <div className="overlay">
                <div className="uploadModal formField">
                    <header>
                        <h2>Account</h2>
                    </header>
                    <div className="form">
                        <button onClick={function(event){toggleMenu(event); toggleUploader();}}>Edit profile</button>
                        <button
                            className="deleteAcc"
                            onClick={() =>
                                window.confirm(
                                    "Are your sure you wish to delete your account?"
                                ) && deleteAccout
                            }
                        >
                            Delete account
                        </button>
                        <button onClick={logout}>Logout</button>
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