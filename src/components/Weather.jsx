import React, { useState, useEffect } from "react";
import { getWeatherData, getForecastData } from "../utils/api.js";
import { SearchForm } from "./SearchForm.jsx";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import { getWeatherBackground } from "../utils/weatherIcons.js";
import { Box, Card, Grid2 as Grid, Paper } from "@mui/material";

export const Weather = () => {
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLocation = async (cityName) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=b4d24534442959bc8a331c11f5903ea8`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        const city = data[0].name;
        setLocation(city);
      } else {
        setError("Miasto nie znalezione.");
      }
    } catch (error) {
      setError("Error podczas pobierania lokalizacji.");
      console.error("Error podczas pobierania lokalizacji:", error);
    }
  };

  const getLocationLive = async (lat, lon) => {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=b4d24534442959bc8a331c11f5903ea8`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        const city = data[0].name;
        setLocation(city);
      } else {
        setError("Nie udało się uzyskać lokalizacji, wprowadź nazwę miasta");
      }
    } catch (error) {
      setError("Error podczas reverse geocodingu.");
      console.error("Error podczas lokalizacji:", error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getLocationLive(latitude, longitude);
        },
        (error) => {
          setError("Nie można uzyskać dostępu do lokalizacji użytkownika");
          console.error("Geolocation error", error);
        }
      );
    } else {
      setError("Geolokalizacje nie jest wspierana w tej przeglądarce");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    await getLocation(inputValue);
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
    <Grid
      columns={25}
      container
      spacing={2}
      sx={{
        justifyContent: "space-between",
        padding: "20px",
        flexWrap: "nowrap",
      }}
    >
      <Grid columns={5 / 25}>
        <Paper
          sx={{
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
          {loading && (
            <div>
              <p>Loading...</p>
            </div>
          )}
          {error && <p>{error}</p>}

          <CurrentWeather location={location} weatherData={weatherData} />
        </Paper>
      </Grid>
      <Grid size="grow">
        <Forecast forecastData={forecastData} />
      </Grid>
    </Grid>
  );
};
