import React from "react";
import { getWeatherIcon } from "../utils/weatherIcons";
import { Box, Stack, Typography } from "@mui/material";

export const CurrentWeather = ({ location, weatherData }) => {
  if (!weatherData || !weatherData.main || !weatherData.weather) return null;

  const weatherIcon = getWeatherIcon(weatherData.weather[0]?.id);
  return (
    <Box>
      <Typography>Aktualna pogoda dla: {location}</Typography>
      <Typography>Temperatura: {weatherData.main.temp} °C</Typography>
      <Typography>
        Temperatura odczuwalna: {weatherData.main.feels_like} °C
      </Typography>
      <Typography>Wilgotność: {weatherData.main.humidity}%</Typography>
      <Typography>Wiatr: {weatherData.wind.speed} m/s</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ fontSize: "48px" }}
      >
        {weatherIcon}
      </Stack>
    </Box>
  );
};
