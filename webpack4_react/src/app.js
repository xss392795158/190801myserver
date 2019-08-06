var express = require('express');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var history = require('connect-history-api-fallback');

var app = express();

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
app.set('views', './src/views'); // 设置子页面主入口
app.engine('html', require('ejs').__express)
app.set('view engine','html')
// app.get('/', function (req, res) {
//   res.render('index', { title: 'Hey', message: 'Hello there!'});
// });
// app.get('/test', function (req, res) {
//   res.render('index', { title: 'Hey', message: 'Hello there!'});
// });
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
app.get('/process_get', function(req, res) {
  var response = {
      "first_name":req.query.first_name,
      "last_name":req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})
var server =  app.listen(8082, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
})