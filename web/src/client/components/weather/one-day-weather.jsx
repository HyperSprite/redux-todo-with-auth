import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import moment from 'moment';

const propTypes = {
  geoCoordinates: PropTypes.string.isRequired, // expects 'lon,lat'
  date: PropTypes.number.isRequired, // unix time in milliseconds
  measurementPref: PropTypes.string, // defaults to C
  dstOffset: PropTypes.number.isRequired, // DST offset
  tzOffset: PropTypes.number.isRequired, // UTC offset in milliseconds
};

class OneDayWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherforcast: [],
      clecius: true,
    };
    this.switchDisplay = this.switchDisplay.bind(this);
    this.updateWeather = this.updateWeather.bind(this);
  }

  componentWillReceiveProps() {
    this.getNewWeather();

    if (this.props.measurementPref === 'feet') {
      this.setState({ celsius: false });
    }
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

  render() {
    const { date, tzOffset, dstOffset } = this.props;
    const { weatherforcast, celsius } = this.state;

    // something went wrong, no weatherforcast returned.
    if (!weatherforcast) {
      return <div>Sorry, we could not load the weather forcast</div>;
    }

    function dateSetup(theDate) {
      return moment(theDate).startOf('day');
    }

    function filterDate(elm) {
      // get array of one days worth of weather
      const offsetDate = Math.floor((dateSetup(date) + tzOffset + dstOffset) / 1000);
      // seconds in a day 86400
      return elm.dt >= offsetDate && elm.dt <= offsetDate + 86400;
    }

    function setMeasurementPref(temp, isCelsius) {
      if (isCelsius) {
        return Math.floor(temp - 273.15);
      }
      // feet
      return Math.floor(((temp - 273.15) * 1.8) + 32);
    }

    function localTime(utcTime) {
      return moment.unix(utcTime).format('ddd hA');
    }

    const eventDayWF = weatherforcast.filter(filterDate);

    function maxNumber(tempArr) {
      return Math.max(...tempArr);
    }

    function minNumber(tempArr) {
      return Math.min(...tempArr);
    }

    function returnTemps(wdInput) {
      const result = {};
      result.tempArray = wdInput.map(eWF => eWF.main.temp);
      result.high = maxNumber(result.tempArray);
      result.low = minNumber(result.tempArray);
      return result;
    }

    eventDayWF.temps = returnTemps(eventDayWF);

    return (
      <div>
        <div>
          High {setMeasurementPref(eventDayWF.temps.high, celsius)}<br />
          Low {setMeasurementPref(eventDayWF.temps.low, celsius)}<br />
        </div>
        {eventDayWF.map(eDWF => (
          <div key={eDWF.dt}>
            <p>
              temp {setMeasurementPref(eDWF.main.temp, celsius)}<br />
              humidity {eDWF.main.humidity}<br />
              pressure {eDWF.main.pressure}<br />
              icon <img src={`https://openweathermap.org/img/w/${eDWF.weather[0].icon}.png`} /><br />
              wind {eDWF.wind.speed} and {eDWF.wind.deg}<br />
              time {localTime(eDWF.dt)}
            </p>
          </div>
        ))}
        <button onClick={this.switchDisplay}>Display</button>
        <button onClick={this.updateWeather}>Update</button>
      </div>
    );
  }
}

OneDayWeather.propTypes = propTypes;

export default OneDayWeather;
