
bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 7100;

var path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname,"./client/dist/")));
app.use('/public', express.static(path.join(__dirname,"./client/resources/static/")));
app.use(cookieParser())

var routes = require('./service/routes/');
routes(app);

app.listen(port);

console.log('shipping inspector RESTful API server started on: ' + port);
