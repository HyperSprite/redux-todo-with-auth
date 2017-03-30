import React, { PropTypes } from 'react';
import { IconButton } from 'material-ui';

import SpinnerIcon from '../form/spinner-icon';
import style from '../../styles/style';
import '../../styles/weather.css';
// import '../../styles/weather-icons.css';

const HeadlineWeather = ({ ...dayWF }) => {
  const tempDiff = Math.floor((dayWF.high - dayWF.low) * 5);
  return (
    <div className="weather-header">
      <div className="weather-header-row">
        {dayWF.aggregate.forcast.icon && document.documentElement.clientWidth > 400 ? (
          <div className="weather-header-img">
            <img src={`https://openweathermap.org/img/w/${dayWF.aggregate.forcast.icon}.png`} alt={dayWF.aggregate.forcast.main} /><br />
          </div>
        ) : null }
        <div className="weather-header-temp">
          <span className="weather-detail">Low</span> {dayWF.low}°
        </div>
        <div className="weather-temp-diff" >
          <hr style={{ width: tempDiff + 5 }} />
        </div>
        <div className="weather-header-temp">
          {dayWF.high}° <span className="weather-detail">High</span>
        </div>
        <div className="weather-header-img">
          {dayWF.maxWind}
        </div>
      </div>
      <div>
        <IconButton onClick={dayWF.switchShowExtended} style={style.toggleIconButton} ><SpinnerIcon option={dayWF.showExtended}/></IconButton>
      </div>
    </div>
  );
};

export default HeadlineWeather;
