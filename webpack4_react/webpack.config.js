const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: [require.resolve('babel-polyfill'), path.resolve(__dirname,  './src/main.jsx')]//'babel-polyfill'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath:'/'  // 设置主出口位于根目录
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devtool: 'inline-source-map',
  // devtool: 'inline-cheap-source-map',// 父一级错误行
  // devtool: 'inline-cheap-module-source-map',// 包括modules的错误行
  // devtool: 'cheap-module-eval-source-map',
  // devtool: 'eval',// 一行内的错误
  module: {
    unknownContextCritical : false,
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ] 
      }, 
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader', 
            options: {
              modules: true
            }
          },
        ] 
      }, 
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader', 
            // options: {
            //   modules: true
            // }
          },
          {
            loader: 'sass-loader'
          }
        ] 
      }, 
      // { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
      { 
        test: /\.(js|jsx)?$/, 
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: true,
            // plugins: [
            //   ["import", [{}]]
            // ]
          }
        }]
      },
      // {
      //   test:/\.jsx$/, 
      //   loaders:['jsx-loader?harmony']
      // },
      /* { test: /\.jsx?$/,
        loader: 'babel',
        include: path.resolve(__dirname),
        query: {
          preset: ['es2015', 'react']
        }
      }, */
        // use: 'jsx-loader' },
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
        template: path.resolve(__dirname, 'src/views/index.html'),
        inject: true
      }
    )
  ]
};