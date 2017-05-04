const webpack = require('webpack');
const path = require('path');

const isProd = (process.env.NODE_ENV === 'production');
const isLogging = (process.env.LOGGING === 'true');

console.log('webpack', process.env.NODE_ENV, 'isLogging', isLogging);

function getPlugins() {
  const plugins = [];
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }
  }));
  console.log('isProd', isProd, 'isLogging', isLogging);
  if (isProd && isLogging) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true }));
  } else if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  return plugins;
}

function getEntry() {
  const entry = [];
  if (!isProd) {
    entry.push('react-hot-loader/patch');
    entry.push('webpack-hot-middleware/client');
    entry.push('webpack/hot/only-dev-server');
  }
  entry.push('./src/client/index.jsx');
  // entry.push('babel-polyfill-loader');

  return entry;
}

function getOutput() {
  const output = {};
  if (isProd) {
    output.path = path.resolve(__dirname, './src/server/public/assets/');
  } else {
    output.path = '/../../public/assets/';
  }
  output.publicPath = '/assets/';
  output.filename = 'bundle.js';

  return output;
}

function getRules() {
  const rules = [];
  if (isLogging) {
    rules.push({
      test: /\.js$/,
      loader: 'source-map-loader',
    });
  }
  if (isProd) {
    rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: ['babel-loader?plugins[]=transform-flow-strip-types,plugins[]=transform-runtime,presets[]=es2015,presets[]=stage-0,presets[]=react'],
    });
  } else {
    rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: ['babel-loader?plugins[]=react-hot-loader/babel,plugins[]=transform-flow-strip-types,plugins[]=transform-runtime,presets[]=es2015,presets[]=stage-0,presets[]=react'],
    });
  }
  // common rules
  rules.push({
    test: /\.css$/,
    loader: 'style-loader!css-loader!postcss-loader',
  });
  rules.push({
    test: /\.less/,
    loader: 'style-loader!css-loader!less-loader?rootpath=/assets',
  });
  rules.push({
    test: /\.gif$/,
    loader: 'url-loader?mimetype=image/png',
  });
  rules.push({
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff',
  });
  rules.push({
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader?name=[name].[ext]',
  });
  rules.push({
    test: /\.(jpe?g|png|gif)$/i,
    loader: 'url-loader?limit=10000!img-loader?progressive=true',
  });

  return rules;
}

module.exports = {
  devtool: isLogging ? 'source-map' : '',
  devServer: !isProd ? { hot: true } : { hot: false },
  context: __dirname,
  entry: getEntry(),
  output: getOutput(),
  resolve: {
    extensions: [
      '.jsx',
      '.js',
    ],
  },
  plugins: getPlugins(),
  module: {
    rules: getRules(),
  },
};
