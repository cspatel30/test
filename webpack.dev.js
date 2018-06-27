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
				},
				{
					test:/\.(css|sass|scss)$/,
					use:ExtractTextPlugin.extract({
						fallback:'style-loader',
						use: ['css-loader','sass-loader','style-loader']
				})					
				},
				{
					// Exclude `js` files to keep "css" loader working as it injects
					// its runtime that would otherwise processed through "file" loader.
					// Also exclude `html` and `json` extensions so they get processed
					// by webpacks internal loaders.
					exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/,/\.scss$/],
					loader: require.resolve('file-loader'),
					options: {
						name: 'static/media/[name].[hash:8].[ext]',
					},
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
