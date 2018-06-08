require('../constants');
var userDAO = require('../dao/userDAO');
var awsApi = require('./awsApi');
var enquiryDAO = require('../dao/enquiryDAO');
var portDAO = require('../dao/portDAO');
var encryptionUtil = require('../util/encryptionutil.js');

exports.submitEnquiry = async (req, resp) => {
  // logged in user will have this cookie
  var newUserAccount = false;
  if(req.cookies['si.at']){
    var userId = encryptionUtil.decryptToken(req.cookies['si.at']);
    //if user is logged in, validate session userid with request userId
    if(userId && req.body.userId != userId) {
      resp.json({status: {success: false, message: "You are trying do un-authorized operation"}});
    }

    if(userId) {
      var rows = await userDAO.fetchUserProfile(userId);
      if(rows && rows.length > 0) {
        userProfile = rows[0];
      } else {
        throw new Error("Invalid user");
      }
    } else {
      throw new Error("Invalid user");
    }

  } else {
    newUserAccount = true;
    if(!req.body.email || req.body.email.trim() == "") {
      throw new Error("Email is mandatory for non logged in user");
    }

    if(!req.body.company || req.body.company.trim() == "") {
      throw new Error("Company is mandatory for non logged in user");
    }

    var rows = await userDAO.find_user_by_email(req.body.email);
    if(rows && rows.length > 0) {
      if(rows[0]['type'] == 'customer') {
        userProfile = rows[0];
        newUserAccount = false;
      } else 
        throw new Error("User already exists with type - "+ rows[0]['type']);
    } else {
      var signupResult = await userDAO.signup({name: "", email: req.body.email, password: '', type: 'customer', company: req.body.company});
      userProfile = {id: signupResult.insertId, name: req.body.email, email: req.body.email, company: req.body.company};

      var verifyEmailRequestId = encryptionUtil.getJWT({ userId: userProfile.id, email: userProfile.email}, '7d');
      awsApi.sendEmail('dummySignup.jade', 
        {to: userProfile.email, subject: 'Welcome to ShipInspector', 
        name: userProfile.email, requestToken: verifyEmailRequestId, server: appConfig.serverHost});

    }
  }  

  if(userProfile && userProfile.id > 0) {
    var payload = req.body;
    payload['email'] = userProfile.email;
    payload['company'] = userProfile.company;
    payload['userId'] = userProfile.id;

    var insertResult = await enquiryDAO.create_enquiry(payload);
    
    var emailSubject = 'Your ShipInspector Enquiry Confirmation ('+ insertResult.insertId +')';
    var enquiryRows = await enquiryDAO.find_by_id(insertResult.insertId);
    var enquiries = await enquiryDAO.transform_enquiry(enquiryRows);
        
    awsApi.sendEmail('customer-enquiry-confirmation.jade', {subject: emailSubject, to: userProfile.email, enquiry: enquiries[0], 
                user: userProfile, server: appConfig.serverHost});

    resp.json({ status: {success: true}, enquiries: [{id: insertResult.insertId}], newUserAccount: newUserAccount });

  } else {
    throw new Error("Unable to create / find user account for your details. Please try again later");
  }

}

exports.getAdminEnquiries = async (req, resp) => {
  var rows = await enquiryDAO.fetch_admin_enquiries();
  var enquiries = await enquiryDAO.transform_enquiry(rows);
  if(enquiries && enquiries.length > 0) {
    var enquiryIds = [];
    enquiries.map((row) => { enquiryIds.push(row.id)});
    var enquiryInspectorMappings = await enquiryDAO.fetch_enquiry_inspectors(enquiryIds);
    var enquiryIdToInspectorsMap = {};
    enquiryInspectorMappings.map( (mapping) => {
      var mappings = enquiryIdToInspectorsMap[mapping.enquiry_id] ? enquiryIdToInspectorsMap[mapping.enquiry_id] : [];
      mappings.push(mapping);
      enquiryIdToInspectorsMap[mapping.enquiry_id] = mappings;
    });

    enquiries.map((enquiry) => { enquiry['inspectors'] = enquiryIdToInspectorsMap[enquiry.id] });
  }

  resp.json({ status: {success: true}, enquiries: enquiries });
}

