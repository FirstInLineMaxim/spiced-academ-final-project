import { Component } from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Profile from './profile';
import Recomendations from "./recomendations";
import Logo from "./logo";
import Chat from "./chat";
import Questionnaire from "./questionnaire";
import Menu from './menu';
import Account from "./account";
import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import { IoBookmarkOutline, IoChatboxOutline } from "react-icons/io5";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
            full_name: "",
            bio: "",
            profile_pic: "",
            hair_type: "",
            hair_health: "",
            todo: "",
            uploaderIsVisible: false,
            menuIsVisible: false,
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
                // this.props.history.push("/");
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
            profile_pic: newProfilePic,
        });
    }

    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }
    setTodo(newTodo) {
        this.setState({
            todo: newTodo,
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
                    <header>
                        <Link to="/home">
                            <Logo />
                        </Link>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="recomendations">
                                        <IoBookmarkOutline className="icon-1" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/chat">
                                        <IoChatboxOutline className="icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Menu
                                        toggleMenu={() => this.toggleMenu()}
                                    />
                                </li>
                                <li>
                                    <Link to="/">
                                        <img
                                            className="profile-img"
                                            src={
                                                this.profile_pic ||
                                                "../default-img.png"
                                            }
                                        />
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
                                profile_pic={this.state.profile_pic}
                                bio={this.state.bio}
                                hair_type={this.state.hair_type}
                                hair_health={this.state.hair_health}
                                todo={this.state.todo}
                                toggleUploader={() => this.toggleUploader()}
                                setBio={(e) => this.setBio(e)}
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
                                setTodo={(e) => this.setTodo(e)}
                                match={props.match}
                                key={props.match.url}
                                history={props.history}
                            />
                        )}
                    />

                    <Route
                        path="/recomendations"
                        render={(props) => (
                            <Recomendations
                                hair_type={this.state.hair_type}
                                hair_health={this.state.hair_health}
                                todo={this.state.todo}
                                match={props.match}
                                key={props.match.url}
                                history={props.history}
                            />
                        )}
                    />

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            profile_pic={this.state.profile_pic}
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

