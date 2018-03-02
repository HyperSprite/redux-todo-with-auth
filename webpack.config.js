const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const UglifyJs = require('uglifyjs-webpack-plugin');

let isLogging = false;

const isProd = (process.env.NODE_ENV === 'production');

switch (process.env.LOGGING) {
  case ('normal'):
  case ('minimal'):
  case ('none'):
    isLogging = false;
    break;
  default:
    isLogging = true;
}

// process.traceDeprecation = true;
const useBundleAnalyzerPlugin = false;
// const useBundleAnalyzerPlugin = true;

const compress = {
  // warnings: false,
  // screw_ie8: true,
  // conditionals: true,
  // unused: true,
  // comparisons: true,
  // sequences: true,
  // dead_code: true,
  // evaluate: true,
  // if_return: true,
  // join_vars: true,
};

console.log('webpack', process.env.NODE_ENV, 'isLogging', isLogging, process.env.LOGGING);

function getPlugins() {
  const plugins = [];
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      REACT_APP_GOOGLE_MAPS_WEB: JSON.stringify(process.env.REACT_APP_GOOGLE_MAPS_WEB),
    }
  }));
  plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'nodestatic',
    minChunks(module) {
      const context = module.context;
      return context && context.indexOf('node_modules') >= 0;
    }
  }));
  plugins.push(new ManifestPlugin());
  plugins.push(new WebpackChunkHash());
  console.log('isProd', isProd, 'isLogging', isLogging);
  if (isProd && isLogging) {
    plugins.push(new UglifyJs({ sourceMap: true, uglifyOptions: { warnings: true } }));
  } else if (isProd) {
    console.log('Loading prod plugins');
    plugins.push(new UglifyJs());
  } else {
    console.log('Loading non-prod plugins');
    plugins.push(new webpack.HotModuleReplacementPlugin());
    // plugins.push(new UglifyJs({ sourceMap: true, uglifyOptions: { warnings: true } }));
    if (useBundleAnalyzerPlugin) plugins.push(new BundleAnalyzerPlugin());
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
    output.filename = '[name]-[chunkhash].js';
    output.chunkFilename = '[name].[chunkhash].js';
  } else {
    output.path = '/../../public/assets/';
    output.filename = '[name].js';
  }
  output.publicPath = '/assets/';
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
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015'],
            ['stage-0'],
            ['react'],
          ],
          plugins: [
            ['lodash'],
            ['date-fns'],
            ['recharts'],
            ['transform-flow-strip-types'],
            ['transform-runtime'],
          ],
        },
      }],
    });
  } else {
    rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015'],
            ['stage-0'],
            ['react'],
          ],
          plugins: [
            ['lodash'],
            ['date-fns'],
            ['recharts'],
            ['react-hot-loader/babel'],
            ['transform-flow-strip-types'],
            ['transform-runtime'],
          ],
        },
      }],
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
  entry: {
    bundle: getEntry(),
  },
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
