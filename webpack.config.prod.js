const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
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
  }
];
module.exports = {
  name: 'browser',
  mode: 'production',
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
    rules: commonLoaders,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    // new UglifyJSPlugin(),
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
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.scss$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
  ],
};