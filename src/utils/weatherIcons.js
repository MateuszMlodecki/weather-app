import cloudyBackground from "../images/cloudyBackground.png";
import rainBackground from "../images/rainBackground.png";
import semiCloudsBackground from "../images/semiCloudsBackground.png";
import sunnyBackground from "../images/sunnyBackground.png";
import snowBackground from "../images/snowBackground.png";
import stormyBackground from "../images/stormyBackground.png";
import mistyBackground from "../images/mistyBackground.png";

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
export const getWeatherBackground = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) {
    return stormyBackground;
  } else if (weatherId >= 300 && weatherId < 500) {
    return semiCloudsBackground;
  } else if (weatherId >= 500 && weatherId < 600) {
    return rainBackground;
  } else if (weatherId >= 600 && weatherId < 700) {
    return snowBackground;
  } else if (weatherId >= 700 && weatherId < 800) {
    return mistyBackground;
  } else if (weatherId === 800) {
    return sunnyBackground;
  } else if (weatherId >= 800 && weatherId < 900) {
    return cloudyBackground;
  } else {
    return "help";
  }
};
