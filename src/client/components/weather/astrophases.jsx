import React, { Component, PropTypes } from 'react';
import axios from 'axios';

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
    axios.get(`/apiv1/resource/astrophases/?loc=${geoCoordinates}&date=${date}&tzOffset=${tzOffset + dstOffset}`)
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

    // something went wrong, no weatherforcast returned.
    if (!astrophases.dayofweek) {
      return <div>Loading...</div>;
    }

    if (astrophases.error === 'true') {
      return <div>Failed to load Astrophases</div>;
    }

    return (
      <div>
        <div>
          Day {astrophases.dayofweek}<br />
          Date {`${astrophases.month}/${astrophases.day}/${astrophases.year}`}
          Sun<br />
          <ul>
            {astrophases.sundata.map(aSun => (
              <li key={aSun.time}>
                <p>
                  phen {aSun.phen} {' - '} time {aSun.time}
                </p>
              </li>
            ))}
          </ul>
          Moon is {astrophases.curphase}<br />
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
        <button onClick={this.updateAstrophases}>Update</button>
      </div>
    );
  }
}

Astrophases.propTypes = propTypes;

export default Astrophases;
