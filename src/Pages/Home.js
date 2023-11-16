import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Home.css'
import {CASH_EXPIRE,KM_FACTOR,MSECONDS_FACTOR,TIME_THRESHOLD,MONTHS_YEAR,CARD_IMGS} from '../Constants/constants.js';
import { getWeatherApiUrl, getWeatherIconUrl } from '../Api/APIHelper.js';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CloseButton from 'react-bootstrap/CloseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
   
    const [cardData, setCardData] = useState([]);
    const navigate = useNavigate();
       
    useEffect(() => {

        setCardData([]); // Clear existing cards by resetting the cardData state to an empty array

        // This function will run when the component is first loaded
        const sample = require('../Data/cities.json'); //load the city data from json file
        const smapleList = sample.List; //get it as a list
        var cityCodeArry = []; //city Id containing array
    
            
        for (var i=0;i<smapleList.length;i++){
            var cityCode = parseInt(smapleList[i].CityCode); //get each city Id as a int
            cityCodeArry.push(cityCode);
        
        }
        
        //call the API accordinto  given city id and get the result
        function weatherBalloon(cityID,url) {
            // Check if cached data exists
            const cachedData = localStorage.getItem(`weatherData_${cityID}`);
            
            if (cachedData) {
              
              // If cached data exists and is not expired
              const parsedData = JSON.parse(cachedData);
              const currentTime = new Date().getTime();
              
              //checks the cahche is old than 5 minitus (300000 ms)
              if (currentTime - parsedData.timestamp < CASH_EXPIRE) {
                updateUI(parsedData.data);
                console.log('Cached data exist and updated:', parsedData)
                return;
              }
            }
            
            // if cache no or more than 5 mins then call api and save as a cache
            console.log("No valied cache data, need to call API")
            fetch(url)  
            .then(function(resp) { return resp.json() }) // Convert data to json
            .then(function (data) {
                const timestamp = new Date().getTime();
                const cachedData = {
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

        function updateUI(data) {
      
            // get the data form promise
            var nameValue = data['name'];
            var dtValue = data['dt']; // Unix timestamp
            var descValue = data['weather'][0]['description'];
            var tempValue = parseInt(data['main']['temp']); 
            var tempMinValue = parseInt(data['main']['temp_min']);
            var tempMaxValue = parseInt(data['main']['temp_max']); 
            var countryData   = data['sys']['country'];
            var icondata = data['weather'][0]['icon'];
            var imgUrl = getWeatherIconUrl(icondata.toString());
            var pressureValue = parseInt(data['main']['pressure']) + " hPa";  
            var humidityValue = parseInt(data['main']['humidity']);  
            var visibilityValue = (parseFloat(data['visibility'])/KM_FACTOR).toFixed(1) + ' km'; // get upto first decimal point  
            var degreeValue = parseInt(data['wind']['speed']) + ' m/s  ' + parseInt(data['wind']['deg']) +  ' Degree' ;  
            var sunriseValue = parseInt(data['sys']['sunrise']);
            var sunsetValue = parseInt(data['sys']['sunset']);  


            //sunrice time
            var myTimeSr = new Date(sunriseValue * MSECONDS_FACTOR); 
            //give the date and time as the required form
            var hoursSr = myTimeSr.getHours();
            var minutesSr = myTimeSr.getMinutes();
            var amPmSr = hoursSr >= TIME_THRESHOLD ? 'pm' : 'am';
            var newHoursSr = hoursSr % TIME_THRESHOLD || TIME_THRESHOLD; // Convert 0 to 12
            var newTimeSr = newHoursSr  + '.'+ minutesSr + amPmSr;


            //sunset time
            var myTimeSs = new Date(sunsetValue * MSECONDS_FACTOR); 
            //give the date and time as the required form
            var hoursSs = myTimeSs.getHours();
            var minutesSs = myTimeSs.getMinutes();
            var amPmSs = hoursSs >= TIME_THRESHOLD ? 'pm' : 'am';
            var newHoursSs = hoursSs % TIME_THRESHOLD || TIME_THRESHOLD; // Convert 0 to 12
            var newTimeSs = newHoursSs  + '.'+ minutesSs + amPmSs;


            // Create a Date object using the Unix timestamp
            var myTime = new Date(dtValue * MSECONDS_FACTOR);
            //give the date and time as the required form
            var hours = myTime.getHours();
            var minutes = myTime.getMinutes();
            var amPm = hours >= TIME_THRESHOLD ? 'pm' : 'am';
            var newHours = hours % TIME_THRESHOLD || TIME_THRESHOLD; // Convert 0 to 12
            var monthName = MONTHS_YEAR[myTime.getMonth()];
            var day = myTime.getDate();
            var newDt = newHours+'.'+ minutes + amPm +', '+ monthName +' ' + day;

            // get only last two words from the description
            var splitDescription = descValue.split(' ');
            var lengthVec = splitDescription.length;
            if(lengthVec >2){
                var towWordsArr = splitDescription.slice(lengthVec-2);
                descValue = towWordsArr.join(' ');  
            }

            //update the object  that need to pass to singlepage.js 
            setCardData((prevDataObjects) => [
                ...prevDataObjects,
               {
                  cname: nameValue,
                  ccountry:countryData,
                  curl:imgUrl,
                  cdesc: descValue,
                  cdt: newDt,
                  ctemp: tempValue,
                  cminTemperature : tempMinValue,
                  cmaxTemperature : tempMaxValue,
                  cpressure: pressureValue,
                  chumidity: humidityValue, 
                  cvisibility: visibilityValue,
                  cdegree: degreeValue,
                  csunrise: newTimeSr,
                  csunset: newTimeSs
                  
               },
           ]);
         
        }  

        //run the api call for all city IDs in cityCodeArry  
        for(var j=0;j<cityCodeArry.length;j++){
            var cityId = cityCodeArry[j];
            const apiUrl = getWeatherApiUrl(cityId);
            weatherBalloon(cityId,apiUrl);     
        }   
        
    },[]);

    const handleCardClick = (data) => {
        // Navigate to SinglePage and pass the data as state
        navigate(`/single/${data.cname}`, { state: data });
    };


    return (
        <div>
            <div className='App'>

                <div className='container-bg'>

                    <Header />

                    <div className="main-container">

                        <div className="container">

                                    <Row xs={1} md={3} className="g-4">
                                    {cardData.map((data, idx) => (
                                        <Col key={idx}>
                                        
                                         <Card className={`card-style ${CARD_IMGS[idx % CARD_IMGS.length]}`} style={{ borderRadius: '15px'}} onClick={() => handleCardClick(data)}>
                                            
                                            <Card.Body>
                                            <Row className='first-raw-style'>
                                                <Col className="inside-text first-col-container"> 
                                                <h2>{data.cname},{data.ccountry}</h2>
                                                <p className='dt-style'>{data.cdt}</p>
                                                <img src={data.curl} alt='weather icon' />
                                                <p>{data.cdesc}</p>
                                                </Col>
                                                <Col className="inside-text second-col-container">
                                                <CloseButton variant='white' className='close-button' />
                                                <h1 className='temp-style'>{data.ctemp} °C</h1><br />
                                                <p>Temp Min: {data.cminTemperature} °C</p>
                                                <p>Temp Max: {data.cmaxTemperature} °C</p>
                                                </Col>
                                            </Row> 
                                            </Card.Body>

                                            <Card.Footer className="fotter-style" style={{ borderRadius: '15px', borderBottom:'2px solid white' }}>
                                            <Row>
                                                <Col className="line">
                                                <p>Pressure: {data.cpressure}</p>
                                                <p>Humidity: {data.chumidity}%</p>
                                                <p>Visibility: {data.cvisibility}</p>
                                                </Col>
                                                <Col className="line">
                                                <FontAwesomeIcon icon={faLocationArrow} style={{color: "#ffffff", width:'100%', height:'30px'}} />
                                                <br />
                                                <br />
                                                <p style={{textAlign:'center'}}>{data.cdegree}</p>
                                                </Col>
                                                <Col>
                                                <p>Sunrise: {data.csunrise}</p>
                                                <p>Sunset: {data.csunset}</p>
                                                </Col>
                                            </Row>
                                            </Card.Footer>
                                          
                                        </Card>
                                       
                                        </Col>
                                    ))}
                                    </Row>
                        </div>
                    </div>                   
                </div>               
            </div>
            <Footer />
        </div>
    )
}
