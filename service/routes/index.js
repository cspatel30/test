
var proxy = require('express-http-proxy');
var url = require('url');
var path = require("path");

module.exports = function(app) {

  app.use(function (err, req, resp, next) {
    console.error("Error from application - ", err.stack);
    resp.json({status: {success: false, message: err.message}});
  });

  app.get(['/','/login','/newprofile','/inspectordashboard','/register'], 
    function (req, resp) {
      console.log("respond with index html");
      resp.sendFile(path.join(__dirname, "../../client/resources/static/", "index.html"));
  });

};