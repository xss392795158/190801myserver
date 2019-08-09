/*
 * @Descripttion: 
 * @version: 
 * @Author: xushanshan
 * @Date: 2019-08-09 11:28:50
 * @LastEditors: xushanshan
 * @LastEditTime: 2019-08-09 19:44:17
 */
let Test = require('./Test4.js').Test;
let express = require('express');
let router = express.Router();

let myPet = new Test();

router.post('/', function(req, res) {
  let params = req.body;
  let {id, category, name, photoUrls,tags, status } = params;
  let body = {
    id, 
    category, 
    name, 
    photoUrls,
    tags, 
    status
  }
  let param = {body}
  myPet.addPet(param).then(resp => {
    res.json(resp);// 这里返回？
  }).catch(err => {
    // err
  })
})

module.exports = router;
