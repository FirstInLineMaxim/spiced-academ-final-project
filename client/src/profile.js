import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";
import ToDoList from "./todo";

export default function Profile(props) {
    return (
        <div className="profile">
            <ProfilePic
                toggleUploader={props.toggleUploader}
                image={props.image}
            />
            <div className="bio-cropper">
                <h1>{props.full_name}</h1>
                <p>
                    <span>{props.hair_type} </span>
                    <span>{props.hair_health}</span>
                </p>
                <BioEditor setBio={props.setBio} bio={props.bio} />
            </div>
            <div>
                <ToDoList 
                    hair_health={props.hair_health}/>
            </div>
        </div>
    );
}