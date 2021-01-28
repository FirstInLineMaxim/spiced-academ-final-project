import { Link } from "react-router-dom";
import Logo from "./logo";

export default function Home() {
    return (
        <>
            <header>
                <Logo />
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
            <div className="home-page">
                <div className="grid">
                    <div className="item-1">
                        <h2>Get Your Dream Hair</h2>
                        <p>
                            Finding the right products and creating a hair care
                            routine that fits your type is a very personal and
                            challenging process. This is why we want to help
                            you.
                            <h3>What is the hair care schedule?</h3>
                            <p>
                                Basically, it is a treatment schedule that
                                preserves and improves the health of your hair
                                to keep them shiny and smooth.
                            </p>
                        </p>
                    </div>
                    <div className="item-2 aside-image">
                        <img src="../home1.png" />
                    </div>
                </div>
                <div className="grid">
                    <div className="item-1 bottom-1">
                        <h2>Customize Your Hair Care Routine</h2>
                        <p>
                            While creating your profile, you specify your hair
                            type, style and condition to discover what
                            your hair really needs. <br></br>Change your
                            routine whenever you want.<br></br>
                            <br></br>
                            <Link to="/registration">
                                <span>Your journey starts here!</span>
                            </Link>
                        </p>
                    </div>
                    <div className="item-2 bottom-2 aside-image">
                        <img src="../home2.png" />
                    </div>
                </div>
            </div>
        </>
    );
}