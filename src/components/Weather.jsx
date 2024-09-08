import React, { useState, useEffect } from "react";
import { getWeatherData, getForecastData } from "../utils/api.js";
import SearchForm from "./SearchForm.jsx";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import "./weather.css";
import { getWeatherBackground } from "../utils/weatherIcons.js";

const Weather = () => {
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              setError("Error fetching location.");
              console.error("Error fetching location:", error);
            }
          },
          (error) => {
            setError("Geolocation error.");
            console.error("Geolocation error:", error);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
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
        setLoading(true);
        try {
          const data = await getWeatherData(location);
          if (data && data.weather) {
            setWeatherData(data);
          } else {
            setError("Dane pogody są niedostępne.");
          }
        } catch (error) {
          setError("Error pobierania danych pogody.");
          console.error("Error pobierania danych pogody:", error);
        } finally {
          setLoading(false);
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
          if (data && data.list) {
            setForecastData(data);
          } else {
            setError("Dane pogody są niedostępne.");
          }
        } catch (error) {
          setError("Error pobierania danych prognozy pogody.");
          console.error("Error pobierania danych prognozy pogody:", error);
        }
      }
    };
    fetchForecastData();
  }, [location]);

  const weatherBackground = weatherData.weather
    ? getWeatherBackground(weatherData.weather[0]?.id)
    : null;

  return (
    <div className="container">
      <div
        className="firstTemplate"
        style={{
          backgroundImage: weatherBackground
            ? `url(${weatherBackground})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <SearchForm
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        {loading && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {error && <p>{error}</p>}
        <CurrentWeather location={location} weatherData={weatherData} />
      </div>
      <Forecast forecastData={forecastData} />
    </div>
  );
};

export default Weather;
