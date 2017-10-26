import React from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

export default class VisibilitySensorLock extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    height: PropTypes.number,
  }

  static defaultProps = {
    children: null,
    height: 100,
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  state = {
    locked: false,
  }

  onChange(isVisible) {
    if (isVisible) {
      this.setState({
        locked: true,
      });
    }
  }

  render() {
    const { children, height } = this.props;
    const { locked } = this.state;
    return (
      <VisibilitySensor
        partialVisibility
        onChange={this.onChange}
        active={!locked}
        minTopValue={-50}
      >
        {locked ? () => children : <div style={{ height }}> loading... </div>}
      </VisibilitySensor>
    );
  }
}
