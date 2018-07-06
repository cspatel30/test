
var proxy = require('express-http-proxy');
var url = require('url');
var path = require("path");

var validateUserSession = require('../middleware/authhandler');
var validateAdminSession = require('../middleware/adminauthhandler');
var asyncMiddleware = require('../middleware/asyncmiddleware');
var authApi = require('../api/authApi');
var userApi = require('../api/userApi');
var appApi = require('../api/appApi');
var awsApi = require('../api/awsApi');
var enquiryApi = require('../api/enquiryApi');
var orderApi = require('../api/orderApi');
var feedbackApi = require('../api/feedbackApi');

module.exports = function(app) {

  app.use(['/api/my/*'], asyncMiddleware(validateUserSession));
  app.use('/api/admin/*', asyncMiddleware(validateAdminSession));

  app.route('/api/auth/validate/token/').get(asyncMiddleware(authApi.validateToken));
  app.route('/api/account/setup/:token').put(asyncMiddleware(userApi.setupAccount));
  app.route('/api/verify/email/:token').put(asyncMiddleware(userApi.verifyEmail));
  app.route('/api/app/init/').get(asyncMiddleware(appApi.initApp));
  app.route('/api/aws/s3/sign/').post(awsApi.signUrl);
  app.route('/api/signup/credentials/').post(asyncMiddleware(userApi.signup));
  app.route('/api/auth/credentials/').post(asyncMiddleware(authApi.login));
  app.route('/api/auth/logout/').get(authApi.logout);
  app.route('/api/inspectors/:pageNo').get(userApi.getInspectors);
  app.route('/api/inspector/profile/:userId').get(asyncMiddleware(userApi.getInspectorPublicProfile));
  app.route('/api/user/forgotPassword/:emailId').get(asyncMiddleware(userApi.forgotPassword));

  app.route('/api/enquiry/').post(asyncMiddleware(enquiryApi.submitEnquiry));

  //logged in user apis
  app.route('/api/my/profile/').get(asyncMiddleware(userApi.getInspectorProfile));
  app.route('/api/my/profile/').put(asyncMiddleware(userApi.updateProfile));
  app.route('/api/my/deleteEducation/:id').delete(asyncMiddleware(userApi.deleteEducation));
  app.route('/api/my/deleteEmployment/:id').delete(asyncMiddleware(userApi.deleteEmployment));

  app.route('/api/my/enquiries/').get(asyncMiddleware(enquiryApi.getUserEnquiries));
  app.route('/api/my/enquiry/:id').put(asyncMiddleware(enquiryApi.updateCustomerEnquiry));
  app.route('/api/my/enquirymapping/:enquiryId').put(asyncMiddleware(enquiryApi.updateEnquiryMapping));

  app.route('/api/my/order').post(asyncMiddleware(orderApi.create));
  app.route('/api/my/orders').get(asyncMiddleware(orderApi.getUserOrders));
  app.route('/api/cancelOrder/:id').post(asyncMiddleware(orderApi.cancelOrder));

  app.route('/api/my/feedback').post(asyncMiddleware(feedbackApi.addFeedback));
  app.route('/api/my/updateFeedback').post(asyncMiddleware(feedbackApi.updateFeedback));
  app.route('/api/my/feedback/:orderId').get(asyncMiddleware(feedbackApi.getFeedback));
  //admin related actions apis

  app.route('/api/admin/enquiry/:enquiryId').put(asyncMiddleware(enquiryApi.updateEnquiry));
  app.route('/api/admin/enquiry/:enquiryId/inspectors/').get(asyncMiddleware(enquiryApi.searchInspectorsForEnquiry));
  app.route('/api/admin/enquiries/').get(asyncMiddleware(enquiryApi.getAdminEnquiries));
  app.route('/api/admin/enquiry/:enquiryId/inspectors/').put(asyncMiddleware(enquiryApi.assignInspectors));

  app.route('/api/admin/orders/').get(asyncMiddleware(orderApi.getAdminOrders));

  app.route('/api/contactus/email/').post(asyncMiddleware(awsApi.sendContactUsEmail));

  app.use(function (err, req, resp, next) {
    console.error("Error from application - ", err.stack);
    resp.json({status: {success: false, message: err.message}});
  });

  app.get('/admin/home/', function(req, resp) {
    resp.redirect('/admin/');
  });

  app.get(['/', '/admin', '/admin/*', '/inspectors/', '/inspector/profile/*', '/news', '/about', '/contact',
            '/login', '/register','/newprofile','/quotation','/orders','/enquries','/inspectordashboard', '/terms', '/policy', '/my/*', '/enquiry/*', '/reports', '/verify/email/*', '/setup/account/*'],
    function (req, resp) {
      console.log("respond with index html");
      resp.sendFile(path.join(__dirname, "../../client/", "index.html"));
  });

};
