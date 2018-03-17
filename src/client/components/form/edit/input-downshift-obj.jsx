import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from 'material-ui-next/styles';
import TextField from 'material-ui-next/TextField';
import Paper from 'material-ui-next/Paper';
import { MenuItem } from 'material-ui-next/Menu';

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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: '99%',
    paddingLeft: 6,
  },
});

function getSuggestions(inputValue, data) {
  let count = 0;
  return data.filter((suggestion) => {
    const keep =
      (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 10;

    if (keep) {
      count += 1;
    }
    return keep;
  });
}

function renderInput(inputProps) {
  const { InputProps, classes, ref } = inputProps;
  const { touched, error, warning } = InputProps;
  return (
    <div>
      <TextField
        inputRef={ref}
        classes={classes.input}
        {...InputProps}
      />
      {(touched) && (
        (error && <div className={classes.formError}>{error}</div>) ||
        (warning && <div className={classes.formWarning}>{warning}</div>)
      )}
    </div>
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (`${selectedItem}`).indexOf(suggestion.label) > -1;
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

const InputDownshiftSingleObj = ({ classes, contentOptions, data, fullWidth, input, label, meta, placeholder, ...rest }) => {
    return (
      <div className={classes.root}>
        <Downshift
          onChange={selectedItem => input.onChange(selectedItem.value)}
          itemToString={item => (item ? item.label ? item.label : item : '')}
          selectedItem={input.value}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
            <div className={classes.container}>
              {renderInput({
                classes,
                InputProps: getInputProps({
                  placeholder,
                  id: input.name,
                  input,
                  label,
                  fullWidth,
                  meta,
                }),
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue, data).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
      </div>
    );
};

InputDownshiftSingleObj.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styledInputDownshiftSingleObj = withStyles(styles, { name: 'styledInputDownshiftSingleObj' })(InputDownshiftSingleObj);
const withAutoData = withData(props => props.contentOptions.data);

export default withAutoData(styledInputDownshiftSingleObj);
