import React from 'react';
// import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

import SpinnerIcon from '../form/spinner-icon';
import style from '../../styles/style';
import './weather.css';

const HeadlineWeather = ({ ...dayWF }) => {
  const tempDiff = document.documentElement.clientWidth > 600 ?
    Math.floor((dayWF.high - dayWF.low) * 5) :
    50;

  return (
    <div className="weather-header">
      <div className="weather-header-row">
        {dayWF.aggregate.forcast.icon && document.documentElement.clientWidth > 400 ? (
          <div className="weather-header-img">
            <img src={`https://openweathermap.org/img/w/${dayWF.aggregate.forcast.icon}.png`} alt={dayWF.aggregate.forcast.main} /><br />
          </div>
        ) : null }
        <div className="weather-header-temp">
          <span className="weather-detail weather-two">Low</span> <span className="weather-one">{dayWF.low}°</span>
        </div>
        <div className="weather-temp-diff" >
          <hr style={{ width: tempDiff + 2 }} />
        </div>
        <div className="weather-header-temp">
          <span className="weather-one">{dayWF.high}°</span> <span className="weather-detail weather-two">High</span>
        </div>
        <div className="weather-header-img">
          {dayWF.maxWind} <span className="weather-detail">{dayWF.windSpeedType}</span>
        </div>
      </div>
      <div>
        <IconButton
          onClick={dayWF.switchShowExtended}
          style={style.toggleIconButton}
        >
          <SpinnerIcon option={dayWF.showExtended} />
        </IconButton>
      </div>
    </div>
  );
};

export default HeadlineWeather;
