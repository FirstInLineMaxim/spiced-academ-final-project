import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.image,
            uploading: "",
            hidden: "",
            error: false,
        };
    }

    handleChange(e) {
        this.setState(
            {
                image: e.target.files[0],
            },
            () => console.log("this.state in handleChange: ", e.target.files[0])
        );
    }

    handleUpload(e) {
        e.preventDefault();
        this.setState({
            uploading: "spinner",
            hidden: "hidden",
        });
        var formData = new FormData();
        formData.append("image", this.state.image);
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                if (data.sucess) {
                    this.props.setImage(data.url);
                    this.props.toggleUploader();
                } else {
                    this.setState({
                        error: true,
                        uploading: "",
                        hidden: "",
                    });
                }
            })
            .catch((error) => {
                console.log("error ", error);
                this.setState({
                    error: true,
                    uploading: "",
                    hidden: "",
                });
            });
    }

    handleDeleteImage(e) {
        e.preventDefault();
        axios
            .post("/delete-profile-pic", this.state)
            .then(({ data }) => {
                if (data.sucess) {
                    this.props.setImage(data.url);
                    this.props.toggleUploader();
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((error) => {
                console.log("error ", error);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="overlay">
                <div className="uploadModal formField">
                    <header>
                        <h2>Profile</h2>
                        {this.state.error && (
                            <p className="errorMessage">
                                Something went wrong. Please try again 
                            </p>
                        )}
                    </header>
                    <div className="form">
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="image"
                            placeholder="Profile Picture"
                            type="file"
                            accept="image/*"
                            className="inputfile"
                        />
                        <button
                            className="update"
                            onClick={(e) => this.handleUpload(e)}
                        >
                            <span className={this.state.uploading}></span>
                            <span className={this.state.hidden}>Update</span>
                        </button>
                        {this.props.image && (
                            <button
                                className="delete"
                                onClick={(e) => this.handleDeleteImage(e)}
                            >
                                Delete Image
                            </button>
                        )}
                    </div>
                    <div
                        className="outer"
                        onClick={() => this.props.toggleUploader()}
                    >
                        <div className="inner">
                            <label>Close</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}