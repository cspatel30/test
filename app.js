const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 7100;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/dist', express.static(path.join(__dirname,"./client/dist/")));
app.use(express.static(path.join(__dirname,"./client/")));
app.use('/public', express.static(path.join(__dirname,"./client/resources/static/")));
// app.use('/public', express.static(path.join(__dirname,"./client/dist/")));
// app.use('/public', express.static(path.join(__dirname,"./client/resources/static/")));
app.use(cookieParser())

var routes = require('./service/routes/');
routes(app);


app.listen(port);

console.log('shipping inspector RESTful API server started on: ' + port);
