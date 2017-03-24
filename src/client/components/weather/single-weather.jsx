import React, { PropTypes } from 'react';

import '../../styles/weather.css';


const SingleWeather = ({...eDWF, localTime, temp, tempType, windDeg, windSpeed }) => {
  return (
    <div>
      <ul>
        <li>{localTime}</li>
        <li><img src={`https://openweathermap.org/img/w/${eDWF.weather[0].icon}.png`} alt={eDWF.weather[0].main} /></li>
        <li>{temp}{tempType}</li>
        <li>{eDWF.main.humidity}% humidity and {eDWF.main.pressure} hpa</li>
        <li>{windDeg} wind at {windSpeed}</li>
      </ul>
    </div>
  );
};

export default SingleWeather;
