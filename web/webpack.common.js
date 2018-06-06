const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');

const resolve = dir => path.join(__dirname, dir);

const pluginsArr = [];

pluginsArr.push(new ManifestPlugin());
pluginsArr.push(new webpack.DefinePlugin({
  'process.env': {
    REACT_APP_GOOGLE_MAPS_WEB: JSON.stringify(process.env.REACT_APP_GOOGLE_MAPS_WEB),
  },
}));
if (process.env.BUILDANALYZER) {
  pluginsArr.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry: {
    bundle: resolve('src/client/index.jsx'),
  },
  output: {
    path: resolve('src/server/public/assets/'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  plugins: pluginsArr,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'nodestatic',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.gif$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              publicPath: '/assets/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.less/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              rootpath: '/assets',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
          {
            loader: 'img-loader',
            options: {
              progressive: true,
            },
          },
        ],
      },
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
            ],
          },
        }],
      },
    ],
  },
  resolve: {
    modules: [
      resolve('src/client'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
};
