import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuListItemSwitch from '../menu-list-item-switch';
// eslint-disable-next-line
import * as actions from '../../actions';

const propTypes = {
  mPref: PropTypes.bool.isRequired,
  setMPrefSwitch: PropTypes.func.isRequired,
  setDrawer: PropTypes.func.isRequired,
};

class SwitcherMPref extends React.Component {
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
      <MenuListItemSwitch
        label={mPref ? 'Imperial' : 'Metric'}
        onChange={this.switchMeasurementPref}
        checked={mPref}
        color="primary"
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    mPref: state.page.mPref,
  };
}

SwitcherMPref.propTypes = propTypes;

export default connect(mapStateToProps, actions)(SwitcherMPref);
