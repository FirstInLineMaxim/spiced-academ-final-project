import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";
import ToDoList from "./todo";
import Weather from "./weather";
import { useState, useEffect } from "react";


export default function Profile(props) {
    return (
        <div className="profile">
            <ProfilePic
                toggleUploader={props.toggleUploader}
                profile_pic={props.profile_pic}
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
                <Weather />
            </div>
            <div>
                <ToDoList todo={props.todo} />
            </div>
        </div>
    );
}