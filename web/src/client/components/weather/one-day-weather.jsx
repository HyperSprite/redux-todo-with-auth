import React, { Component, PropTypes } from 'react';
import axios from 'axios';

const propTypes = {
  geoCoordinates: PropTypes.string.isRequired, // expects 'lon,lat'
  date: PropTypes.number.isRequired, // unix time in milliseconds
  tzOffset: PropTypes.number.isRequired, // UTC offset in milliseconds
};

class OneDayWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherforcast: [],
    };
  }

  componentWillReceiveProps() {
    axios.get(`/apiv1/resource/weatherforcast/?loc=${this.props.geoCoordinates}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error('Server response wasn\'t ok');
      })
      .then((responseData) => {
        this.setState({ weatherforcast: responseData.weatherforcast });
      }).catch((error) => {
        this.setState({ weatherforcast: [error] });
      });
  }

  render() {
    const { date, tzOffset } = this.props;

    function filterDate(elm) {
      // get array of one days worth of weather
      const offsetDate = Math.floor((date + tzOffset) / 1000);
      // seconds in a day 86400
      return elm.dt >= offsetDate && elm.dt <= offsetDate + 86400;
    }

    if (!this.state.weatherforcast) {
      return <div>Loading Weather Forecast....</div>;
    }

    const eventDayWF = this.state.weatherforcast.filter(filterDate);
    return (
      <div>
        {eventDayWF.map(eDWF => (
          <div key={eDWF.dt}>
            <p>
              temp {eDWF.main.temp}<br />
              humidity {eDWF.main.humidity}<br />
              pressure {eDWF.main.pressure}<br />
              icon {eDWF.weather[0].icon}<br />
              wind {eDWF.wind.speed} and {eDWF.wind.deg}<br />
              time {eDWF.dt_txt}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

OneDayWeather.propTypes = propTypes;

export default OneDayWeather;
