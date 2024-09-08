import React from "react";
import { getWeatherBackground, getWeatherIcon } from "../utils/weatherIcons";

const Forecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  const forecastItems = Object.entries(
    forecastData.list.reduce((dailyForecast, day) => {
      const date = new Date(day.dt * 1000);
      const dayOfWeek = [
        "Niedziela",
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
      ][date.getDay()];
      const dateString = date.toLocaleDateString();

      if (!dailyForecast[dateString]) {
        dailyForecast[dateString] = {
          dayOfWeek: dayOfWeek,
          maxTemp: day.main.temp_max,
          wind: day.wind,
          weatherId: day.weather[0].id,
        };
      } else {
        dailyForecast[dateString].maxTemp = Math.max(
          dailyForecast[dateString].maxTemp,
          day.main.temp_max
        );
      }

      return dailyForecast;
    }, {})
  ).slice(1, 5);

  return (
    <>
      {forecastItems.map(([date, dayData], index) => {
        const weatherIcon = getWeatherIcon(dayData.weatherId);
        const weatherBackground = getWeatherBackground(dayData.weatherId);
        return (
          <div
            key={date}
            className={`forecast${index + 1}`}
            style={{
              backgroundImage: `url(${weatherBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3>
              {dayData.dayOfWeek}
              <br></br> ({date})
            </h3>
            <span className="material-icons" style={{ fontSize: "48px" }}>
              {weatherIcon}
            </span>
            <p>Temperatura: {dayData.maxTemp} °C</p>
          </div>
        );
      })}
    </>
  );
};

export default Forecast;
