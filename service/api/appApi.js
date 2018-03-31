
var countryDAO = require('../dao/countryDAO');
var portDAO = require('../dao/portDAO');
require('../constants');

exports.initApp = async (req, resp) => {
  var ports = await portDAO.load_ports();
  var countries = await countryDAO.load_countries();

  var positionsArr = [];
  Object.keys(inspectorPositions).forEach(function(key) {
  	positionsArr.push({id: key, name: inspectorPositions[key]});
  });

  var vesselTypesArr = [];
  Object.keys(vesselTypes).forEach(function(key) {
  	vesselTypesArr.push({id: key, name: vesselTypes[key]});
  });

  var inspectionTypesArr = [];
  Object.keys(inspectionTypes).forEach(function(key) {
  	inspectionTypesArr.push({id: key, name: inspectionTypes[key]});
  });

  var inspectorQualificationsArr = [];
  Object.keys(inspectorQualifications).forEach(function(key) {
  	inspectorQualificationsArr.push({id: key, name: inspectorQualifications[key]});
  });

  var regionCodesArr = [];
  Object.keys(regionCodes).forEach(function(key) {
  	regionCodesArr.push({id: key, name: regionCodes[key]});
  });

  resp.json({ status: {success: true}, config : { ports: ports, countries: countries, inspectionTypes: inspectionTypesArr, 
				vesselTypes: vesselTypesArr, inspectorPositions : positionsArr, inspectorQualifications: inspectorQualificationsArr,
				regionCodes: regionCodesArr}}); 
}