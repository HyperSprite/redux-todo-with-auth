import React from 'react';
import TextField from '@material-ui/core/TextField';

const DownshiftInput = (props) => {
  const { InputProps, classes, ref } = props;
  const { touched, error, warning } = InputProps;
  return (
    <div>
      <TextField
        inputRef={ref}
        className={classes.formControl}
        {...InputProps}
      />
      {(touched) && (
        (error && <div className={classes.formError}>{error}</div>) ||
        (warning && <div className={classes.formWarning}>{warning}</div>)
      )}
    </div>
  );
};

export default DownshiftInput;
