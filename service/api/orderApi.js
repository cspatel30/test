require('../constants');
var orderDAO = require('../dao/orderDAO');
var enquiryDAO = require('../dao/enquiryDAO');
var awsApi = require('./awsApi');

exports.create = async (req, resp) => {

  console.log("Convert enquiry for user to an order = ", resp.locals.userProfile, req.body.enquiryId);
  var enquiries = null;
  if(resp.locals.userProfile.type == 'customer') {

  	var userId = resp.locals.userProfile.id;

  	var enquiryId = req.body.enquiryId;
  	var inspectorId = req.body.inspectorId;

  	var enquiryDTOs = await enquiryDAO.find_by_id(enquiryId);
  	if(enquiryDTOs && enquiryDTOs.length > 0) {
  		var enquiry = enquiryDTOs[0];

  		var order = {user_id: userId, email: resp.locals.userProfile.email, enquiry_id: enquiryId, inspection_type: enquiry.inspection_type,
  					vessel_name: enquiry.vessel_name, imo_number: enquiry.imo_number, port_id: enquiry.port_id, vessel_type: enquiry.vessel_type,
  					user_quote_amount: enquiry.customer_quote_amount, start_time: enquiry.start_time, end_time: enquiry.end_time,
  					inspector_id: inspectorId, inspector_quote_amount: enquiry.inspector_quote_amount, status: 'CREATED' };

  		var result = await orderDAO.create(order);
  		if(result && result.insertId) {
  			console.log("Created order = ", result.insertId);

  			await enquiryDAO.update_enquiry_status(enquiryId, 'ORDER_CONFIRMED');
  			var emailSubject = 'Your ShipInspector Order Confirmation ('+ result.insertId +')';
  			var rows = await orderDAO.find_by_id(result.insertId);
  			var orders = await orderDAO.transform_order(rows);

  			awsApi.sendEmail('customer-order-confirmation.jade', {subject: emailSubject, to: order.email, order: orders[0],
                user: resp.locals.userProfile, server: appConfig.serverHost});
  			resp.json({ status: {success: true}, order: orders[0]});
  		} else {
  			throw new Error("Failed to create order");
  		}

  	} else {
  		throw new Error("Cannot create order without an enquiry");
  	}

  } else {
  	throw new Error("You are not authorized to place order");
  }

}

exports.getAdminOrders = async (req, resp) => {
  var rows = await orderDAO.fetch_admin_orders(req.body.pageNo, req.body.pageSize);
  var orders = await orderDAO.transform_order(rows);
  resp.json({ status: {success: true}, orders: orders });
}

exports.getUserOrders = async (req, resp) => {
  console.log("Fetch Orders for user = ", resp.locals.userProfile);
  var orders = null;
  if(resp.locals.userProfile.type == 'customer') {
    var rows = await orderDAO.fetch_customer_orders(resp.locals.userProfile.id);
  	orders = await orderDAO.transform_order(rows);
  } else {
    var rows = await orderDAO.fetch_inspector_orders(resp.locals.userProfile.id);
    orders = await orderDAO.transform_order(rows);
  }

  resp.json({ status: {success: true}, orders: orders });
}
