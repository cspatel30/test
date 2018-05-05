require('../constants');
var userDAO = require('../dao/userDAO');
var awsApi = require('./awsApi');
var feedbackDAO = require('../dao/feedbackDAO');
var encryptionUtil = require('../util/encryptionutil.js');

exports.addFeedback = async (req, resp) => {
  console.log("in feedback");
  var payload = req.body;
  payload['userId'] = '45';
  var insertResult = await feedbackDAO.createFeedback(payload);
  var ratingDTO = await feedbackDAO.getRatings(parseInt(payload.inspectorId));
  var avgRating = await getAverageRating(ratingDTO, getOverallRating(payload));
  var result = await feedbackDAO.updateInspectorRating(parseInt(payload.inspectorId),avgRating);
  resp.json({ status: {success: true}, message: "Feedback saved successfully." });
}

function getAverageRating(ratingDTO,overall_rating) {
  if(ratingDTO && ratingDTO.length > 0) {
      var totalRatings = ratingDTO[0]['total_ratings'];
      var rows = ratingDTO[0]['rows'];
      return avgRating = (totalRatings+overall_rating)/(rows+1)

  }
  return overall_rating;
}

function getOverallRating(payload) {
  var availability = parseInt(payload.availability);
  var reportQuality = parseInt(payload.reportQuality);
  var skillAndExp = parseInt(payload.skillAndExp);
  var deadline = parseInt(payload.deadline);
  return (availability + reportQuality + skillAndExp + deadline)/4;
}

exports.getFeedback = async (req, resp) => {
  var ratingDTO = await feedbackDAO.getFeedbackByOrder(req.params.orderId);
  var feedbacks = await feedbackDAO.transformFeedback(ratingDTO);
  resp.json({ status: {success: true}, feedback: feedbacks });
}
