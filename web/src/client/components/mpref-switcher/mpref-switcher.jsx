import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatButton } from 'material-ui';
// eslint-disable-next-line
import * as actions from '../../actions';
import ToggleIcon from '../form/toggle-icon';

const propTypes = {
  mPref: PropTypes.bool.isRequired,
  setMPrefSwitch: PropTypes.func.isRequired,
  setDrawer: PropTypes.func.isRequired,
};

class MPrefSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.switchMeasurementPref = this.switchMeasurementPref.bind(this);
  }

  switchMeasurementPref() {
    this.props.setMPrefSwitch();
    this.props.setDrawer({ drawer: false });
  }

  render() {
    return (
      <FlatButton onClick={this.switchMeasurementPref} fullWidth >
        Metric <ToggleIcon option={this.props.mPref} /> Imperial
      </FlatButton>
    );
  }

}

function mapStateToProps(state) {
  return {
    mPref: state.page.mPref,
  };
}

MPrefSwitcher.propTypes = propTypes;

export default connect(mapStateToProps, actions)(MPrefSwitcher);
