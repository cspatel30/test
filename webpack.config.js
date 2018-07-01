const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.scss/,
    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?minimize=true!sass-loader' }),
  },
  {
    test: /\.css/,
    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?minimize=true' }),
  },
  {
    test: /\.(png|jpg|jpeg|svg|woff|woff2|ttf|eot|ico)$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
    },
  },
];
module.exports = {
  name: 'browser',
  entry: {
    app: [path.resolve(__dirname, './client/components/main.jsx')],
  },
  output: {
    path: path.resolve(__dirname, './client/dist/'),
    // publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    loaders: commonLoaders,
  },
  resolve: {
    alias: {
            momentDate: 'moment/moment.js',
     } ,
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
};
