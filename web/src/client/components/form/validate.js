
const validate = (formProps) => {
  const errors = {};
  // Emil
  if (!formProps.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address';
  }
  // Password
  if (!formProps.password) {
    errors.password = 'Required';
  } else if (formProps.password.length < 12) {
    errors.password = 'Must be longer than 3 charaters';
  } else if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }
  // eventTitle
  if (!formProps.eventTitle) {
    errors.eventTitle = 'Required';
  } else if (/[^\w .,!'-]/g.test(formProps.eventTitle)) {
    errors.eventTitle = 'Only letters, numbers and \',._- permitted';
  } else if (formProps.eventTitle.length < 10) {
    errors.eventTitle = 'Must be longer than 10 charaters';
  }
  // eventDate
  if (!formProps.eventDate) {
    errors.eventDate = 'Required';
  }
  // eventSeries
  if (/[^\w .,!'-]/g.test(formProps.eventSeries)) {
    errors.eventSeries = 'Only letters, numbers and \',._- permitted';
  }
  // eventOrg
  if (/[^\w .,!'-]/g.test(formProps.eventOrg)) {
    errors.eventOrg = 'Only letters, numbers and \',._- permitted';
  }
  // eventLocStreet
  if (/[^\w .,!'-]/g.test(formProps.eventLocStreet)) {
    errors.eventLocStreet = 'Only letters, numbers and \',._- permitted';
  }
  // eventLocCity
  if (!formProps.eventLocCity) {
    errors.eventTitle = 'Required';
  } else if (/[^\w .,!'-]/g.test(formProps.eventLocCity)) {
    errors.eventLocCity = 'Only letters, numbers and \',._- permitted';
  }
  // eventLocState
  // eventLocCountry
  // eventLocZip
  if (/[^\w .,!'-]/g.test(formProps.eventLocStreet)) {
    errors.eventLocStreet = 'Only letters, numbers and \',._- permitted';
  }
  // eventStartElevation
  // eventURL
  // eventDesc
  // eventType
  // eventRoutes
  return errors;
};

export default validate;
