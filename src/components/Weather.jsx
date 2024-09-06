import React, { useState, useEffect } from "react";
import { getWeatherData, getForecastData } from "../utils/api.js";
import SearchForm from "./SearchForm.jsx";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import "./weather.css";

const Weather = () => {
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=b4d24534442959bc8a331c11f5903ea8`;
            try {
              const response = await fetch(url);
              const data = await response.json();
              const city = data[0].name;
              setLocation(city);
              setInputValue(city);
            } catch (error) {
              console.error("Error fetching location:", error);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocation(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location) {
        try {
          const data = await getWeatherData(location);
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };
    fetchWeatherData();
  }, [location]);

  useEffect(() => {
    const fetchForecastData = async () => {
      if (location) {
        try {
          const data = await getForecastData(location);
          setForecastData(data);
        } catch (error) {
          console.error("Error fetching forecast data:", error);
        }
      }
    };
    fetchForecastData();
  }, [location]);

  return (
    <div className="container">
      <div className="firstTemplate">
        <SearchForm
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <CurrentWeather location={location} weatherData={weatherData} />
      </div>
      <Forecast forecastData={forecastData} />
    </div>
  );
};

export default Weather;
