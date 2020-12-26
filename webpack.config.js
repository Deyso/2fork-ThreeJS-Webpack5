let path = require('path');


module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, 'docs'),
    compress: true,
    open: true,
    port: 8080,
    watchContentBase: true,
		disableHostCheck: true
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'main.js'
  }
}