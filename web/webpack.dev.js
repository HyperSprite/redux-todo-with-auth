const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: merge(common.output, {
    publicPath: '/assets/',
    path: '/../../public/assets/',
    chunkFilename: '[name].js',
    filename: '[name].js',
  }),
  // output: Object.apply({}, common.output, { publicPath: '/assets/' }),
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'stage-0',
              'react',
            ],
            plugins: [
              'lodash',
              'date-fns',
              'recharts',
              'transform-flow-strip-types',
              'transform-runtime',
              'react-hot-loader/babel',
            ],
          },
        }],
      },
    ],
  },
});
