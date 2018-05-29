const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var path = require('path');
// var ea = require('./server/ea');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
})

app.post('/submit', function (req, res) {
  res.send(JSON.stringify(req.body));
  console.log(JSON.stringify(req.body));
})

app.listen(3000, function () {
  console.log('listen to port 3000')
})
