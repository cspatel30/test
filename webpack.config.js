const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [ __dirname+'/client/components/main.jsx'],
	output: {
		filename: '[name].bundle.js',
		path: __dirname+'/client/dist/'
	},
  mode: 'development',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react', 'stage-1']
				}
      },
      {
				test: /\.css$/,
				loaders:'css-loader'
			},
			{
				test: /\.scss$/,
				use: [
						"style-loader", // creates style nodes from JS strings
						"css-loader", // translates CSS into CommonJS
						"sass-loader" // compiles Sass to CSS
				]
		}
    ]
	},

  plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		})
	]
	
};