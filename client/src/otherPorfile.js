import { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {
            otherUserId: "",
            full_name: "",
            email: "",
            bio: "",
            profile_pic: "",
            userId: "",
        };
    }
    
    componentDidMount() {
        axios.get("/member/" + this.props.match.params.id)
            .then(({ data }) => {
                if (this.props.match.params.id == data.loggedId) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        otherUserId: data.id,
                        full_name: data.full_name,
                        email: data.email,
                        bio: data.bio,
                        profile_pic: data.profile_pic,
                        userId: data.loggedId,
                    });
                }
            }).catch((error) => {
                console.log('error', error);
                //redirecionar para pagina de error customizada
                this.props.history.push("/");
            });
    }

    render() {
        return (
            <div className="other profile">
                <div className="img-wrapper">
                    <img
                        className="profile-img"
                        src={this.state.profile_pic || "../default-img.png"}
                        alt={`${this.state.first} ${this.state.last}`}
                    />
                </div>
                <div className="bio-cropper">
                    <h1>{this.state.full_name}</h1>
                    <p>{this.state.bio}</p>
                </div>
            </div>
        );
    }
}