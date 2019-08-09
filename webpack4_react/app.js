/*
 * @Descripttion: 
 * @version: 
 * @Author: xushanshan
 * @Date: 2019-08-02 15:25:24
 * @LastEditors: xushanshan
 * @LastEditTime: 2019-08-09 19:16:08
 */
var express = require('express');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var history = require('connect-history-api-fallback');
var fs = require('fs');
var bodyParser = require('body-parser')
var CodeGen = require('swagger-js-codegen').CodeGen;
var file = 'swagger/spec.json';
var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
// var nodejsSourceCode = CodeGen.getReactCode({ className: 'Test', swagger: swagger });
var nodejsSourceCode = CodeGen.getNodeCode({ className: 'Test', swagger: swagger });
// var source = CodeGen.getCustomCode({ 
//   moduleName: 'Test',
//   className: 'Test', 
//   swagger: swagger,
//   template: {
//     class: fs.readFileSync('my-class.mustache', 'utf-8'),
//     method: fs.readFileSync('my-method.mustache', 'utf-8'),
//     type: fs.readFileSync('my-type.mustache', 'utf-8')
//   }
// });
var app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(history({
  verbose: true,
  // index: path.resolve(__dirname, './src/dist/index.html')
  index: '/index.html'
}))
app.use('./static', express.static(__dirname + '/dist'));
/* app.get('/', function(req, res) {
  // res.send('Hello World');
  // res.sendFile(path.resolve("./dist/index.html"));
  res.sendFile(path.resolve(__dirname,'../index.html'));
  /* fs.readFile(__dirname+'/dist/webapp.html', function(err, data){
    res.end(data.toString())
  }) *
}) */
// app.set('views',path.resolve(__dirname,'../views'));
app.set('views', 'src/views'); // 设置子页面主入口
app.engine('html', require('ejs').__express)
app.set('view engine','html')
// app.get('/', function (req, res) {
//   res.render('index', { title: 'Hey', message: 'Hello there!'});
// });
// app.get('/test', function (req, res) {
//   res.render('index', { title: 'Hey', message: 'Hello there!'});
// });
// })
fs.access('api/Test4.js', function(err){
  if(err) {
    fs.writeFile('api/Test4.js', nodejsSourceCode, 'utf-8', function(error){
      if(error) {
        console.log(error);
        return false;
      } else {
        console.log('写入成功');
      }
    })
  }
})
app.use('/pet', require("./api/index.js"))
app.use(express.static(path.join(__dirname)));

let webpackDevConfig = require('./webpack.config.js');
let compiler = webpack(webpackDevConfig);
  // attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {
  // public path should be the same with webpack config
  publicPath: webpackDevConfig.output.publicPath,
  logLevel: 'error',
  stats: {
    colors: true
  }
}));
var server =  app.listen(8082, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
})