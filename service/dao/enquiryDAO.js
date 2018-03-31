var db = require('../mysql/db');
var portDAO = require('./portDAO');
var userDAO = require('./userDAO');
require('../constants');
var moment = require('moment');

function create_enquiry(payload) {

  var values = [payload.email, parseInt(payload.userId), payload.inspectionType, payload.vesselName, payload.imo, 
                payload.vesselType, payload.portId, moment(payload.startTime).format("YYYY-MM-DD"), 
                moment(payload.endTime).format("YYYY-MM-DD"), 
                'CREATED', moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")];

  console.log("Create Enquiry - " + values);

  return db.mysql_insert_query("insert into enquiry (email, user_id, inspection_type, vessel_name, imo_number, vessel_type, port_id, start_time, end_time, status, created_on) values ? ", [values]);
}

function fetch_customer_enquiries(userId) {
  return db.mysql_query("select * from enquiry where user_id = "+userId + " and status not in ('CANCELLED', 'ORDER_CONFIRMED')");
}

function fetch_inspector_enquiries(inspectorUserId) {
  return db.mysql_query("select e.* from enquiry_inspector_mapping eim, enquiry e where e.id = eim.enquiry_id and e.status = 'SENT_TO_INSPECTORS' and eim.status = 'ASSIGNED' and eim.inspector_user_id = "+inspectorUserId);
}

function fetch_admin_enquiries() {
  return db.mysql_query("select * from enquiry where status in ('CREATED', 'SENT_TO_INSPECTORS')"); 
}

function fetch_enquiry_inspectors(enquiryIds) {
  var csvIds = enquiryIds.join(',');
  console.log("Fetch mappings for ids - ", csvIds);
  return db.mysql_query("select * from enquiry_inspector_mapping where enquiry_id in ("+csvIds+")"); 
}

function update_enquiry_status(enquiryId, status) {
  return db.mysql_update_query('UPDATE enquiry SET status = ? WHERE id = ?', [status, enquiryId]) ;
}

function update_enquiry_quote(enquiryId, payload) { 
  var values = [parseFloat(payload.customerQuote), parseFloat(payload.inspectorQuote), enquiryId];
  return db.mysql_update_query('UPDATE enquiry SET customer_quote_amount = ?, inspector_quote_amount = ? WHERE id = ?',  values);
}

function find_by_id(enquiryId, payload) { 
  return db.mysql_query("select * from enquiry where id = "+enquiryId); 
}

function update_enquiry_mapping_status(enquiryId, inspectorUserId, payload) {
  var values = [payload.status, enquiryId, inspectorUserId];
  return db.mysql_update_query('UPDATE enquiry_inspector_mapping SET status = ? where enquiry_id = ? and inspector_user_id = ?', values);
}

function assign_inspectors_for_enquiry(enquiryId, inspectorIds) {
  var records = [];
  inspectorIds.map((id) => { records.push( [enquiryId, id, 'ASSIGNED', moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")] ) });
  console.log("Insert rows into enquiry inspector mapping table");
  return db.mysql_insert_query("insert into enquiry_inspector_mapping (enquiry_id, inspector_user_id, status, created_on) values ? ", records);
}

async function transform_enquiry(enquiryDTOs) { 
  if(enquiryDTOs && enquiryDTOs.length > 0) {
      enquiries = [];
      for(var i=0; i< enquiryDTOs.length; i++) {
        var enquiry = {id: enquiryDTOs[i]['id'], inspectionTypeDisplayName: inspectionTypes[enquiryDTOs[i]['inspection_type']], 
         email: enquiryDTOs[i]['email'], vesselName: enquiryDTOs[i]['vessel_name'], portId: enquiryDTOs[i]['port_id'], 
         vesselTypeDisplayName: vesselTypes[enquiryDTOs[i]['vessel_type']], imo: enquiryDTOs[i]['imo_number'], 
         startTime: new Date(enquiryDTOs[i]['start_time']).getTime(), endTime: new Date(enquiryDTOs[i]['end_time']).getTime(), 
         status: enquiryDTOs[i]['status'],
         customerQuote: enquiryDTOs[i]['customer_quote_amount'], inspectorQuote: enquiryDTOs[i]['inspector_quote_amount'],
         createdOn: enquiryDTOs[i]['created_on']
        };

        if(!enquiryDTOs[i]['port_name']) {
          var port = await portDAO.get_port_by_id(enquiryDTOs[i]['port_id']);
          enquiry['portData'] = port;
        } else {
          enquiry['portData'] = {id: enquiryDTOs[i]['port_id'],  name: enquiryDTOs[i]['port_name'], regionCode: enquiryDTOs[i]['port_region_code'], 
                                  regionName: enquiryDTOs[i]['port_region_name'], countryName: enquiryDTOs[i]['port_country_name'], 
                                  countryCode: enquiryDTOs[i]['port_country_code']};
        }

        enquiry['startTimeFmt'] = moment(enquiry['startTime']).format("YYYY-MM-DD");
        enquiry['endTimeFmt'] = moment(enquiry['endTime']).format("YYYY-MM-DD");

        enquiries.push(enquiry);
      }  
      return enquiries;
  } else {
    return null;
  }
  
}

 module.exports = {
  create_enquiry: create_enquiry,
 	fetch_customer_enquiries: fetch_customer_enquiries,
  fetch_admin_enquiries: fetch_admin_enquiries,
  fetch_inspector_enquiries: fetch_inspector_enquiries,
  update_enquiry_status: update_enquiry_status,
  update_enquiry_quote: update_enquiry_quote,
  find_by_id: find_by_id,
  assign_inspectors_for_enquiry: assign_inspectors_for_enquiry,
  transform_enquiry: transform_enquiry,
  fetch_enquiry_inspectors: fetch_enquiry_inspectors,
  update_enquiry_mapping_status: update_enquiry_mapping_status
 }