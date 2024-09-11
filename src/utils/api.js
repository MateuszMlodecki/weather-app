import axios from "axios";

const API_KEY = "b4d24534442959bc8a331c11f5903ea8";
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;
const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast`;

export const getWeatherData = async (location) => {
  try {
    const response = await axios.get(
      `${API_URL}?q=${location}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getForecastData = async (location) => {
  try {
    const response = await axios.get(
      `${FORECAST_API_URL}?q=${location}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
