/*
 * @Descripttion: 
 * @version: 
 * @Author: xushanshan
 * @Date: 2019-08-01 20:38:37
 * @LastEditors: xushanshan
 * @LastEditTime: 2019-08-09 16:15:26
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname,  './app.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath:'/'  // 设置主出口位于根目录
  },
  mode: 'development',
  module: {
    unknownContextCritical : false,
    rules: [
      { 
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader', 
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ] 
      }, 
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
        // exclude: [/node_modules/, require.resolve('./views/index.html')],
        // use: {
        //     loader: 'file-loader',
        //     query: {
        //         name: '[name].[ext]'
        //     },
        // },
      },
    ]
  },
  target: 'node', // 解决控制台child-progress报错问题
  node: {
    fs: "empty"
  },
  externals: [{
    xmlhttprequest:'{XMLHttpRequest:XMLHttpRequest}'
  }],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: path.resolve(__dirname, 'views/index.html'),
        inject: true
      }
    )
  ]
};