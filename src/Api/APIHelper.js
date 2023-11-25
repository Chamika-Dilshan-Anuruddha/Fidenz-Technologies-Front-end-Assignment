import {API_KEY,IMG_URL,BASE_URL} from '../Constants/constants.js'

// Function to construct the complete API URL for fetching weather data
export const getWeatherApiUrl = (cityID) => {
  return `${BASE_URL}?id=${cityID}&appid=${API_KEY}&units=metric`;
};

// Function to construct the URL for fetching weather icon images
export const getWeatherIconUrl = (imgName) => {
  return `${IMG_URL}${imgName}.png`;
};

//Function to call api and fetch weather data
export const fetchWeatherData = (url,cityID,updateUI) => {
  fetch(url)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function (data) {
      var timestamp = new Date().getTime();
      var cachedData = {
        timestamp: timestamp,
        data: data,
      };
      // Store data in cache
      localStorage.setItem('weatherData_' + cityID, JSON.stringify(cachedData));

      updateUI(data); //update the html page using data
  })

  .catch((error) => {
      console.error('Error:', error);
  });
}