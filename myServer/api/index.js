const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var MySchema = new Schema({ name: String, color: String, sex: String, age: Number, createTime: String}, {collation: 'data'});//, _id: String
// const Cat = mongoose.model('Cat', MySchema);

router.post('/process_post', bodyParser.json(), function(req, res) { 
  let params = req.body;
  let {first_name, last_name} = params;
  var response = {
      "xingPost": first_name,
      "mingPost": last_name
  };
  
  res.end(JSON.stringify(response));
})

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
  const kitty = new Cat({ name, color, sex, age, createTime: +new Date() });//id: new mongoose.Types.ObjectId,
  kitty.save((err, doc) => {
    if(!err) {
      res.end(JSON.stringify(response));
    } else {
      res.end(JSON.stringify(resErr));
    }
  });
}) */

/* router.post('/pet/add', bodyParser.json(), function(req, res) { 
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
