const webpack = require('webpack');

const isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
  const plugins = [];
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }
  })
);

  if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  return plugins;
}

function getEntry() {
  const entry = [];
  if (!isProd) {
    entry.push('webpack-hot-middleware/client');
  }
  entry.push('./src/client/index.jsx');
  entry.push('babel-polyfill');

  return entry;
}

function getOutput() {
  const output = {};
  if (isProd) {
    output.path = './src/server/public/assets/';
  } else {
    output.path = '/../../public/assets/';
  }
  output.publicPath = '/assets/';
  output.filename = 'bundle.js';

  return output;
}

function getPreLoaders() {
  const preLoaders = [];

  if (!isProd) {
    preLoaders.push({
      test: /\.js$/,
      loader: 'source-map-loader',
    });
  }
  return preLoaders;
}

function getLoaders() {
  const loaders = [];
  if (isProd) {
    loaders.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        plugins: ['transform-flow-strip-types', 'transform-runtime'],
        presets: ['es2015', 'stage-0', 'react'],
      },
    });
  } else {
    loaders.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: ['react-hot-loader/webpack', 'babel'],
    });
  }
  // common loaders
  loaders.push({
    test: /\.css$/,
    loader: 'style-loader!css-loader',
  });
  loaders.push({
    test: /\.less/,
    loader: 'style!css!less?rootpath=/assets',
  });
  loaders.push({
    test: /\.gif$/,
    loader: 'url-loader?mimetype=image/png',
  });
  loaders.push({
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff',
  });
  loaders.push({
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader?name=[name].[ext]',
  });

  return loaders;
}

function getDevtool() {
  const devtool = isProd ? null : 'source-map';
  return devtool;
}

module.exports = {
  devtool: getDevtool(),
  context: __dirname,
  entry: getEntry(),
  output: getOutput(),
  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.jsx',
      '.js',
    ],
  },
  plugins: getPlugins(),
  module: {
    loaders: getLoaders(),
    preLoaders: getPreLoaders(),
  },
};
