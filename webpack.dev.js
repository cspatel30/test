const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a seperate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [ __dirname+'/client/components/main.jsx'],
	output: {
		filename: '[name].bundle.js',
		path: __dirname+'/client/dist/'
	},
	module: {
	    loaders: [
	      {
	        test: /\.(js|jsx)$/,
	        loaders: 'babel-loader',
	        exclude: /node_modules/,
	        query: {
	          presets: ['es2015', 'react', 'stage-1']
	        }
	      },
	      {
                test: /\.css$/,
                loaders:'css-loader'
              }
	    ]
  	},

	plugins: [
		new ExtractTextPlugin('style.css.[contentHash].css'),
		new webpack.LoaderOptionsPlugin({
        	minimize: true,
        	debug: false
      	})
	]
};
