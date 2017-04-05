import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import moment from 'moment';

function dateSetup(tDate, tzO) {
  // Takes a date object and rounds to midnight,
  // then offsets it with the local timezone for that location
  // and returns the formated date
  // console.log(tzO);
  // tzO is tzOffset in sec, converted to min.
  return moment(moment(tDate).startOf('day')).utcOffset(-(tzO / 3600)).format('MM/DD/YYYY');
  // return moment(moment(tDate).startOf('day')).format('MM/DD/YYYY');
}

const propTypes = {
  geoCoordinates: PropTypes.string.isRequired, // expects 'lon,lat'
  date: PropTypes.number.isRequired, // unix time in milliseconds
  dstOffset: PropTypes.number.isRequired, // DST offset
  tzOffset: PropTypes.number.isRequired, // UTC offset in milliseconds
};

class Astrophases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      astrophases: {},
    };
    this.updateAstrophases = this.updateAstrophases.bind(this);
  }

  componentWillReceiveProps() {
    this.getAstrophases();
  }

  getAstrophases = () => {
    const { geoCoordinates, date, tzOffset, dstOffset } = this.props;
    axios.get(`/apiv1/resource/astrophases/?loc=${geoCoordinates}&date=${dateSetup(date, (tzOffset + dstOffset))}&tzOffset=${tzOffset + dstOffset}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error('Server fetch failed');
      })
      .then((responseData) => {
        this.setState({ astrophases: responseData.astrophases });
      }).catch((error) => {
        this.setState({ astrophases: { error: 'true', fullError: error } });
      });
  }

  updateAstrophases() {
    this.getAstrophases();
  }

  render() {
    const { astrophases } = this.state;

    // something went wrong, no astro forcast returned.
    if (astrophases.error === 'true') {
      return (
        <div>
          Failed to load Astrophases<br />
          <button onClick={this.updateAstrophases}>Try Again</button>
        </div>
      );
    }

    if (!astrophases.dayofweek) {
      return <div>Loading Astrophases...</div>;
    }

    return (
      <div>
        <div>
          Day {astrophases.dayofweek}<br />
          Date {`${astrophases.month}/${astrophases.day}/${astrophases.year}`}<br />
          Sun Data<br />
          <ul>
            {astrophases.sundata.map(aSun => (
              <li key={aSun.time}>
                <p>
                  phen {aSun.phen} {' - '} time {aSun.time}
                </p>
              </li>
            ))}
          </ul>
          Moon Data <br />
          moon phase is {astrophases.curphase}<br />
          <ul>
            {astrophases.moondata.map(aMoon => (
              <li key={aMoon.time}>
                <p>
                  phen {aMoon.phen} {' - '} time {aMoon.time}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Astrophases.propTypes = propTypes;

export default Astrophases;
