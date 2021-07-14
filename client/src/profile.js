import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";
import ToDoList from "./todo";
import Weather from "./weather";
export default function Profile(props) {
    return (
        <div className="profile">
            <ProfilePic
                toggleUploader={props.toggleUploader}
                profile_pic={props.profile_pic}
            />
            <div className="bio-cropper">
                <h1>{props.full_name}</h1>
                <p className="hair-details">
                    <span>{props.hair_type} hair and {props.hair_health} routine </span>
                </p>
                <BioEditor setBio={props.setBio} bio={props.bio} />
            </div>
            <Weather />
            <div className="todo-container">
                <ToDoList props={props.history} todo={props.todo} />
            </div>
        </div>
    );
}