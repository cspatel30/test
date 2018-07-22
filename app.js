const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 7100;

// gZip compression
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});
app.get('*.css', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

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
