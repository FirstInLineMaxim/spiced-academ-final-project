import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";
import ToDoList from "./todo";
import Weather from "./weather";
import { useState, useEffect } from "react";
import axios from "./axios";



export default function Profile(props) {
    console.log(props);
    useEffect(() => {
    }, []);
    
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
            <div className="weather">
                <Weather />
            </div>
            <div className="todo-container">
                <ToDoList
                    props={props.history}
                    todo={props.todo}
                />
            </div>
        </div>
    );
}