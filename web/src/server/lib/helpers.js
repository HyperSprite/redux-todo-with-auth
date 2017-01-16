// Helper functions

exports.isProd = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
};

// If LOGGING = true
// This takes an array for argumetns
// For every element of the array,
// a console.log message is generated.
exports.consLog = (arr) => {
  if (process.env.LOGGING === 'true') {
    [].slice.call(arr).forEach((arg) => {
      console.log('>>> ', arg);
    });
  }
};

// Date String helper
exports.correctedTZDate = (stringDate) => {
  const d = new Date(stringDate);
  return `${d.getUTCHours()}:${d.getUTCMinutes()}`;
};
