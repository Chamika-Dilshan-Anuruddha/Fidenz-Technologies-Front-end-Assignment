import React from 'react';
import './Singlepage.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Card from 'react-bootstrap/Card';
import SingleHeader from './SingleHeader';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';


export default function Singlepage() {
  const location = useLocation();
  const data = location.state; //get data form home page
  const navigate = useNavigate(); //navigete to home page
  
  return (
    <div>
        <div className='AppSingle'>
            <div className='containerSingle'>

                <SingleHeader />


                <div className='single-main-container'> 

                    <Card className={`single-card card-img-${data.cname}`}> 
                            
                            <Card.Body>
                                <Row>
                                    <Col className="single-inside-text">
                                        <Button className='back-button' variant="link" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} style={{color: "#ffffff"}} /></Button>
                                        <h2 className='city-name' >{data.cname},{data.ccountry}</h2>
                                        <p className='dt-style'>{data.cdt}</p>
                                    </Col>
                                    

                                </Row>
                                <Row>
                                    <Col className="single-inside-text Top-single-line weather-icon-container">
                                    
                                    <img className='weather-icon' src={data.curl} alt='weather icon' />
                                    <p>{data.cdesc}</p>
                                    </Col>


                                    <Col className="single-inside-text">
                                    <h1>{data.ctemp} °C</h1><br />
                                    <p>Temp Min: {data.cminTemperature} °C</p>
                                    <p>Temp Max: {data.cmaxTemperature} °C</p>
                                    </Col>

                                </Row>
                                
                            </Card.Body>

                            <Card.Footer className="single-fotter-style" style={{ borderRadius: '15px', borderBottom:'2px solid white' }} >
                                   <Row>
                                        <Col className="single-line">
                                        <p>Pressure: {data.cpressure}</p>
                                        <p>Humidity: {data.chumidity}%</p>
                                        <p>Visibility: {data.cvisibility}</p>
                                        </Col>
                                        
                                        <Col className="single-line">
                                        <FontAwesomeIcon icon={faLocationArrow} style={{color: "#ffffff", width:'100%', height:'30px'}} />
                                        <br/><br/>
                                        <p style={{textAlign:'center'}}>{data.cdegree}</p>
                                        </Col>


                                        <Col className='sun-details'>
                                        <p>Sunrise: {data.csunrise}</p>
                                        <p>Sunset: {data.csunset}</p>
                                        </Col>

                                    </Row>

                            </Card.Footer>

                    </Card>


                </div>


            </div>

        </div>

      <Footer />

    </div>
  );
}
