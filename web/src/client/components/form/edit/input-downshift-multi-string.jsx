import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from 'material-ui-next/styles';
import TextField from 'material-ui-next/TextField';
import Paper from 'material-ui-next/Paper';
import { MenuItem } from 'material-ui-next/Menu';
import Chip from 'material-ui-next/Chip';

import withData from '../../../containers/withData';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit / 4}px`,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: '99%',
    paddingLeft: 6,
  },
});

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;
  return (
    <TextField
      label={InputProps.label}
      {...other}
      className={classes.formControl}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...InputProps,
      }}
    />
  );
}


function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (`${selectedItem}`).indexOf(suggestion) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function getSuggestions(inputValue, data) {
  let count = 0;
  return data.filter((suggestion) => {
    const keep =
      (!inputValue || suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 10;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

class InputDownshiftMultiString extends React.Component {
  state = {
    inputValue: '',
  };

  handleKeyDown = event => {
    const { inputValue } = this.state;
    const selectedItem = this.props.input.value;
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.props.array.pop(this.props.input.name);
    }
  };

  handleInputChange = (event) => {
    let currentValue = event.target.value;
    const newSpace = currentValue.indexOf(' ') !== -1;
    if (this.props.contentOptions && this.props.contentOptions.normalizer) {
      const normalizer = new RegExp(this.props.contentOptions.normalizer, 'gi');
      currentValue = currentValue.replace(normalizer, '');
    }
    if (this.props.contentOptions.allowNew && newSpace) {
      this.handleChange(currentValue.trim());
    } else {
      this.setState({ inputValue: currentValue });
    }
  };

  handleChange = (item) => {
    const selectedItem = this.props.input.value;
    const nextValue = typeof item === 'string' ? item : this.state.inputValue;
    if (nextValue && selectedItem.indexOf(nextValue) === -1) {
      this.props.input.onChange([...selectedItem, nextValue.toLowerCase()]);
    }
    this.setState({
      inputValue: '',
    });
  };

  handleDelete = item => () => {
    const selectedItem = [...this.props.input.value];
    selectedItem.splice(selectedItem.indexOf(item), 1);

    this.props.input.onChange(selectedItem);
  };

  render() {
    const { classes, contentOptions, data, fullWidth, input, label, placeholder, meta, ...rest } = this.props;
    const { inputValue } = this.state;
    return (
      <div className={classes.root}>
        <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={input.value}>
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue: inputValue2,
            selectedItem: selectedItem2,
            highlightedIndex,
          }) => (
            <div className={classes.container}>
              {renderInput({
                fullWidth,
                classes,
                InputProps: getInputProps({
                  startAdornment: input.value.length > 0 && input.value.map(item => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={this.handleDelete(item)}
                    />
                  )),
                  label,
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleKeyDown,
                  onBlur: this.handleChange,
                  placeholder,
                  id: input.name,
                }),
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue2, data).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem: selectedItem2,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

InputDownshiftMultiString.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styledInputDownshiftMultiString = withStyles(styles, { name: 'styledInputDownshiftMultiString' })(InputDownshiftMultiString);
const withAutoData = withData(props => props.contentOptions.data);
export default withAutoData(styledInputDownshiftMultiString);
