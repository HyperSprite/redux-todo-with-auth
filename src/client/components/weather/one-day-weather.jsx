import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { format, startOfDay } from 'date-fns';
import { FlatButton, IconButton } from 'material-ui';
import FaRefresh from 'react-icons/lib/fa/refresh';

import HeadlineWeather from './headline-weather';
import SingleWeather from './single-weather';
import ToggleIcon from '../form/toggle-icon';

import style from '../../styles/style';
import './weather.css';

const propTypes = {
  geoCoordinates: PropTypes.string.isRequired, // expects 'lon,lat'
  date: PropTypes.number.isRequired, // unix time in milliseconds
  measurementPref: PropTypes.bool, // defaults to C
  dstOffset: PropTypes.number.isRequired, // DST offset
  tzOffset: PropTypes.number.isRequired, // UTC offset in milliseconds
};

class OneDayWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherforcast: [],
      celsius: true,
      showExtended: false,
    };
    this.switchDisplay = this.switchDisplay.bind(this);
    this.switchShowExtended = this.switchShowExtended.bind(this);
    this.updateWeather = this.updateWeather.bind(this);
  }

  componentDidMount() {
    this.getNewWeather();
  }

  componentWillReceiveProps() {
    this.setState({ celsius: this.props.measurementPref });
  }

  getNewWeather = () => {
    axios.get(`/apiv1/resource/weatherforcast/?loc=${this.props.geoCoordinates}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error('Server fetch failed');
      })
      .then((responseData) => {
        this.setState({ weatherforcast: responseData.weatherforcast });
      }).catch((error) => {
        this.setState({ weatherforcast: [error] });
      });
  }

  updateWeather() {
    this.getNewWeather();
  }

  switchDisplay() {
    this.setState({ celsius: !this.state.celsius });
  }

  switchShowExtended() {
    this.setState({ showExtended: !this.state.showExtended });
  }

  render() {
    const { date, tzOffset, dstOffset } = this.props;
    const { weatherforcast, celsius, showExtended } = this.state;
    const dayWF = {};

    function dateSetup(theDate) {
      // theDate is a unix string in milliseconds - 1492408132560
      // result is the start of day in milliseconds - 1492326000000
      return format(startOfDay(theDate), 'x') * 1;
    }

    function filterDate(elm) {
      // get array of one days worth of weather
      // seconds in a day 86400
      const offsetDate = Math.floor((dateSetup(date) + tzOffset + dstOffset) / 1000);
      return elm.dt >= offsetDate && elm.dt <= offsetDate + 86400;
    }

    function setMeasurementPref(toCalc, isCelsius, type) {
      if (isCelsius) {
        if (type === 'speed') {
          return toCalc;
        }
        return Math.floor(toCalc - 273.15);
      }
      // feet
      if (type === 'speed') {
        return Math.floor(toCalc * 2.236936);
      }
      return Math.floor(((toCalc - 273.15) * 1.8) + 32);
    }

    function setCandF(isCelsius, type) {
      if (type === 'speed') {
        if (isCelsius) {
          return 'm/s';
        }
        return 'mph';
      }
      if (isCelsius) {
        return '°C';
      }
      return '°F';
    }

    function localTime(utcTime) {
      // input time in seconds
      // returns time like 8PM format
      return format(utcTime * 1000, 'hA');
    }

    function maxNumber(tempArr) {
      return Math.max(...tempArr);
    }

    function minNumber(tempArr) {
      return Math.min(...tempArr);
    }

    function toTextualDescription(degree) {
      if (degree > 337.5) return 'Northerly';
      if (degree > 292.5) return 'North Westerly';
      if (degree > 247.5) return 'Westerly';
      if (degree > 202.5) return 'South Westerly';
      if (degree > 157.5) return 'Southerly';
      if (degree > 122.5) return 'South Easterly';
      if (degree > 67.5) return 'Easterly';
      if (degree > 22.5) return 'North Easterly';
      return 'Northerly';
    }

    function returnAggregate(wdInput) {
      const result = {};
      // getting the high and low temps
      result.tempArray = wdInput.map(eWF => eWF.main.temp);
      result.high = maxNumber(result.tempArray);
      result.low = minNumber(result.tempArray);

      result.maxWind = maxNumber(wdInput.map(fFW => fFW.wind.speed));

      // getting the worst weather for a given day
      // TODO show day for day and night for night
      // maybe if time is before sunset time,
      // remove all times after sunset before current if
      result.forcast = wdInput.reduce((acc, wdI) => {
        if (wdI.weather[0].icon > acc.icon) {
          return wdI.weather[0];
        }
        return acc;
      }, {
        icon: '',
        main: '',
      });
      return result;
    }

    dayWF.eventDayWF = weatherforcast.filter(filterDate);
    dayWF.aggregate = returnAggregate(dayWF.eventDayWF);
    dayWF.high = setMeasurementPref(dayWF.aggregate.high, celsius);
    dayWF.low = setMeasurementPref(dayWF.aggregate.low, celsius);
    dayWF.maxWind = setMeasurementPref(dayWF.aggregate.maxWind, celsius, 'speed');
    dayWF.windSpeedType = setCandF(celsius, 'speed');
    dayWF.tempType = setCandF(celsius);
    dayWF.celsius = celsius;
    dayWF.updateWeather = this.updateWeather;
    dayWF.switchDisplay = this.switchDisplay;
    dayWF.switchShowExtended = this.switchShowExtended;
    dayWF.showExtended = showExtended;

    // something went wrong, no weatherforcast returned.
    if (!weatherforcast) {
      return (
        <div>Sorry, we could not load the weather forcast. {' '}
          <IconButton onClick={dayWF.updateWeather} style={style.toggleIconButton} >
            <FaRefresh size={20} />
          </IconButton>
        </div>

      );
    }

    if (dayWF.eventDayWF.length === 0) {
      return null;
    }

    return (
      <div>
        <HeadlineWeather
          {...dayWF}
        />
        {this.state.showExtended ? (
          <div>
            <div className="weather-row">
              <div>
                <span >
                  <FlatButton onClick={dayWF.switchDisplay} style={style.toggleIconButton} >
                    F <ToggleIcon option={dayWF.celsius} /> C
                  </FlatButton>
                </span>
              </div>
              <IconButton onClick={dayWF.updateWeather} style={style.toggleIconButton} >
                <FaRefresh size={20} />
              </IconButton>
            </div>
            <div className="weather-set">
              {dayWF.eventDayWF.map(eDWF => (
                <SingleWeather
                  key={eDWF.dt}
                  {...eDWF}
                  localTime={localTime(eDWF.dt)}
                  temp={setMeasurementPref(eDWF.main.temp, celsius)}
                  tempType={setCandF(celsius)}
                  windDeg={toTextualDescription(eDWF.wind.deg)}
                  windSpeed={setMeasurementPref(eDWF.wind.speed, celsius, 'speed')}
                  windSpeedType={setCandF(celsius, 'speed')}
                  celsius
                />
              ))}
            </div>
          </div>
        ) : null }
      </div>
    );
  }
}

OneDayWeather.propTypes = propTypes;

export default OneDayWeather;