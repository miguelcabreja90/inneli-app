const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {

  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@views', resolve('src/views'))
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },

  devServer: {
     proxy: {
       '/api': {
         target: 'http://localhost:8000/api',
         ws: false,
         changeOrigin: true
       },
     }
  },

  assetsDir: 'static',
  runtimeCompiler: true
}