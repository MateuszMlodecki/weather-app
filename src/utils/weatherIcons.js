export const getWeatherIcon = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) {
    return "⛈️";
  } else if (weatherId >= 300 && weatherId < 500) {
    return "⛅";
  } else if (weatherId >= 500 && weatherId < 600) {
    return "🌧️";
  } else if (weatherId >= 600 && weatherId < 700) {
    return "❄️";
  } else if (weatherId >= 700 && weatherId < 800) {
    return "🌫️";
  } else if (weatherId === 800) {
    return "☀️";
  } else if (weatherId >= 800 && weatherId < 900) {
    return "☁️";
  } else {
    return "help";
  }
};
