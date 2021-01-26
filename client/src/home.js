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
                        <h2>
                            I am baby biodiesel four loko copper mug hoodie.
                        </h2>
                        <p>
                            I am baby biodiesel four loko copper mug hoodie.
                            Stumptown scenester selfies pinterest. Succulents
                            bitters shoreditch, microdosing organic messenger
                            bag mixtape thundercats beard typewriter street art
                            health goth VHS DIY godard. Gluten-free pinterest
                            kinfolk kogi thundercats seitan taiyaki. Iceland
                            retro fixie plaid chillwave etsy single-origin
                            coffee live-edge vaporware air plant knausgaard
                            williamsburg glossier.
                        </p>
                    </div>
                    <div className="item-2">
                        <img src="../home1.svg" />
                    </div>
                </div>
                <div className="grid">
                    <div className="item-1 bottom-1">
                        <h2>
                            I am baby biodiesel four loko copper mug hoodie.
                        </h2>
                        <p>
                            I am baby biodiesel four loko copper mug hoodie.
                            Stumptown scenester selfies pinterest. Succulents
                            bitters shoreditch, microdosing organic messenger
                            bag mixtape thundercats beard typewriter street art
                            health goth VHS DIY godard. Gluten-free pinterest
                            kinfolk kogi thundercats seitan taiyaki. Iceland
                            retro fixie plaid chillwave etsy single-origin
                            coffee live-edge vaporware air plant knausgaard
                            williamsburg glossier. I am baby biodiesel four loko
                            copper mug hoodie. Stumptown scenester selfies
                            pinterest. Succulents bitters shoreditch,
                            microdosing organic messenger bag mixtape
                            thundercats beard typewriter street art health goth
                            VHS DIY godard. Gluten-free pinterest kinfolk kogi
                            thundercats seitan taiyaki. Iceland retro fixie
                            plaid chillwave etsy single-origin coffee live-edge
                            vaporware air plant knausgaard williamsburg
                            glossier.
                        </p>
                    </div>
                    <div className="item-2 bottom-2">
                        <img src="../home2.svg" />
                    </div>
                </div>
            </div>
        </>
    );
}