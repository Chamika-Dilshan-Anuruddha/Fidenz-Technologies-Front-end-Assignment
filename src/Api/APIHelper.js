const API_KEY = require('../Data/appSettings.json').API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to construct the complete API URL for fetching weather data
export const getWeatherApiUrl = (cityID) => {
  return `${BASE_URL}?id=${cityID}&appid=${API_KEY}&units=metric`;
};

// Function to construct the URL for fetching weather icon images
export const getWeatherIconUrl = (imgName) => {
  return `https://openweathermap.org/img/wn/${imgName}.png`;
};

