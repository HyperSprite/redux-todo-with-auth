
const validate = (formProps) => {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address';
  }
  if (!formProps.password) {
    errors.password = 'Required';
  } else if (formProps.password.length < 3) {
    errors.password = 'Must be longer than 3 charaters';
  } else if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }
  return errors;
};

export default validate;
