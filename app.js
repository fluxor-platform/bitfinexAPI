var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
})



app.listen(3000, function () {
  console.log('listen to port 3000');
})