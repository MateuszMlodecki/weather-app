const getLocationLive = async (lat, lon) => {
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      return { city: data[0].name, error: null };
    } else {
      return { city: null, error: "City not found." };
    }
  } catch (error) {
    return { city: null, error: "Error podczas pobierania lokalizacji:" };
  }
};

export { getLocationLive };
