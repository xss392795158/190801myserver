/*
 * @Descripttion: 
 * @version: 
 * @Author: xushanshan
 * @Date: 2019-08-07 18:39:03
 * @LastEditors: xushanshan
 * @LastEditTime: 2019-08-09 18:37:27
 */
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
// var MySchema = new Schema({ name: String, color: String, sex: String, age: Number, createTime: String}, {collation: 'data'});//, _id: String
/*
id, category, name, photoUrls, tags, status
*/
var MySchema = new Schema({ id: Number, category: Object, name: String, photoUrls: Array, tags:Array, status: String,  createTime: String}, {collation: 'data'});//, _id: String
// 定义表名，在连接数据库中会生成对应的hens表
const Hen = mongoose.model('Hen', MySchema);

// var MySchema = new Schema({ name: String, color: String, sex: String, age: Number, createTime: String}, {collation: 'data'});//, _id: String

/* router.post('/add', bodyParser.json(), function(req, res) { 
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
  const kitty = new Cat({ name, color, sex, age, createTime: +new Date() });//id: new mongoose.Types.ObjectId,
  kitty.save((err, doc) => {
    if(!err) {
      res.end(JSON.stringify(response));
    } else {
      res.end(JSON.stringify(resErr));
    }
  });
}) */

/* router.post('/cat/add', bodyParser.json(), function(req, res) { 
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
  const kitty = new Cat({ name, color, sex, age, createTime: +new Date() });//id: new mongoose.Types.ObjectId,
  kitty.save((err, doc) => {
    if(!err) {
      res.end(JSON.stringify(response));
    } else {
      res.end(JSON.stringify(resErr));
    }
  });
}) */

router.post('/', function(req, res) {
  let params = req.body;
  let { id, category, name, photoUrls, tags, status } = params;
  var data = {
    message: 'success',
    data: null
  };
  var resErr = {
    "message": 'insert error',
    data: null
  };
  res.send({
    status:200,
    message:"success"
  })
  // res.end(JSON.stringify(response));
  // const Cat = mongoose.model('Cat', MySchema);
  const kitty = new Hen({ id, category, name, photoUrls, tags, status, createTime: +new Date() });//id: new mongoose.Types.ObjectId,
  kitty.save((err, doc) => {
    if(!err) {
      // res.send({
      //   status:200,
      //   message:"success"
      // })
      res.end(JSON.stringify(data));
    } else {
      // res.send({
      //   status:10000,
      //   message:"insert error"
      // })
      res.end(JSON.stringify(resErr));
    }
  });
})
// app.post('/test', function (req, res) {
//   debugger
//   res.end(JSON.stringify(response));
//   // res.render('index', { title: 'Hey', message: 'Hello there!'});
// });
router.post('/test', function(req, res) {
  debugger
  let params = req.body;
  let { id, category, name, photoUrls, tags, status } = params;
  var response = {
    "code": 200,
    "message": 'success'
  };
  var resErr = {
    "code": 10000,
    "message": 'insert error'
  };
  // res.send({
  //   status:200,
  //   message:"success"
  // })
  // res.end(JSON.stringify(response));
  // const Cat = mongoose.model('Cat', MySchema);
  const kitty = new Hen({ id, category, name, photoUrls, tags, status, createTime: +new Date() });//id: new mongoose.Types.ObjectId,
  kitty.save((err, doc) => {
    if(!err) {
      res.end(JSON.stringify(response));
    } else {
      res.end(JSON.stringify(resErr));
    }
  });
})
router.post('/cat/list', bodyParser.json(), function(req, res) {
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
module.exports = router;
