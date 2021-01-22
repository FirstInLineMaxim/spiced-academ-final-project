import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        }, 
        () => console.log("this.state in handleChange: ")
        );
    }

    handleClick(e) {
        console.log("handleClick ", this.state);
        e.preventDefault();
        axios
            .post("/home/registration", this.state)
            .then(({ data }) => {
                console.log("data", data);
                if (data.error) {
                    this.setState({
                        error: true,
                    });
                } else {
                    //relocate to questionary page
                    location.replace("/questionnaire");
                }
            })
            .catch((error) => {
                console.log("error on axios.post /registration: ", error);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="formField">
                <div className="form">
                    <header>
                        <h2>Registration</h2>
                        <p>
                            join millions of cool peolple sharing their experiences
                        </p>
                        {this.state.error && (
                            <p>
                                <span className="errorMessage">
                                    Something went wrong. Please try again
                                </span>
                            </p>
                        )}
                    </header>

                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="first"
                        placeholder="First Name"
                        type="text"
                        required
                    />

                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="last"
                        placeholder="Last Name"
                        type="text"
                        required
                    />

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
                    <button
                        className="sig-up"
                        onClick={(e) => this.handleClick(e)}
                    >
                        Sign Up
                    </button>
                    <p>If you are already a member</p>
                    <Link to="/login">
                        <button className="log-in">Log In</button>
                    </Link>
                </div>
            </div>
        );
    }
}