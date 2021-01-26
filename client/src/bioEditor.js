import { Component } from "react";
import axios from "./axios";


export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draftBio: "",
            textareaVisible: false,
            error: false,
        };
    }

    
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange")
        );
    }

    toggleTextarea() {
        this.setState({
            textareaVisible: !this.state.textareaVisible,
        });
    }

    submitBio(e) {
        e.preventDefault();
        console.log("handleUploadBio");
        axios.post("/edit-bio", this.state)
            .then(({ data }) => {
                console.log("data", data);
                this.setState({ textareaVisible: false });
                this.props.setBio(data.bio);                    

            }).catch((error) => {
                console.log('error ', error);
                this.setState({
                    error: true,
                });
            });
    }

    deleteBio(e) {
        e.preventDefault();
        console.log('deleteBio');
        axios.post("/delete-bio", this.state)
            .then(({ data }) => {
                console.log("data", data);
                this.setState({ textareaVisible: false });
                this.props.setBio(data.bio); 
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
            <div className="bio-container">
                {this.state.error && (
                    <p className="errorMessage">
                        Something went wrong. Please try again
                    </p>
                )}
                {!this.state.textareaVisible && (
                    <div className="bio">
                        {this.state.textareaVisible && (
                            <textarea
                                name="draftBio"
                                onChange={(e) => this.handleChange(e)}
                                defaultValue={this.props.bio}
                            />
                        )}
                        {!this.props.bio && !this.state.textareaVisible && (
                            <p onClick={() => this.toggleTextarea()}>
                                <span className="add-bio">
                                    Add your bio now
                                </span>
                            </p>
                        )}

                        {this.props.bio && !this.state.textareaVisible && (
                            <p>{this.props.bio}</p>
                        )}

                        {this.props.bio && !this.state.textareaVisible && (
                            <p onClick={() => this.toggleTextarea()}>
                                <span className="edit">Edit bio</span>
                            </p>
                        )}

                        {this.props.bio && !this.state.textareaVisible && (
                            <p onClick={(e) => this.deleteBio(e)}>
                                <span className="delete">Delete Bio</span>
                            </p>
                        )}

                        {this.state.textareaVisible && (
                            <button onClick={(e) => this.submitBio(e)}>
                                Save
                            </button>
                        )}
                    </div>
                )}

                {this.state.textareaVisible && (
                    <div className="overlay">
                        <div className="bio-edit formField">
                            <div className="header">
                                <h2>Edit your Bio</h2>
                                {this.state.error && (
                                    <p className="errorMessage">
                                        Something went wrong. Please try again
                                    </p>
                                )}
                            </div>
                            <div className="form">
                                {this.state.textareaVisible && (
                                    <textarea
                                        name="draftBio"
                                        placeholder="Add your bio here"
                                        onChange={(e) => this.handleChange(e)}
                                        defaultValue={this.props.bio}
                                    />
                                )}

                                {this.state.textareaVisible && (
                                    <button onClick={(e) => this.submitBio(e)}>
                                        Save
                                    </button>
                                )}
                            </div>
                            <div
                                className="outer"
                                onClick={() => this.toggleTextarea()}
                            >
                                <div className="inner">
                                    <label>Close</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}