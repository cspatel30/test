const webpack = require('webpack');
const path = require('path');
/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
				{ test: /\.(png|jpg|svg|otf|ttf)$/, loader: "url-loader" }
	    ]
  	},

	plugins: [
		new UglifyJSPlugin(),
		new ExtractTextPlugin('style.css.[contentHash].css'),
		new webpack.LoaderOptionsPlugin({
        	minimize: true,
        	debug: false
      	}),
      	new webpack.DefinePlugin({
        	'process.env': {
          		'NODE_ENV': JSON.stringify('production')
        	}
      	}),
      	new webpack.optimize.UglifyJsPlugin({
        	beautify: false,
        	mangle: {
          		screw_ie8: true,
          	keep_fnames: true
        	},
	        compress: {
			  screw_ie8: true,
			  booleans: false
	        },
	        comments: false
      	})
	]
};
