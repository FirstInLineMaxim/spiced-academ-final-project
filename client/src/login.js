import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
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

    handleClick(e) {
        console.log("handleClick ", this.state);
        e.preventDefault();
        axios.post("/home/login", this.state)
            .then(({ data }) => {
                console.log("data ", data);
                if (data.error) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/");
                }
            }).catch((error) => {
                console.log("error on axios.post /login: ", error);
            });
    }

    render() {
        return (
            <div className="formField">
                <div className="header">
                    <h2>Login</h2>
                    <p>login here using your email and password</p>
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

                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        placeholder="Password"
                        type="password"
                        required
                    />

                    <button onClick={(e) => this.handleClick(e)}>Enter</button>
                </div>
                <Link to="/">
                    <button className="sig-up submits">Sign Up</button>
                </Link>
                <Link to="/reset-password">
                    <button className="frgt-pass submits">
                        New Password?
                    </button>
                </Link>
            </div>
        );
    }
}