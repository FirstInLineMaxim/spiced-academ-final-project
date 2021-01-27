//weather
import axios from "./axios";
import { useState, useEffect } from "react";
const { API_key } = require("../../server/secrets.json");

export default function Weather() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        navigator.permissions
            .query({ name: "geolocation" })
            .then(({ state }) => {
                if (state == "granted") {
                    console.log(state);
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            let { latitude, longitude } = position.coords;
                            const { data } = await axios.get(
                                `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${API_key}`
                            );
                            setWeather(data);
                        }
                    );
                } else {
                    console.log(state);
                    let location = {
                        // lat: "-23.533773",
                        // lon: "-46.625290",
                        lat: "52.5563825",
                        lon: "13.384439",
                    };
                    alert(
                        "Geolocation API is not supported in your browser. Getting weather from the website location, which is Berlin."
                    );
                    axios
                        .get(
                            `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${API_key}`
                        )
                        .then(({ data }) => {
                            setWeather(data);
                        });
                }
            });
    }, []);

    if (!weather) {
        return null;
    }

    return (
        <>
            <h2>Weather</h2>
            <p className="location"> {weather.timezone}</p>
            <div className="temp">
                <p>Temperature: {Math.round(weather.current.temp)}° C</p>
                <p>Feels like: {Math.round(weather.current.feels_like)}° C</p>
            </div>
            <div className="descrip">
                <p>{weather.current.weather[0].description.capitalize()}</p>
                <img
                    src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                />
            </div>
            <div className="others">
                <p>Humidity: {weather.current.humidity}%</p>
                <p>UV-Index: {weather.current.uvi}</p>
            </div>
        </>
    );
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
