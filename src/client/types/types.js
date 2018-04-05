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
types.fetchData = func;
types.mPref = bool;
types.queued = number;
types.processed = number;
types.setPageName = func;
types.user = shape({
  ftpHistory: arrayOf(shape({
    date: string,
    ftp: number,
  })),
  premium: bool,
  userGeoElevation: number,
});

export default types;
