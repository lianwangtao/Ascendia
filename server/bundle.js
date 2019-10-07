// @flow

import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from './../webpack.config'
import { log } from './utils'

const APP = path.resolve(__dirname, '..', 'src', 'index.jsx')
const DEV_SERVER_PORT = 8080

module.exports = function bundle() {
  let bundleStart: number = 0;
  const compiler = webpack(webpackConfig);

  compiler.plugin('compile', () => {
    log('Bundling...');
    bundleStart = Date.now();
  })

  compiler.plugin('done', () => {
    log(`Bundled in ${Date.now() - bundleStart}ms!`)
  })

  const bundler = new WebpackDevServer(compiler, {

    // Tell Webpack to serve our bundled application
    // from the build path. When proxying:
    // http://localhost:3000/build -> http://localhost:8080/build
    publicPath: '/build/',

    // HMR
    hot: true,

    // Terminal configs
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
    },
  });

  bundler.listen(DEV_SERVER_PORT, 'localhost', () => {
    log('HMR dev server listening on 8080')
  })
}
