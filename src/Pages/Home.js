import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {CASH_EXPIRE, CASH_NAME_PREFIX, KM_FACTOR, CITYDATALIST, PRESSURE_UNIT, VISIBILITY_UNIT, WINDSPEED_UNIT, WINDSPEED_DIRECTION_UNIT, SINGLEPAGE_PATH} from '../Constants/constants.js';
import { getWeatherApiUrl, getWeatherIconUrl,fetchWeatherData } from '../Api/APIHelper.js';
import { unixToNormalTime, unixToNormalWithDate, lastTwoWords } from '../Utils/dataCleanHelper.js';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Row from 'react-bootstrap/Row';
import HomeCard from '../Components/Cards/HomeCard.js';
import './Home.css'

export default function Home() {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCardData([]); // Clear existing cards by resetting the cardData state to an empty array

    function weatherBalloon(cityID, url) {
      //call the API according to given city id and get the result
      var cachedData = localStorage.getItem(`${CASH_NAME_PREFIX}${cityID}`);

      if (cachedData) {
        // If cached data exists and is not expired
        var parsedData = JSON.parse(cachedData);
        var currentTime = new Date().getTime();

        if (currentTime - parsedData.timestamp < CASH_EXPIRE) {
          updateUI(parsedData.data);
          //console.log("Cached data exist and updated");
          return;
        }
      }
      //console.log("No valied cache data, need to call API");
      fetchWeatherData(url, updateUI);
    }

    function updateUI(data) {
      //update the object  that need to pass to singlepage.js
      setCardData((prevDataObjects) => [
        ...prevDataObjects,
        {
          cname: data["name"],
          ccountry: data["sys"]["country"],
          curl: getWeatherIconUrl(data["weather"][0]["icon"].toString()),
          cdesc: lastTwoWords(data["weather"][0]["description"]),
          cdt: unixToNormalWithDate(data["dt"]),
          ctemp: parseInt(data["main"]["temp"]),
          cminTemperature: parseInt(data["main"]["temp_min"]),
          cmaxTemperature: parseInt(data["main"]["temp_max"]),
          cpressure: parseInt(data["main"]["pressure"]) + PRESSURE_UNIT,
          chumidity: parseInt(data["main"]["humidity"]),
          cvisibility:
            (parseFloat(data["visibility"]) / KM_FACTOR).toFixed(1) +
            VISIBILITY_UNIT, // get upto first decimal point  ,
          cdegree:
            parseInt(data["wind"]["speed"]) +
            WINDSPEED_UNIT +
            parseInt(data["wind"]["deg"]) +
            WINDSPEED_DIRECTION_UNIT,
          csunrise: unixToNormalTime(parseInt(data["sys"]["sunrise"])),
          csunset: unixToNormalTime(parseInt(data["sys"]["sunset"])),
        },
      ]);
    }

    //run the api call for all city IDs in cityDataList
    for (var j = 0; j < CITYDATALIST.length; j++) {
      var cityId = parseInt(CITYDATALIST[j].CityCode);
      var apiUrl = getWeatherApiUrl(cityId);
      weatherBalloon(cityId, apiUrl);
    }
  }, []);

  const handleCardClick = (data) => {
    // Navigate to SinglePage and pass the data as state
    navigate(`${SINGLEPAGE_PATH}${data.cname}`, { state: data });
  };

  return (
    <div>
      <div className="App">
        <div className="container-bg">
          <Header />
          <div className="main-container">
            <div className="container">
              <Row xs={1} md={2} className="g-4">
                {cardData.map((data, idx) => (
                  <HomeCard
                    data={data}
                    id={idx}
                    key={idx}
                    onClick={handleCardClick}
                  /> //here I used key={idx} for prevent a warning in the console
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}