var express = require('express');
var path = require('path');
var webpack = require('webpack');
const bodyParser = require("body-parser");
var webpackDevMiddleware = require('webpack-dev-middleware');
var app = express();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/xss', { useNewUrlParser: true }, (err,res) => {
  if(!err) {
    console.log('连接成功')
  } else {
    console.log('连接失败')
  }
});

// var MySchema = new Schema;
var MySchema = new Schema({ name: String, color: String, sex: String, age: Number, createTime: String, _id: String}, {collation: 'data'});
// MySchema.add({ name: 'string', color: 'string', price: 'number' })
// MySchema.add({ name: String, color: String, sex: String, age: Number, createTime: String, _id: String})

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
app.get('/test', function (req, res) {
  
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
// })
app.use(express.static(path.join(__dirname)));

let webpackDevConfig = require('../webpack.config.js');
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
})
app.get('/process_get', function(req, res) {

  var response = {
      "xing":req.query.first_name,
      "ming":req.query.last_name
  };
  
  res.end(JSON.stringify(response));
})
app.post('/process_post', bodyParser.json(), function(req, res) {
  let params = req.body;
  let {first_name, last_name} = params;
  var response = {
      "xingPost": first_name,
      "mingPost": last_name
  };
  
  res.end(JSON.stringify(response));
})
app.post('/cat/add', bodyParser.json(), function(req, res) {
  let params = req.body;
  let { name, color, sex, age } = params;
  var response = {
    "code": 200,
    "message": 'success'
  };
  var resErr = {
    "code": 10000,
    "message": 'insert error'
  };
  const Cat = mongoose.model('Cat', MySchema);
  const kitty = new Cat({ id: new mongoose.Schema.Types.ObjectId, name, color, sex, age, createTime: +new Data() });
  kitty.save((err, doc) => {
    if(!err) {
      res.end(JSON.stringify(response));
    } else {
      res.end(JSON.stringify(resErr));
    }
  })/* .then(() => {
    debugger
  }) */;
  
  
})
app.post('/cat/list', bodyParser.json(), function(req, res) {
  let params = req.body;
  // let { name, color, sex, age } = params;
  var response = {
    "code": 200,
    "message": 'success'
  };
  var resErr = {
    "code": 10000,
    "message": 'insert error'
  };
  // res.end(JSON.stringify(response));
  const Cat = mongoose.model('Cat', MySchema);
  Cat.find({}, 'name color sex age createTime').sort({name: 1}).collation({locale: 'en_US', numericOrdering: true})
    .then(docs => {
  // .populate([{path: 'name'}, {path: 'color'}, {path: 'sex'}, {path: 'age'},{path: 'createTime'} ])
  // .exec(function (err,result) {
    response.list = docs||[];
    debugger
    res.end(JSON.stringify(response));
    // if(!err) {
    //   response.list = result;
    //   res.end(JSON.stringify(response));
    // } else {
    //   res.end(JSON.stringify(resErr));
    // }
  })
  // const kitty = new Cat({ name, color, sex, age, createTime: moment().format('YYYY-MM-DD HH:mm:ss') });
  /* kitty.save((err, doc) => {
    if(!err) {
      res.end(JSON.stringify(response));
    } else {
      res.end(JSON.stringify(resErr));
    }
  }).then(() => {
    debugger
  }) */;
  
  
})
var server =  app.listen(8088, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
})