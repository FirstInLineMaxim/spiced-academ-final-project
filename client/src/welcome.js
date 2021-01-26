import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./home.js";
import Logo from "./logo";
import Registration from "./registration.js";
import Login from "./login.js";
import ResetPassword from "./reset.js";
import { Link } from "react-router-dom";


export default function Welcome() {
    return (
        <>
            <HashRouter>
                <>
                    <header>
                        <Link to="/">
                            <Logo />
                        </Link>
                        <h1>DUAFE</h1>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/registration">
                                        <p>Sign Up</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login">
                                        <p>Login</p>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <Route exact path="/" component={Home} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                </>
            </HashRouter>
        </>
    );
}