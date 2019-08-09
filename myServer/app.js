/*
 * @Descripttion: 
 * @version: 
 * @Author: xushanshan
 * @Date: 2019-08-01 20:38:37
 * @LastEditors: xushanshan
 * @LastEditTime: 2019-08-09 17:32:39
 */
var express = require('express');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
// var Schema = mongoose.Schema;
// var MySchema = new Schema({ name: String, color: String, sex: String, age: Number, createTime: String}, {collation: 'data'});//, _id: String
// const Cat = mongoose.model('Cat', MySchema);

mongoose.connect('mongodb://localhost/pets', { useNewUrlParser: true }, (err,res) => {
  if(!err) {
    console.log('连接成功')
  } else {
    console.log('连接失败')
  }
});

app.use('./static', express.static(__dirname + '/dist'));
// app.get('/', function(req, res) {
//   // res.send('Hello World');
//   res.sendFile(path.resolve("./dist/index.html"));
//   // res.sendFile(path.resolve(__dirname,'\\dist\\webapp.html'));
//   /* fs.readFile(__dirname+'/dist/webapp.html', function(err, data){
//     debugger
//     res.end(data.toString())
//   }) */
// app.set('views',path.resolve(__dirname,'../views'));
app.set('views', './src/views'); // 设置子页面主入口
app.engine('html', require('ejs').__express)
app.set('view engine','html')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
var response = {
  "code": 200,
  "message": 'success'
};
// app.post('/test', function (req, res) {
//   debugger
//   res.end(JSON.stringify(response));
//   // res.render('index', { title: 'Hey', message: 'Hello there!'});
// });
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

app.all('*', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("Content-Type", "application/json;charset=utf-8");

  next()
});
//bodyParser.json(),
/* app.post('/pet', function(req, res) { 
  let method = req.method;
  var response = {
    "code": 200,
    "message": 'success'
  };

  if(method === 'OPTIONS') {
    res.end(JSON.stringify(response));
  } else {
    let params = req.body;
    debugger
    res.end(JSON.stringify(response));
    // let { name, color, sex, age } = params;
    
    // var resErr = {
    //   "code": 10000,
    //   "message": 'insert error'
    // };
    // const kitty = new Cat({ name, color, sex, age, createTime: +new Date() });//id: new mongoose.Types.ObjectId,
    // kitty.save((err, doc) => {
    //   if(!err) {
    //     res.end(JSON.stringify(response));
    //   } else {
    //     res.end(JSON.stringify(resErr));
    //   }
    // })
  }
}); *///require('./api/pet')
app.use('/pet', require('./api/pet.js'));
// app.use('/test', require('./api/index'));

var server =  app.listen(8088, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
})