import React from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

export default class VisibilitySensorLock extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  static propTypes = {
    // children: PropTypes.node.isRequired,
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
    const { locked } = this.state;
    return (
      <VisibilitySensor
        partialVisibility
        onChange={this.onChange}
        active={!locked}
        minTopValue={-50}
      >
        {locked ? () => this.props.children : <div> loading... </div>}
      </VisibilitySensor>
    );
  }
}
