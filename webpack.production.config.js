var path = require('path');
var webpack = require('webpack')

var NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules');
var BUILD_DIR = path.resolve(__dirname, 'public', 'build');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: APP_DIR + '/index.jsx',
  output: {
    pathinfo: true,
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: [NODE_MODULES_DIR]
    },{
      test: /\.css$/,
      loader: 'style!css'
    },{
      test: /\.(jpg|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack-loader'
      ]
    }]
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css'],
    root: APP_DIR,
    moduleDirectories: [NODE_MODULES_DIR]
  }
};
