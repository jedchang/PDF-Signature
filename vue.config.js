module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/PDF-Signature/' : '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Quickly Sign｜PDF 簽名服務'
      args[0].keywords = 'PDF Web 版本的簽名服務'
      args[0].description = 'PDF Web 版本的簽名服務'
      return args
    })
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/scss/utils/_variables.scss";
          @import "~@/assets/scss/utils/_animations.scss";
          @import "~@/assets/scss/utils/_mixins.scss";
          @import "~@/assets/scss/utils/_custom.scss";
        `
      }
    }
  }
}
