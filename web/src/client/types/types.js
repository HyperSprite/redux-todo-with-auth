import {
  arrayOf,
  bool,
  func,
  object,
  number,
  shape,
  string,
} from 'prop-types';

const types = {};
/** imports */
/** import withStyles from 'material-ui/styles' */
types.classes = object;

/** project local */
/** data fetching function */
types.fetchData = func;
/** Measurement Prefrence: metric: false, imperial: true */
types.mPref = bool;
/** Number of waiting items */
types.queued = number;
/** Numner of processed items */
types.processed = number;
/** Sets PageName */
types.setPageName = func;
/** User in Redux from Server */
types.user = shape({
  ftpHistory: arrayOf(shape({
    date: string,
    ftp: number,
  })),
  premium: bool,
  userGeoElevation: number,
});

export default types;
