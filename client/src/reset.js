import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            view: 0,
        };
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange: ")
        );
    }

    sendCode(e) {
        console.log("handleClick ", this.state);
        e.preventDefault();
        axios
            .post("/home/reset-password/start", this.state)
            .then(({ data }) => {
                console.log("data ", data);
                if (!data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState({
                        view: 1,
                    });
                }
            })
            .catch((error) => {
                console.log(
                    "error on axios.post /reset-password/start: ",
                    error
                );
                this.setState({
                    error: true,
                });
            });
    }

    resetPassword(e) {
        console.log("handleClick ", this.state);
        e.preventDefault();
        axios
            .post("/home/reset-password/verify", this.state)
            .then(({ data }) => {
                console.log("res ", data);
                if (!data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState({
                        view: 2,
                    });
                }
            })
            .catch((error) => {
                console.log(
                    "error on axios.post /reset-password/start: ",
                    error
                );
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        if (this.state.view === 2) {
            return (
                <div className="formField">
                    <div className="header">
                        <h2>Reset Password</h2>
                        {this.state.error && (
                            <p className="errorMessage">
                                Something went wrong. Please try again
                            </p>
                        )}
                    </div>
                    <div className="form">
                        <p>Your password was sucessfully updated! </p>
                        <Link to="/login">
                            <button>Log In</button>
                        </Link>
                    </div>
                </div>
            );
        } else if (this.state.view === 1) {
            return (
                <div className="formField">
                    <div className="header">
                        <h2>Reset Password</h2>
                        <p>
                            Please enter the code that was recently sent to you
                            and your new password
                        </p>
                        {this.state.error && (
                            <p className="errorMessage">
                                Something went wrong. Please try again
                            </p>
                        )}
                    </div>
                    <div className="form">
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="resetCode"
                            placeholder="Code"
                            type="text"
                            required
                        />
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="password"
                            placeholder="Password"
                            type="password"
                            required
                        />
                        <button onClick={(e) => this.resetPassword(e)}>
                            Reset Password
                        </button>
                    </div>
                    <Link to="/login">
                        <div
                            className="outer"
                            onClick={() => this.props.toggleUploader()}
                        >
                            <div className="inner">
                                <label>Cancel</label>
                            </div>
                        </div>
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="formField">
                    <div className="header">
                        <h2>Reset Password</h2>
                        <p>
                            Please enter your e-mail to receive a
                            reset code
                        </p>
                        {this.state.error && (
                            <p className="errorMessage">
                                Something went wrong. Please try again
                            </p>
                        )}
                    </div>
                    <div className="form">
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="email"
                            placeholder="Email"
                            type="text"
                            required
                        />
                        <button onClick={(e) => this.sendCode(e)}>
                            Send Reset Code
                        </button>
                    </div>
                    <Link to="/login">
                        <div
                            className="outer"
                            onClick={() => this.props.toggleUploader()}
                        >
                            <div className="inner">
                                <label>Back</label>
                            </div>
                        </div>
                    </Link>
                </div>
            );
        }
    }
}
