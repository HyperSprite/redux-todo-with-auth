// Helper functions

exports.isProd = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
};

exports.consLog = (arr) => {
  if (!exports.isProd()) {
    [].slice.call(arr).forEach((arg) => {
      console.log('>> ', arg);
    });
  }
};
