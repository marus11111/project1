var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/entry.js',
  output: {
    path: './dist/',
    filename: '[name].[hash].js'
  },
  devServer: {
    inline: true,
    contentBase: './dist',
    stats: 'errors-only'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
            },
      {
        test: /\.html$/,
        loader: 'html'
            },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?name=./pics/[name].[ext]', 'img']
            }
        ]
  },
  plugins: [
        new HtmlPlugin({
      template: './src/index.html'
    })
    ]
}
