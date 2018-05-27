
var db = require('../mysql/db');
var portDAO = require('./portDAO');
var userDAO = require('./userDAO');
var feedbackDAO = require('./feedbackDAO');
require('../constants');
var moment = require('moment');

const stringFields = ['email', 'inspection_type', 'vessel_name', 'imo_number', 'vessel_type', 'payment_status', 'report_doc_url', 'status'];
const numberFields = ['user_id', 'inspector_id', 'port_id', 'enquiry_id'];
const dateFields = ['created_on', 'start_time', 'end_time'];
const floatFields = ['user_quote_amount', 'inspector_quote_amount'];

function create(payload) {

  payload['status'] = 'CREATED';
  payload['created_on'] = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")

  console.log("Create order ", payload);

  var keys = [];
  var values = [];
  Object.keys(payload).map((key) => {
    if(payload[key] && payload[key] !== "") {
      keys.push(key);
      if(stringFields.includes(key)) {
        values.push(payload[key].trim());
      } else  if(numberFields.includes(key)) {
        values.push(parseInt(payload[key]));
      } else if (dateFields.includes(key)) {
        values.push(moment(payload[key]).format("YYYY-MM-DD"));
      } else if (floatFields.includes(key)) {
        values.push(parseFloat(payload[key]));
      }
    }
  });

  return db.mysql_insert_query("insert into customer_order ("+keys.join(", ")+") values ? ", [values]);
}

function update(order_id, payload) {
  var setOps = [];

  Object.keys(payload).map((key) => {
    if(payload[key] && payload[key] !== "") {
      if(numberFields.includes(key)) {
        setOps.push(key+" = "+ parseInt(payload[key]));
      } else if (dateFields.includes(key)) {
        setOps.push(key+" = '"+moment(payload[key]).format("YYYY-MM-DD HH:mm:ss")+"'");
      } else if (stringFields.includes(key)) {
        if(payload[key].trim() !== "")
          setOps.push(key+" = '"+payload[key]+"'");
      } else if (floatFields.includes(key)) {
        setOps.push(key+" = "+parseFloat(payload[key]));
      }
    }
  });

  if(setOps.length > 0) {
    var updateQuery = "UPDATE customer_order SET "+ setOps.join(",") +" WHERE id = "+ order_id;
    console.log("Run order update query = ", updateQuery);
    return db.mysql_update_query(updateQuery);
  }

}

function find_by_id(order_id) {
  var query = "select o.*, p.name as port_name, p.region_code as port_region_code, p.region_name as port_region_name, p.country_code as port_country_code, p.country_name as port_country_name "
                        + " from customer_order o, port p where o.port_id = p.id and o.id = " + order_id;
  console.log("fetch query = ", query);
  return db.mysql_query(query);
}

function fetch_customer_orders(user_id) {
  return db.mysql_query("select o.*, p.name as port_name, p.region_code as port_region_code, p.region_name as port_region_name, p.country_code as port_country_code, p.country_name as port_country_name "
                        + " from customer_order o, port p where o.port_id = p.id and o.user_id = " + user_id + " order by created_on desc");
}

function fetch_inspector_orders(inspector_id) {
  return db.mysql_query("select o.*, p.name as port_name, p.region_code as port_region_code, p.region_name as port_region_name, p.country_code as port_country_code, p.country_name as port_country_name "
                        + " from customer_order o, port p where o.port_id = p.id and o.inspector_id = " + inspector_id + " order by created_on desc");
}

function fetch_admin_orders(pageNo, pageSize) {
  /*return db.mysql_query("select o.*, p.name as port_name, p.region_code as port_region_code, p.region_name as port_region_name, p.country_code as port_country_code, p.country_name as port_country_name "
                        + " from customer_order o, port p where o.port_id = p.id order by created_on desc limit "+((pageNo-1)*pageSize)+", "+ pageSize);*/
                        return db.mysql_query("select o.*, p.name as port_name, p.region_code as port_region_code, p.region_name as port_region_name, p.country_code as port_country_code, p.country_name as port_country_name "
                                              + " from customer_order o, port p where o.port_id = p.id order by created_on desc");
}

async function transform_order(orderDTOs) {
  var orders = [];
  if(orderDTOs && orderDTOs.length > 0) {
    for(var i= 0 ; i < orderDTOs.length ; i++) {
      var order = {id: orderDTOs[i]['id'], inspectionTypeDisplayName: inspectionTypes[orderDTOs[i]['inspection_type']],
         email: orderDTOs[i]['email'], vesselName: orderDTOs[i]['vessel_name'], portId: orderDTOs[i]['port_id'],
         vesselTypeDisplayName: vesselTypes[orderDTOs[i]['vessel_type']], imo: orderDTOs[i]['imo_number'],
         startTime: new Date(orderDTOs[i]['start_time']).getTime(), endTime: new Date(orderDTOs[i]['end_time']).getTime(),
         status: orderDTOs[i]['status'],
         customerQuote: orderDTOs[i]['user_quote_amount'], inspectorQuote: orderDTOs[i]['inspector_quote_amount'],
         createdOn: orderDTOs[i]['created_on'], enquiryId: orderDTOs[i]['enquiry_id']
      };

      if(!orderDTOs[i]['port_name']) {
        var port = await portDAO.get_port_by_id(orderDTOs[i]['port_id']);
        order['portData'] = port;
      } else {
        order['portData'] = {id: orderDTOs[i]['port_id'],  name: orderDTOs[i]['port_name'], regionCode: orderDTOs[i]['port_region_code'],
                                regionName: orderDTOs[i]['port_region_name'], countryName: orderDTOs[i]['port_country_name'],
                                countryCode: orderDTOs[i]['port_country_code']};
      }

      var inspectors = await userDAO.fetchInspectorProfile(orderDTOs[i]['inspector_id']);
      if(inspectors && inspectors.length > 0) {
        order['inspector'] = inspectors[0];
        order['inspector']['positionDisplayName'] = inspectorPositions[order['inspector']['position']];
        order['inspector']['qualificationDisplayName'] = inspectorQualifications[order['inspector']['qualification']];

        order['startTimeFmt'] = moment(order['startTime']).format("YYYY-MM-DD");
        order['endTimeFmt'] = moment(order['endTime']).format("YYYY-MM-DD");

        var ratingDTO = await feedbackDAO.getFeedbackByOrder(orderDTOs[i]['id']);
        if(ratingDTO && ratingDTO.length > 0) {
            order['isFeedbackGiven'] = true;
            order['feedbackId'] = ratingDTO[0]['id'];
        } else {
          order['isFeedbackGiven'] = true;
        }

        orders.push(order);
      }
    }
  }
  return orders;
}

function cancelOrder(order_id) {
  return db.mysql_update_query('UPDATE customer_order SET status = ? WHERE id = ?', ['CANCELED', order_id]) ;
}

module.exports = {
  create: create,
  update: update,
  find_by_id: find_by_id,
  fetch_customer_orders: fetch_customer_orders,
  fetch_admin_orders: fetch_admin_orders,
  fetch_inspector_orders: fetch_inspector_orders,
  transform_order: transform_order,
  cancelOrder : cancelOrder
 }
