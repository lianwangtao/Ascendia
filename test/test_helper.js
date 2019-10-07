import { jsdom } from 'jsdom'

const html = `
  <!doctype html>
  <html>
    <head>
    </head>
    <body></body>
  </html>
`

global.document = jsdom(html)
global.window = document.defaultView
global.navigator = global.window.navigator

// Prevent mocha from interpreting specific filetypes
function noop() {
  return null
}

require.extensions['.css'] = noop

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key]
  }
})
