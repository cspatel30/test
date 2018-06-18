var db = require('../mysql/db');
require('../constants');

function createFeedback(payload) {
  var overall_rating = getOverallRating(payload);
  var values = [parseInt(payload.orderId), parseInt(payload.inspectorId), parseInt(payload.userId),
    parseInt(payload.availability), parseInt(payload.reportQuality), parseInt(payload.skillAndExp),
                parseInt(payload.deadline), payload.comment, overall_rating];
  //console.log("Create feedback - " + getAverageRating(parseInt(payload.inspectorId), overall_rating));
  return db.mysql_insert_query("insert into feedback (order_id, inspector_id, user_id, availability, report_quality, skill_experience, deadline, comment,overall_rating) values ? ", [values]);
}

function getOverallRating(payload) {
  var availability = parseInt(payload.availability);
  var reportQuality = parseInt(payload.reportQuality);
  var skillAndExp = parseInt(payload.skillAndExp);
  var deadline = parseInt(payload.deadline);
  return (availability + reportQuality + skillAndExp + deadline)/4;
}

function getRatings(inspector_id) {
  return db.mysql_query("select sum(overall_rating) as total_ratings, count(1) as rows from feedback where inspector_id = " + inspector_id);
  return new Promise(function(resolve, reject) { resolve(true) });
}

function updateInspectorRating(id, rating) {
  var values1 = [rating, id];
  db.mysql_update_query('UPDATE inspector_profile SET rating = ? where id = ?', values1);
  return new Promise(function(resolve, reject) { resolve(true) });
}

function getFeedbackByOrder(order_id) {
  return db.mysql_query("select fb.*, cs.id, cs.inspection_type, cs.port_id, cs.start_time, cs.end_time, cs.vessel_name, cs.vessel_type,cs.imo_number from feedback fb, customer_order cs where fb.order_id = cs.id and cs.id = " + order_id);
  return new Promise(function(resolve, reject) { resolve(true) });
}

function updateFeedback(payload) {
  var overall_rating = getOverallRating(payload);
  values = [parseInt(payload.availability), parseInt(payload.reportQuality), parseInt(payload.skillAndExp),
                parseInt(payload.deadline), payload.comment, overall_rating, payload.feedbackId];
  db.mysql_update_query('UPDATE feedback SET availability = ?, SET report_quality = ?, skill_experience = ?, deadline = ?, comment = ?, overall_rating = ? where id = ?', values1);
  return new Promise(function(resolve, reject) { resolve(true) });
}

function transformFeedback(feedbackDTOs) {
  var feedbacks = [];
  if(feedbackDTOs && feedbackDTOs.length > 0) {
    for(var i= 0 ; i < feedbackDTOs.length ; i++) {
      feedbacks.push({id: feedbackDTOs[i]['id'], comment: feedbackDTOs[i]['comment'], inspectorId: feedbackDTOs[i]['inspector_id'], orderId: feedbackDTOs[i]['order_id'],
                    overallRating: feedbackDTOs[i]['overall_rating'], userId: feedbackDTOs[i]['user_id'], availability: feedbackDTOs[i]['availability'],
                    'reportQuality': feedbackDTOs[i]['report_quality'], 'skillAndExp': feedbackDTOs[i]['skill_experience'], 'startTime':feedbackDTOs[i]['start_time'],
                    'end_time':feedbackDTOs[i]['end_time'], 'vesselName':feedbackDTOs[i]['vessel_name'], 'vesselType':feedbackDTOs[i]['vessel_type'],
                    'end_time':feedbackDTOs[i]['imo_number'], 'deadline':feedbackDTOs[i]['deadline'],
                    'inspectionType':feedbackDTOs[i]['inspection_type'], 'portId':feedbackDTOs[i]['port_id']});
    }
  }
  return feedbacks;
}

module.exports = {
 createFeedback : createFeedback,
 getRatings : getRatings,
 updateInspectorRating : updateInspectorRating,
 getFeedbackByOrder : getFeedbackByOrder,
 transformFeedback : transformFeedback,
 updateFeedback : updateFeedback
}
