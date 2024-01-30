const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        // target: 'http://testcs.hics.info',
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  configureWebpack: {
    name: process.env.VUE_APP_NAME,
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  },
  chainWebpack(config) {
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    config.when(process.env.NODE_ENV !== 'development', config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: path.join(__dirname, 'src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')

      // remove 'console.log'
      if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_ENV !== 'testing') {
        config.optimization.minimizer('terser').tap(args => {
          Object.assign(args[0].terserOptions.compress, {
            warnings: false, // 默认false
            drop_console: true,
            drop_debugger: true, // 默认true
            pure_funcs: ['console.log']
          })

          return args
        })
      }
    })
  }
}
