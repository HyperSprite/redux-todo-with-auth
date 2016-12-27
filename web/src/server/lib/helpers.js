// Helper functions

exports.isProd = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
};

// Only runs in non-prod
// This takes an array for argumetns
// For every element of the array,
// a console.log message is generated.
exports.consLog = (arr) => {
  if (!exports.isProd()) {
    [].slice.call(arr).forEach((arg) => {
      console.log('>> ', arg);
    });
  }
};

// Date String helper
exports.correctedTZDate = (stringDate) => {
  const d = new Date(stringDate);
  return `${d.getUTCHours()}:${d.getUTCMinutes()}`;
};

exports.mClean = (newVal, opts) => {
  var current = newVal;

  if (typeof current !== 'undefined') {
    // logger.info('multiTrim'+ opts);
    switch (opts) {
      case 0: // letters, numbers, "-" "_" no spaces and trim
        current = current.replace(/[^a-z0-9_\-]/gi, '');
        break;
      case 1: // letters, numbers, "-" "_" "," no spaces and trim
        current = current.replace(/[^a-z0-9_,\-]/gi, '');
        break;
      case 2: // letters, numbers, "-" "_" "," no spaces and trim
      current = current.trim();
        break;
      case 4: // letters, numbers "-" "_" "~" no spaces
        current = current.replace(/[^a-z0-9.,~_\-\/]/gi, '');
        break;
      case 5: // letters, numbers "." "-" "_" ":" leaves internal spaces.
        current = current.replace(/[^a-z0-9._\- :@]/gi, '');
        current = current.trim();
        break;
      case 6: // letters, numbers "." "-" "_" "," ":" leaves internal spaces.
        current = current.replace(/[^a-z0-9.,~_\- :]/gi, '');
        current = current.trim();
        break;
      case 7: // letters, numbers "." "-" "_" no spaces.
        current = current.replace(/[^a-z0-9._\-]/gi, '');
        break;
      case 8: // numbers "." "-" "_" no spaces.
        current = current.replace(/[^0-9._\-]/gi, '');
        break;
      case 9: // lowercase letters, numbers, "-" "_" no spaces and trim
        current = current.replace(/[^a-z0-9_\-]/gi, '');
        break;
      default:
        // logger.info('multiTrim default');
        break;
    }
  }
  return current;
};
