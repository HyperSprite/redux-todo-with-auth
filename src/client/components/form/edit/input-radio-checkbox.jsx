import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  initialValue: PropTypes.any,
  meta: PropTypes.object,
};

const styles = theme => ({
  formError: {
    color: '#dd0000',
    fontWeight: 'bold',
  },
  formWarning: {
    color: '#dd9900',
    fontWeight: 'bold',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class InputCheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValue: '',
    };
  }

  handleChange(newValue) {
    const checkedValue = this.state.checkedValue === newValue ? '' : newValue;
    this.setState({
      checkedValue,
    });
    this.props.input.onChange(checkedValue);
    if (this.props.onChangeSubmit) {
      setTimeout(() => {
        this.props.input.onChange(this.props.onSearchClick());
      }, 0);
    }
  }

  render() {
    const {
      classes,
      input,
      label,
      type,
      initialValue,
      contentOptions,
      meta: { touched, error, warning },
    } = this.props;

    return (
      <div >
        <FormControl
          component="fieldset"

        >
          <FormLabel
            component="legend"
          >
            {label}
          </FormLabel>
          <FormGroup
            aria-label={input.name}
          >
            {contentOptions.data.filter(f => f.value > 0).map(cOpts => (
              <FormControlLabel
                key={cOpts.label}
                label={cOpts.label}
                control={
                  <Checkbox
                    value={cOpts.value}
                    onChange={() => this.handleChange(cOpts.value)}
                    checked={(this.state.checkedValue === cOpts.value)}
                  />
                }
              />
            ))}
          </FormGroup>
        </FormControl>
        {touched && (
          (error && <div className={classes.formError}>{error}</div>) ||
          (warning && <div className={classes.formWarning}>{warning}</div>)
        )}
      </div>
    );
  }
}


InputCheckboxGroup.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledInputCheckboxGroup' })(InputCheckboxGroup);
