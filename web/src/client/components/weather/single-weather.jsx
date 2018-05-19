import React from 'react';
import PropTypes from 'prop-types';

import WeatherIcon from '../icons/weather/index';

import './weather.css';

const propTypes = {
  localTime: PropTypes.string,
  temp: PropTypes.number,
  tempType: PropTypes.string,
  windDeg: PropTypes.string,
  windSpeed: PropTypes.number,
  windSpeedType: PropTypes.string,
};

const SingleWeather = ({ localTime, temp, tempType, windSpeed, windSpeedType, ...eDWF }) => {
  return (
    <div className="weather-single">
      <div className="weather-item">
        {localTime}
      </div>
      <div className="weather-item">
        <WeatherIcon
          icon={`wi-owm-${eDWF.weather[0].id}`}
          iconStyle="wi-xlarge"
        />
      </div>
      <div className="weather-item">{temp}{tempType}</div>
      <div className="weather-set weather-item">
        <div>
          {eDWF.main.humidity}
        </div>
        <WeatherIcon
          icon="wi-humidity"
          iconStyle="wi-small"
        />
      </div>
      <div className="weather-set weather-item">
        <div>
          {Math.floor(eDWF.main.pressure)}
        </div>
        <WeatherIcon
          icon="wi-barometer"
          iconStyle="wi-small"
        />
      </div>
      <div className="weather-set weather-item">
        <div>
          {windSpeed}
        </div>
        <div className="weather-detail">
          {windSpeedType}
        </div>
        <WeatherIcon
          icon={`towards-${Math.floor(eDWF.wind.deg)}-deg`}
          wind
          iconStyle="wi-large"
        />
      </div>
    </div>
  );
};

SingleWeather.propTypes = propTypes;

export default SingleWeather;
