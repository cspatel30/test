
var db = require('../mysql/db');
var userDAO = require('../dao/userDAO');
var encryptionUtil = require('../util/encryptionutil.js');

exports.login = async (req, resp) => {
  console.log("Login user with req ", req.body);
  
  var rows = await userDAO.login(req.body);
  if(rows && rows.length > 0) {
    if(rows[0]['password'] == req.body.password) {
      if(rows[0]['status'] == 'ACTIVE') {
        var profiles = await userDAO.transformUserProfile(rows);
        var userProfile = profiles[0];
        var headerEncoded = encryptionUtil.encryptToken(userProfile);
        resp.json({ status: {success: true}, token: headerEncoded, userProfile: userProfile });
      } else {
        throw new Error("Account inactive! Please check signup email and verify your email first!");  
      }
    } else {
      throw new Error("Invalid Credentials");
    }
  } else {
    throw new Error("No User Account with your email");
  }
}

exports.validateToken = async (req, resp) => {
  if(req.cookies && req.cookies['si.at']) {
      var token = req.cookies['si.at'];
      var userId =  encryptionUtil.decryptToken(token);
      if(userId && userId > 0 ) {
        var rows = await userDAO.fetchUserProfile(userId);
        var profiles = await userDAO.transformUserProfile(rows);
        resp.json({ status: {success: true}, userToken: token, userProfile: profiles[0]});
      } else {
        resp.json({ status: {success: false}});
      }
  }
  else
    resp.json({ status: {success: false}});
}

exports.logout = function (req, resp) {
  console.log("Logout user with token ", req.cookies);
  resp.clearCookie('si.at'); 
  resp.json({status: {success: true}});
}