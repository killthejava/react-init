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

  // Efficiently evaluate modules with source maps
  devtool: 'eval',

  // Set entry point to source script and include necessary files for hot load
  entry: [
    `webpack-dev-server/client?${config.webpackUrl}`,
    'webpack/hot/only-dev-server',
    `./${config.sourceDirectory}/${config.sourceScript}`
  ],

  // This will not actually create a bundle.js file in ./build. It is used
  // by the dev server for dynamic hot loading.
  output: {
    path: config.assetsPath,
    filename: config.assetsScript,
    publicPath: `${config.webpackUrl}/${config.assetsDirectory}/`,
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js'
  },

  // Necessary plugins for hot load
  plugins: [
    new webpack.DefinePlugin(Object.assign({}, {
      'process.env.NODE_ENV': '"development"'
    }, environment)),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin(config.assetsStyle, {
      allChunks: true
    })
  ],

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass?sourceMap'
      },
      {
        test: /\.css$/,
        loader: 'style!css!'
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
