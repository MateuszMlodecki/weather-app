import React from "react";
import { getWeatherBackground, getWeatherIcon } from "../utils/weatherIcons";
import { Box, Grid2 as Grid, Paper, Stack, Typography } from "@mui/material";

const Forecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;
  const uniqueDays = new Set();
  const dailyForecast = [];
  forecastData.list.forEach((day) => {
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
    const maxTemp = day.main.temp_max;
    const feelsLike = day.main.feels_like;
    const wind = day.wind.speed;
    const humidity = day.main.humidity;
    const weatherId = day.weather[0].id;

    if (!uniqueDays.has(dayOfWeek)) {
      uniqueDays.add(dayOfWeek);
      dailyForecast.push({
        date,
        dayOfWeek,
        maxTemp,
        feelsLike,
        wind,
        humidity,
        weatherId,
      });
    }
  });

  const forecastItems = Object.values(dailyForecast)
    .sort((a, b) => a.date - b.date)
    .slice(1, 5);
  // console.log("dailyForecast", dailyForecast);
  // console.log("forecastItems",forecastItems)

  return (
    <Grid container spacing={4} columns={20 / 25}>
      {forecastItems.map((dayData) => {
        const weatherIcon = getWeatherIcon(dayData.weatherId);
        const weatherBackground = dayData.weatherId
          ? getWeatherBackground(dayData.weatherId)
          : null;
        return (
          <Grid>
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
              <Box>
                <Typography variant="h6">
                  {dayData.dayOfWeek} <br /> (
                  {dayData.date.toLocaleDateString()})
                </Typography>

                <Typography>Temperatura: {dayData.maxTemp} °C</Typography>
                <Typography>
                  Temperatura odczuwalna: {dayData.feelsLike} °C
                </Typography>
                <Typography>Wilgotność: {dayData.humidity}%</Typography>
                <Typography>Wiatr: {dayData.wind} m/s</Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ fontSize: "48px" }}
                >
                  {weatherIcon}
                </Stack>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Forecast;
