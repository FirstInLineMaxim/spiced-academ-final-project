import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";
import ToDoList from "./todo";
import Weather from "./weather";
import { useState, useEffect } from "react";


export default function Profile(props) {
    // const [location, setLocation] = useState({lat: "", lon: ""});

    // useEffect(() => {
    //     (function getGeoLocation() {
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition(
    //                 function (position) {
    //                     var latitude = position.coords.latitude;
    //                     var longitude = position.coords.longitude;
    //                     setLocation({ lat: latitude, lon: longitude });
    //                 },
    //                 function error() {
    //                     alert("Please enable your GPS position feature.");
    //                 },
    //                 { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
    //             );
    //         }
    //         else {
    //             alert("Geolocation API is not supported in your browser.");
    //             setLocation({ lat: "52.5563825", lon: "13.384439" });
    //         }
    //     })();
        
    // }, [props.id]);

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
                <Weather />
            </div>
            {/* <div>
                <ToDoList 
                    hair_health={props.hair_health}/>
            </div> */}
        </div>
    );
}