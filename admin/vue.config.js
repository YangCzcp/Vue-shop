const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false, // 关闭eslint
  devServer:{
    proxy:'http://139.9.195.224:3010'
  }
})
