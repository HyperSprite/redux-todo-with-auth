import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import RemoveUser from './remove-user';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class InputRemove extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value.replace(/[^0-9]+/g, ''),
    });
  };
  render() {
    return (
      <div>
        <TextField
          id="remove-user-input"
          label="StravaId to remove"
          className={this.props.classes.textField}
          value={this.state.value}
          onChange={this.handleChange}
          margin="normal"
        />
        {this.state.value && (
          <RemoveUser stravaId={this.state.value * 1} />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { name: 'StyledInputRemove' })(InputRemove);
