const glob = require('glob')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path')

module.exports = {
  mode: "development",
  entry: () => {
    const paths = [...glob.sync('./src/css/**', {nodir: true}), ...glob.sync('./src/js/**', {nodir: true})]
    let result = {}
    for (let i = 0; i < paths.length; i++) {
      if (paths[i].endsWith('.woff2')) {
        continue
      }
      let k, li = paths[i].lastIndexOf('.')
      if (li >= 0) {
        // 不要src
        k = paths[i].substring(3, li)
      } else {
        throw new Error('文件没有拓展符')
      }
      result[k] = './' + paths[i]
    }
    return result
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/source",
  },
  module: {
    rules: [
      {
        test: /.s?css$/,
        loader: MiniCssExtractPlugin.loader,
      },
      {
        test: /.s?css$/,
        loader: "css-loader",
        options: {
          url: false,
          modules: false
        }
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new UglifyJsPlugin()
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/css/fonts/',
          to: './css/fonts/'
        },
        {
          from: './src/images',
          to: './images'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
  watchOptions: {
    ignored: ['**/node_modules']
  }
}
