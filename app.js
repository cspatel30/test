const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/dist', express.static(path.join(process.cwd(), 'dist')));
app.use('/public', express.static(path.join(process.cwd(), 'public')));

app.get('/*', function (req, resp) {
  console.log("respond with index html");
  resp.sendFile(path.join(process.cwd(), 'public/index.html'));
});

app.listen(port);

console.log('shipping inspector RESTful API server started on: ' + port);
