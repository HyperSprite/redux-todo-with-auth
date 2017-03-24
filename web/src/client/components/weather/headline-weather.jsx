import React, { PropTypes } from 'react';
import { FlatButton, IconButton } from 'material-ui';
import { CardHeader, CardText, CardTitle } from 'material-ui/Card';
import FaRefresh from 'react-icons/lib/fa/refresh';
import TiThermometer from 'react-icons/lib/ti/thermometer';

import ToggleIcon from '../form/toggle-icon';
import SpinnerIcon from '../form/spinner-icon';
import style from '../../styles/style';
import '../../styles/weather.css';

const HeadlineWeather = ({ ...dayWF }) => {
  const tempDiff = Math.floor((dayWF.high - dayWF.low) * 5);
  return (
    <div className="weather-header">
      <div className="weather-header-row" >
        <div>
          <span ><FlatButton onClick={dayWF.switchDisplay} style={style.toggleIconButton} >F <ToggleIcon option={dayWF.celsius} /> C </FlatButton></span>
        </div>
        <IconButton onClick={dayWF.updateWeather} style={style.toggleIconButton} ><FaRefresh size={20} /></IconButton>
        {dayWF.aggregate.forcast.icon ? (
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
      </div>
      <div>
        <IconButton onClick={dayWF.switchShowExtended} style={style.toggleIconButton} ><SpinnerIcon option={dayWF.showExtended}/></IconButton>
      </div>
    </div>
  );
};

export default HeadlineWeather;
