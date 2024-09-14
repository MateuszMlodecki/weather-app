import React, { useState, useEffect } from "react";
import { getWeatherData, getForecastData } from "../utils/api.js";
import { SearchForm } from "./SearchForm.jsx";
import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";
import { getWeatherBackground } from "../utils/weatherIcons.js";
import { Grid2 as Grid, Paper } from "@mui/material";
import { Loading } from "./Loading.jsx";
import { getLocation, getLocationLive } from "../utils/locations";

export const Weather = () => {
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGetLocation = async (cityName) => {
    const { city, error } = await getLocation(cityName);
    city ? setLocation(city) : setError(error);
  };

  const handleGetLocationLive = async (lat, lon) => {
    const { city, error } = await getLocationLive(lat, lon);
    city ? setLocation(city) : setError(error);
  };
  /* const handleGetUserLocation = async (onSucces, onError) => {
    const { position, error } = await handleGetLocationLive(onSucces, onError);
    position ? setLocation(position) : setError(error);
  }; */
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleGetLocationLive(latitude, longitude);
        },
        (error) => {
          setError("Nie można uzyskać dostępu do lokalizacji użytkownika");
          console.error("Geolocation error", error);
        }
      );
    } else {
      setError("Geolokalizacja nie jest wspierana w tej przeglądarce");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    await handleGetLocation(inputValue);
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

    if (!location) {
      getUserLocation();
    }

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
            setError("Dane prognozy pogody są niedostępne.");
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
    <Grid container spacing={1}>
      <Paper
        sx={{
          Width: "350px",
          padding: "20px",
          backgroundImage: weatherBackground
            ? `url(${weatherBackground})`
            : "none",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <SearchForm
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />

        <CurrentWeather location={location} weatherData={weatherData} />
      </Paper>

      {loading && <Loading />}
      {error && <Paper>{error}</Paper>}
      <Forecast forecastData={forecastData} />
    </Grid>
  );
};
