import axios from "./axios";
import { useState, useEffect } from "react";
const { API_key } = require("../../server/secrets.json");


export default function Weather() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                if(!position) {
                    console.log("positiion if", position);
                    let location = {
                        lat: "52.5563825",
                        lon: "13.384439",
                    };
                    alert(
                        "Geolocation API is not supported in your browser. Getting weather to the website location."
                    );
                    const { data } = await axios.get(
                        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${API_key}`
                    );
                    setWeather(data);
                } else {
                    console.log("positiion else", position);
                    let { latitude, longitude } = position.coords;
                    const { data } = await axios.get(
                        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${API_key}`
                    );
                    setWeather(data);
                }
            });
        } else {
            console.log('else');
            alert(
                "Geolocation API is not supported in your browser. Getting weather to the website location."
            );
        }
    }, []);

    if (!weather) {
        return null;
    }
    
    return (
        <div>
            <h1>Weather </h1>
            <p>{weather.timezone}</p>
            <p>Temperature: {Math.round(weather.current.temp)}° C</p>
            <p>Feels like: {Math.round(weather.current.feels_like)}° C</p>
            <img
                src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
            />
            {/* <p>{weather.current.weather[0].icon}.png</p> */}
            <p>{weather.current.weather[0].description.capitalize()}</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>UV-Index: {weather.current.uvi}</p>
        </div>
    );
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};