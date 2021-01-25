import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <h1>HOME</h1>
            <Link to="/registration">
                <h1>SIGNUP</h1>
            </Link>
            <Link to="/login">
                <h1>LOGIN</h1>
            </Link>
        </>
    );
}