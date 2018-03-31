require('../constants');
var userDAO = require('../dao/userDAO');
var awsApi = require('./awsApi');
var encryptionUtil = require('../util/encryptionutil.js');

exports.signup = async (req, resp) => {
  var result = await userDAO.signup(req.body);
  var userId = result.insertId;

  var responseProfile = {id: userId, name: req.body.name, email: req.body.email, status: 'CREATED', type: req.body.type, 
                        company: req.body.company, phone: req.body.phone, city: req.body.city, countryCode: req.body.countryCode};

  if(req.body.type == 'inspector') {
    await userDAO.signup_inspector(userId, req.body);
  }

  var userDTOs = await userDAO.fetchUserProfile(userId);
  var profiles = await userDAO.transformUserProfile(userDTOs);
  var userProfile = profiles[0];
  
  var verifyEmailRequestId = encryptionUtil.getJWT({ userId: userId, email: userProfile.email}, '7d');
  awsApi.sendEmail('signup.jade', 
      {to: userProfile.email, subject: 'Welcome to ShipInspector', 
      name: userProfile.name, requestToken: verifyEmailRequestId, server: appConfig.serverHost});

  resp.json({ status: {success: true}, userProfile: userProfile });
}

exports.verifyEmail = async (req, resp) => {
  console.log("Verify email for request id - ", req.params.token);  

  var data = await encryptionUtil.decryptJWT(req.params.token);

  if(data && data.userId && data.email) {
    console.log(data);
    var rows = await userDAO.fetchUserProfile(data.userId);
    if(rows[0]['email'] == data.email) {
      var result = await userDAO.update_user_profile(data.userId, {'status': 'ACTIVE'});
      resp.json({ status: {success: true}});
    }
    else
      resp.json({status: {success: false}, errorMsg: "Invalid Token"});  
  } else {
    resp.json({status: {success: false}, errorMsg: "Invalid Token"});
  }
}

exports.setupAccount = async (req, resp) => {
  console.log("Reset Password for request id - ", req.params.token);
  
  var data = await encryptionUtil.decryptJWT(req.params.token);

  if(data && data.userId && data.email) {
    console.log(data);
    var rows = await userDAO.fetchUserProfile(data.userId);
    if(rows[0]['email'] == data.email) {
      var payload = req.body;
      payload['status'] = 'ACTIVE';
      var result = await userDAO.update_user_profile(data.userId, payload);
      resp.json({ status: {success: true}});
    }
    else
      resp.json({status: {success: false}, errorMsg: "Invalid Token"});  
  } else {
    resp.json({status: {success: false}, errorMsg: "Invalid Token"});
  }
}

exports.findById = async (req, resp) => {
  console.log("Get user with id - ", req.params.userId);  
  var userDTOs = await userDAO.fetchUserProfile(req.params.userId);
  var profiles = await userDAO.transformUserProfile(userDTOs);
  resp.json({ status: {success: true}, userProfile: profiles[0] });
}

exports.getInspectorProfile = async (req, resp) => {
  console.log("Get inspector profile with account - ", resp.locals.userProfile.id);
  if(resp.locals.userProfile && resp.locals.userProfile.type !== 'inspector') {
    resp.json({status: {success: false, message: "You are not authorized to access this page"}});
    return;
  }

  var rows = await userDAO.fetchInspectorPublicProfile(resp.locals.userProfile.id);
  var profiles = await userDAO.transformInspectorProfile(rows);
  resp.json({ status: {success: true}, profile: profiles[0] });
  
}

exports.updateProfile = async (req, resp) => {
  console.log("Update inspector profile with account - ", resp.locals.userProfile.id);

  var newProfile = req.body;

  var result1 = await userDAO.update_inspector_profile(resp.locals.userProfile.id, newProfile); 
  var result2 = await userDAO.update_user_profile(resp.locals.userProfile.id, newProfile);

  var userDTOs = await userDAO.fetchUserProfile(resp.locals.userProfile.id);
  var profiles = await userDAO.transformUserProfile(userDTOs);

  var inspectorDTOs = await userDAO.fetchInspectorPublicProfile(resp.locals.userProfile.id);
  var inspectorProfiles = await userDAO.transformInspectorProfile(inspectorDTOs);

  resp.json({ status: {success: true}, userProfile : profiles[0] , inspectorProfile: inspectorProfiles[0] });
}

exports.getInspectorPublicProfile = async (req, resp) => {
  console.log("Fetch public profile for user - "+ req.params.userId);
  var rows = await userDAO.fetchInspectorPublicProfile(req.params.userId);
  var profiles = await userDAO.transformInspectorProfile(rows);
  resp.json({ status: {success: true}, profile: profiles[0] });
}

exports.getInspectors = async (req, resp) => {
  var rows = await userDAO.fetchInspectors(req.params.pageNo);
  var inspectors =  await userDAO.transformInspectorProfile(rows);
  resp.json({ status: {success: true}, inspectors: inspectors });

}