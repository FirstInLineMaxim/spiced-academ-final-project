import axios from "./axios";
import { useState, useEffect } from "react";
const { API_key } = require("../../server/secrets.json");


export default function Weather() {
    // setLocation({ lat: "52.5563825", lon: "13.384439" });
    //demostration purposes
    // const [location, setLocation] = useState({
    //     lat: "-23.5505",
    //     lon: "-46.6333",
    // });
    const [location, setLocation] = useState({
        lat: "52.5563825",
        lon: "13.384439",
    });

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${API_key}`
            )
            .then(({ data }) => {
                console.log(data);
                setWeather(data);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, [location]);

    if (!weather) {
        return null;
    }

    return (
        <div>
            <h1>Weather </h1>
            <p>{weather.timezone}</p>
            <p>Temperature: {Math.round(weather.current.temp)}° C</p>
            <p>Feels like: {Math.round(weather.current.feels_like)}° C</p>
            <p>{weather.current.weather[0].description.capitalize()}</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>UV-Index: {weather.current.uvi}</p>
        </div>
    );
}


// function getGeoLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             function (position) {
//                 var latitude = position.coords.latitude;
//                 var longitude = position.coords.longitude;
//                 setLocation({ lat: latitude, lon: longitude });
//             },
//             function error() {
//                 alert("Please enable your GPS position feature.");
//             },
//             { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
//         );
//     } 
//     else {
//         alert("Geolocation API is not supported in your browser.");
//         setLocation({ lat: "52.5563825", lon: "13.384439" });
//     }
// }
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
