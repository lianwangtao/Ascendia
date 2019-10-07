var path = require('path');
var webpack = require('webpack');

var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'public', 'build');
var NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules')

module.exports = {
  devtool: 'eval',
  entry: [
    // Hot style updates
    'webpack/hot/dev-server',

    // Script to refresh the browser
    'webpack-dev-server/client?http://'+ require("os").hostname() +':8080',

    // App
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.png', '.jpg'],
    root: APP_DIR,
    moduleDirectories: [NODE_MODULES_DIR]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'react-hot',
        exclude: [NODE_MODULES_DIR]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [NODE_MODULES_DIR]
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        exclude: [NODE_MODULES_DIR]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  imageWebpackLoader: {
    mozjpeg: {
      quality: 65
    },
    pngquant: {
      quality: "65-90",
      speed: 10
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
