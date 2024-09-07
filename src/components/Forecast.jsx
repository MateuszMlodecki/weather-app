import React from "react";
import { getWeatherIcon } from "../utils/weatherIcons";

const Forecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  const forecastItems = Object.entries(
    forecastData.list.reduce((acc, day) => {
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
      const formattedDate = date.toLocaleDateString();

      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          dayOfWeek: dayOfWeek,
          maxTemp: day.main.temp_max,
          wind: day.wind,
          weatherId: day.weather[0].id,
        };
      } else {
        acc[formattedDate].maxTemp = Math.max(
          acc[formattedDate].maxTemp,
          day.main.temp_max
        );
      }

      return acc;
    }, {})
  ).slice(1, 5);

  return (
    <>
      {forecastItems.map(([date, dayData], index) => {
        const weatherIcon = getWeatherIcon(dayData.weatherId);
        return (
          <div key={date} className={`forecast${index + 1}`}>
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
