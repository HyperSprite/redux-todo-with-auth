import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';
// eslint-disable-next-line
import * as actions from '../../actions';
// import ToggleIcon from '../form/toggle-icon';
import style from './style';

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
    const { mPref } = this.props;
    return (
      <Toggle
        style={style.toggle}
        label={mPref ? 'Imperial' : 'Metric'}
        onToggle={this.switchMeasurementPref}
        toggled={mPref}
      />
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
