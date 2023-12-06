import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudMoonRain } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div>
      <div className="parentEnterCity">
        <div className="topic">
          <FontAwesomeIcon className="icon" icon={faCloudMoonRain} />
          <p className="weatherTopic">Weather App</p>
        </div>

        <div className="enterData">
          <input
            className="enterCitytext"
            type="text"
            name="city"
            placeholder="Enter a city"
          ></input>
          <button>Add City</button>
        </div>
      </div>
    </div>
  );
}
