import React from "react";
import "./Singlepage.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TEMPERATURE_UNIT, HUMIDITY_UNIT } from "../../Constants/constants";
import Footer from "../Footer/Footer";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SingleHeader from "../SingleHeader/SingleHeader";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


export default function Singlepage() {
  var location = useLocation();
  var data = location.state; //get data form home page
  var navigate = useNavigate(); //navigete to home page

  return (
    <div>
      <div className="AppSingle">
        <div className="containerSingle">
          <SingleHeader />
          <div className="single-main-container">
            <Card className={`single-card card-img-${data.cname}`}>
              <Card.Body className="card-body-single">
                <Row>
                  <Col className="single-inside-text">
                    <Button
                      className="back-button"
                      variant="link"
                      onClick={() => navigate(-1)}
                    >
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        style={{ color: "#ffffff" }}
                      />
                    </Button>
                    <h2 className="city-name">
                      {data.cname},{data.ccountry}
                    </h2>
                    <p className="dt-style-single">{data.cdt}</p>
                  </Col>
                </Row>
                <Row className="second-raw">
                  <Col className="single-inside-text Top-single-line">
                    <img
                      className="weather-icon"
                      src={data.curl}
                      alt="weather icon"
                    />
                    <p>{data.cdesc}</p>
                  </Col>

                  <Col className="single-inside-text">
                    <h1>{data.ctemp}{TEMPERATURE_UNIT}</h1>
                    <br />
                    <p>Temp Min: {data.cminTemperature}{TEMPERATURE_UNIT}</p>
                    <p>Temp Max: {data.cmaxTemperature}{TEMPERATURE_UNIT}</p>
                  </Col>
                </Row>
              </Card.Body>

              <Card.Footer
                className="single-fotter-style"
                style={{
                  borderRadius: "15px",
                  borderBottom: "2px solid white",
                }}
              >
                <Row>
                  <Col className="single-line">
                    <p>Pressure: {data.cpressure}</p>
                    <p>Humidity: {data.chumidity}{HUMIDITY_UNIT}</p>
                    <p>Visibility: {data.cvisibility}</p>
                  </Col>

                  <Col className="single-line">
                    <FontAwesomeIcon
                      icon={faLocationArrow}
                      style={{
                        color: "#ffffff",
                        width: "100%",
                        height: "30px",
                      }}
                    />
                    <br />
                    <br />
                    <p style={{ textAlign: "center" }}>{data.cdegree}</p>
                  </Col>

                  <Col className="sun-details">
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
