/* eslint max-len:0 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./');
const helpers = require('./helpers');

const environment = helpers.parseDotenvConfig(
  require('dotenv').config(path.resolve(__dirname, '../.env'))
);

module.exports = {
  context: config.rootPath,

  entry: [
    `./${config.sourceDirectory}/${config.sourceScript}`
  ],

  output: {
    path: config.assetsPath,
    filename: config.assetsScript
  },

  plugins: [
    new ExtractTextPlugin(config.assetsStyle, {
      allChunks: true
    }),
    new webpack.DefinePlugin(Object.assign({}, {
      'process.env.NODE_ENV': '"production"'
    }, environment)),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style!css!'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },

  resolve: {
    extensions: config.extensions
  },

  postcss: config.postCSS
};