exports.getUserEnquiries = async (req, resp) => {
  console.log("Fetch Enqiries for user = ", resp.locals.userProfile);
  var enquiries = null;
  if(resp.locals.userProfile.type == 'customer') {
    var rows = await enquiryDAO.fetch_customer_enquiries(resp.locals.userProfile.id);
    enquiries = await enquiryDAO.transform_enquiry(rows);

    if(enquiries && enquiries.length > 0) {
      var enquiryIds = [];
      enquiries.map((row) => { enquiryIds.push(row.id)});
      var enquiryInspectorMappings = await userDAO.fetch_customer_enquiry_inspectors(enquiryIds);
      var enquiryIdToInspectorsMap = {};
      for(var i=0; i< enquiryInspectorMappings.length; i++) {
        var mapping = enquiryInspectorMappings[i];
        var mappings = enquiryIdToInspectorsMap[mapping.enquiry_id] ? enquiryIdToInspectorsMap[mapping.enquiry_id] : [];
        
        var transformedInspectorData = await userDAO.transformInspectorProfile([mapping]);
        transformedInspectorData[0]['enquiry_id'] = mapping.enquiry_id;
        mappings.push(transformedInspectorData[0]);
        
        enquiryIdToInspectorsMap[mapping.enquiry_id] = mappings;
      }
      console.log(enquiryInspectorMappings.length);
      enquiries.map((enquiry) => { enquiry['inspectors'] = enquiryIdToInspectorsMap[enquiry.id] });
      console.log(enquiries);
    }
  } else {
    var rows = await enquiryDAO.fetch_inspector_enquiries(resp.locals.userProfile.id);
    enquiries = await enquiryDAO.transform_enquiry(rows);
  }

  resp.json({ status: {success: true}, enquiries: enquiries });
}

exports.updateCustomerEnquiry =  async(req, resp) => {
  var enquiryId = parseInt(req.params.id);
  console.log("Update Enqiry for id = " + enquiryId + " with payload " + req.body);
  
  var result = await enquiryDAO.update_enquiry_status(enquiryId, 'CANCELLED');
  var enquiries = await enquiryDAO.fetch_customer_enquiries(resp.locals.userProfile.id);
  resp.json({ status: {success: true}, enquiries: enquiries });

}

exports.updateEnquiry =  async(req, resp) => {
  var enquiryId = parseInt(req.params.enquiryId);
  console.log("Update Quote for enquiry = ", enquiryId);
  var success = await enquiryDAO.update_enquiry_quote(enquiryId, req.body);
  resp.json({ status: {success: true}, enquiry: {id: enquiryId, customerQuote: req.body.customerQuote, inspectorQuote: req.body.inspectorQuote} });
  
}

exports.searchInspectorsForEnquiry = async (req, resp) => {
  var enquiryId = parseInt(req.params.enquiryId);
  console.log("Search inspectors for enquiry = ", enquiryId);
  var enquiries = await enquiryDAO.find_by_id(enquiryId);
  if(enquiries) {
    enquiries[0]['inspectors'] = await enquiryDAO.fetch_enquiry_inspectors([enquiries[0].id]);
    var ports = await portDAO.find_by_id(enquiries[0].port_id);
    var inspectorRows = await userDAO.search_inspectors(enquiries[0].inspection_type, ports[0].region_code);
    var inspectors =  await userDAO.transformInspectorProfile(inspectorRows);
    
    resp.json({ status: {success: true}, enquiry: enquiries[0], inspectors: inspectors});
  } else {
    throw new Error("Invalid enquiry id");
  }
}

exports.assignInspectors = async (req, resp) => {
  var enquiryId = req.params.enquiryId;
  console.log("Assign Inspectors for enquiry = ", enquiryId, req.body);
  var result1 = await enquiryDAO.assign_inspectors_for_enquiry(enquiryId, req.body);
  var result2 = await enquiryDAO.update_enquiry_status(enquiryId, 'SENT_TO_INSPECTORS');
  console.log("Assign inspectors result = ", result1, result2);

  resp.json({ status: {success: true}});
}

exports.updateEnquiryMapping = async (req, resp) => {
  var enquiryId = req.params.enquiryId;
  var inspectorUserId = resp.locals.userProfile.id;
  console.log("Update Status for enquiry mapping ", enquiryId, inspectorUserId);

  var result = await enquiryDAO.update_enquiry_mapping_status(enquiryId, inspectorUserId, req.body);
  
  var rows = await enquiryDAO.fetch_inspector_enquiries(inspectorUserId);
  var enquiries = await enquiryDAO.transform_enquiry(rows);
  
  resp.json({ status: {success: true}, enquiries: enquiries });
}
