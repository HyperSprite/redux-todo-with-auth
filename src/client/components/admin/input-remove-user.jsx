import React from 'react';
import TextField from 'material-ui/TextField';
import style from '../../styles/style';

import RemoveUser from './remove-user';

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
          floatingLabelText="StravaId of User to be removed"
          style={style.input}
          id="remove-user-input"
          value={this.state.value}
          onChange={this.handleChange}
        />
        {this.state.value && (
          <RemoveUser stravaId={this.state.value * 1} />
        )}
      </div>
    );
  }
}

export default InputRemove;
