import React, { PropTypes } from 'react';

import '../../styles/weather.css';

const propTypes = {
  localTime: PropTypes.string,
  temp: PropTypes.number,
  tempType: PropTypes.string,
  windDeg: PropTypes.string,
  windSpeed: PropTypes.string,
};

const SingleWeather = ({ ...eDWF, localTime, temp, tempType, windDeg, windSpeed }) => {
  return (
    <div className="weather-single">
      <div>{localTime}</div>
      <div><img src={`https://openweathermap.org/img/w/${eDWF.weather[0].icon}.png`} alt={eDWF.weather[0].main} /></div>
      <div>{temp}{tempType}</div>
      <div>{eDWF.main.humidity}% <span className="weather-detail" >humidity</span></div>
      <div>{eDWF.main.pressure} <span className="weather-detail">hpa</span></div>
      <div><span className="weather-detail" >{windDeg} wind</span></div>
      <div><span className="weather-detail" >{windSpeed}</span></div>
    </div>
  );
};

SingleWeather.propTypes = propTypes;

export default SingleWeather;
