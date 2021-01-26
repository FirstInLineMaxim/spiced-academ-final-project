import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./home.js";
import Registration from "./registration.js";
import Login from "./login.js";
import ResetPassword from "./reset.js";

export default function Welcome() {
    return (
        <>
            <HashRouter>
                <>
                    <Route exact path="/" component={Home} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                </>
            </HashRouter>
        </>
    );
}