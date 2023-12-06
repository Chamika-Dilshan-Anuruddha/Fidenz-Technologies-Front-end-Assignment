import { API_KEY, IMG_URL, BASE_URL, CASH_NAME_PREFIX } from "../Constants/constants.js";

export const getWeatherApiUrl = (cityID) => {
  return `${BASE_URL}?id=${cityID}&appid=${API_KEY}&units=metric`;
};

export const getWeatherIconUrl = (imgName) => {
  return `${IMG_URL}${imgName}.png`;
};

export const fetchWeatherData = async (url, updateUI) => {
  // Extract the cityID from the url
  const regex = /id=([^&]*)/;
  const match = url.match(regex);
  const cityID = match ? match[1] : null;
  //get the responce for url and convert it to jason object
  const responce = await fetch(url);
  const data = await responce.json();
  
  var timestamp = new Date().getTime();
  var cachedData = {
    timestamp: timestamp,
    data: data,
  };
  localStorage.setItem(CASH_NAME_PREFIX + cityID, JSON.stringify(cachedData));

  updateUI(data);
};
