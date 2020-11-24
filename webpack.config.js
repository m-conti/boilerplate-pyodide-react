const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./config/paths');

const DEV_ENV = process.env.NODE_ENV === 'development';
const PROD_ENV = process.env.NODE_ENV === 'production';

let config = {
  target: 'web',
  output: {
    path: paths.out,
    publicPath: paths.public,
    filename: 'index.js',
  },
  plugins :[
    new HtmlWebpackPlugin({ template : 'src/index.html' })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /(node_modules|\.worker\.js$)/i,
        use: [ 'babel-loader' ],
      },
      {
        test: /\.worker.js$/i,
        use: [
          { loader: 'worker-loader' }
        ],
      },
      {
        test: /.py$/,
        loader: 'raw-loader'
      }
    ]
  }
}

module.exports = config;
