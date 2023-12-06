import React from "react";
import "./HomeCard.css";
import { Card, Col, Row, CloseButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { TEMPERATURE_UNIT, HUMIDITY_UNIT, CARD_IMGS } from "../../Constants/constants";

export default function HomeCard({ data, id, onClick }) {
  return (
    <Col key={id}>
      <Card
        className={`card-style ${CARD_IMGS[id % CARD_IMGS.length]}`}
        style={{ borderRadius: "15px" }}
        onClick={() => onClick(data)}
      >
        <Card.Body>
          <Row className="first-raw-style">
            <Col className="inside-text first-col-container">
              <h2>
                {data.cname},{data.ccountry}
              </h2>
              <p>{data.cdt}</p>
              <img src={data.curl} alt="weather icon" />
              <p>{data.cdesc}</p>
            </Col>
            <Col className="inside-text">
              <CloseButton variant="white" className="close-button" />
              <h1 className="temp-style">{data.ctemp}{TEMPERATURE_UNIT}</h1>
              <br />
              <p>Temp Min: {data.cminTemperature}{TEMPERATURE_UNIT}</p>
              <p>Temp Max: {data.cmaxTemperature}{TEMPERATURE_UNIT}</p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer
          className="fotter-style"
          style={{ borderRadius: "15px", borderBottom: "2px solid white" }}
        >
          <Row>
            <Col className="line">
              <p>Pressure: {data.cpressure}</p>
              <p>Humidity: {data.chumidity}{HUMIDITY_UNIT}</p>
              <p>Visibility: {data.cvisibility}</p>
            </Col>
            <Col className="line">
              <FontAwesomeIcon
                icon={faLocationArrow}
                style={{ color: "#ffffff", width: "100%", height: "30px" }}
              />
              <br /> <br />
              <p style={{ textAlign: "center" }}>{data.cdegree}</p>
            </Col>
            <Col>
              <p>Sunrise: {data.csunrise}</p>
              <p>Sunset: {data.csunset}</p>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
}
