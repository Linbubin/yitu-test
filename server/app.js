const express = require('express')
var bodyParser = require('body-parser');//解析,用req.body获取post参数
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const axios = require('axios')
const { nodeport, ip, port, prefix } = require('./config');

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/action', (req, res) => {
  const params = req.query;
  // http://192.168.10.109:8080/comparison/rest/group/asd
  axios.post('http://192.168.10.109:8080/comparison/rest/group/asd?userid=asd', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
    .then(function (response) {
      console.log(response);
      return res.send(JSON.stringify(params))
    })
    .catch(function (error) {
      console.log(abc)
      console.log(error);
      return res.json({ success: false, msg: error.message })
    }).catch(err => {
      console.log(a);
    }).catch(err => {
      console.log(err.message);
    });
})

app.get('/test', (req, res) => {
  // res.setHeader('Content-Type', 'text/html');
  res.sendfile(`${__dirname}/template/index.html`)
})

app.post('/test1', (req, res) => {
  const {start, limit, repository_ids} = req.body;
  const rep_ids = [].concat(repository_ids.split(','));
  console.log('start, limit, repository_ids::  ', start, limit, rep_ids);
  axios.post(`http://${ip}:${port}}/${prefix}`, {
    // "extra_fields": ["custom_field_1"],
    "condition": {
      "repository_ids": rep_ids
    },
    "order": {
      "timestamp": -1
    },
    "start": start,
    "limit": limit
  }).then(function (response) {
    console.log(response);
    return res.send(JSON.stringify(params))
  }).catch(function (error) {
    console.log(abc)
    console.log(error);
    return res.json({ success: false, msg: error.message })
  }).catch(err => {
    console.log(a);
  }).catch(err => {
    console.log(err.message);
  });
})

app.listen(nodeport, () => console.log(`Example app listening on nodeport ${nodeport}!`))