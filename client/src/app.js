import { Component } from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from './profile';
import OtherProfile from "./otherPorfile";
import Logo from "./logo";
import FindPeople from "./findPeople";
import Friends from './friends';
import Chat from "./chat";
import Questionnaire from "./questionnaire";
import Menu from './menu';
import Account from "./account";
import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaSearch, FaUserFriends, FaComments } from "react-icons/fa";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
            full_name: "",
            bio: "",
            image: "",
            hair_type: "",
            hair_health: "",
            uploaderIsVisible: false,
            menuIsVisible: false
        };
    }

    componentDidMount() {
        axios
            .get("/profile.json")
            .then(({ data }) => {
                this.setState({ ...data });
            })
            .catch((error) => {
                console.log("error", error);
                this.props.history.push("/");
            });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    toggleMenu() {
        this.setState({
            menuIsVisible: !this.state.menuIsVisible,
        });
    }

    setImage(newProfilePic) {
        this.setState({
            image: newProfilePic,
        });
    }

    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        //online for test purposes
        if (!this.state.id) {
            return null;
        }

        return (
            <BrowserRouter>
                <>
                    <header className="main-header">
                        <Link to="/home">
                            <Logo />
                        </Link>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/users">
                                        <FaSearch className="icon"></FaSearch>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/friends">
                                        <FaUserFriends className="icon"></FaUserFriends>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/chat">
                                        <FaComments className="icon"></FaComments>
                                    </Link>
                                </li>
                                <li>
                                    <Menu
                                        toggleMenu={() => this.toggleMenu()}
                                    />
                                </li>
                                <li>
                                    <Link to="/">
                                        <div className="img-wrapper">
                                            <img
                                                className="profile-img"
                                                src={
                                                    this.props.image ||
                                                    "../default-img.png"
                                                }
                                                alt={this.props.full_name}
                                            />
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                id={this.state.id}
                                full_name={this.state.full_name}
                                first={this.state.first}
                                last={this.state.last}
                                image={this.state.image}
                                bio={this.state.bio}
                                hair_type={this.state.hair_type}
                                hair_health={this.state.hair_health}
                                toggleUploader={() => this.toggleUploader()}
                                setBio={(e) => this.setBio(e)}
                            />
                        )}
                    />

                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                match={props.match}
                                key={props.match.url}
                                history={props.history}
                            />
                        )}
                    />

                    <Route
                        path="/users"
                        render={(props) => (
                            <FindPeople
                                match={props.match}
                                key={props.match.url}
                                history={props.history}
                            />
                        )}
                    />

                    <Route
                        path="/friends"
                        render={(props) => (
                            <Friends
                                match={props.match}
                                key={props.match.url}
                                history={props.history}
                            />
                        )}
                    />

                    <Route
                        path="/chat"
                        render={(props) => (
                            <Chat
                                loggedId={this.state.id}
                                match={props.match}
                                key={props.match.url}
                                history={props.history}
                            />
                        )}
                    />

                    <Route
                        path="/survey"
                        render={(props) => (
                            <Questionnaire
                                match={props.match}
                                key={props.match.url}
                                history={props.history}
                            />
                        )}
                    />

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            image={this.state.image}
                            setImage={(e) => this.setImage(e)}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    )}
                    {this.state.menuIsVisible && (
                        <Account
                            toggleMenu={() => this.toggleMenu()}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    )}
                    <footer>© 2021 | Magali G.</footer>
                </>
            </BrowserRouter>
        );
    }
}

