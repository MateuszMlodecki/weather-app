import React from "react";
import { getWeatherIcon } from "../utils/weatherIcons";

const CurrentWeather = ({ location, weatherData }) => {
  if (!weatherData || !weatherData.main || !weatherData.weather) return null;

  const weatherIcon = getWeatherIcon(weatherData.weather[0]?.id);
  return (
    <div className="todayweather">
      <h3>Aktualna pogoda dla: {location}</h3>
      <p>Temperatura: {weatherData.main.temp} °C</p>
      <p>Temperatura odczuwalna: {weatherData.main.feels_like} °C</p>
      <p>Wilgotność: {weatherData.main.humidity}%</p>
      <p>Wiatr: {weatherData.wind.speed} m/s</p>
      <span className="material-icons" style={{ fontSize: "48px" }}>
        {weatherIcon}
      </span>
    </div>
  );
};

export default CurrentWeather;
