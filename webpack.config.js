const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
      name: '[name].[ext]?[hash]',
      limit: 10000,
    },
  },
  {
    test: /jquery-plugin/,
    loader: 'imports?jQuery=jquery,$=jquery,this=>window',
  }
];
module.exports = {
  name: 'browser',
  entry: ["babel-polyfill", "./client/main.js"],
  // entry: {
  //   app: [path.resolve(__dirname, './client/main.js')],
  // },
  output: {
    publicPath: '/',
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: commonLoaders,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
      {
        from: path.resolve(process.cwd(), 'client/resources/static/'),
        to: path.resolve(process.cwd(), 'public/'),
      },
      {
        from: path.resolve(process.cwd(), 'client/index.html'),
        to: path.resolve(process.cwd(), 'public/'),
      }
    ]),
  ],
};
