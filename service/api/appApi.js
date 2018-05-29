
var countryDAO = require('../dao/countryDAO');
var portDAO = require('../dao/portDAO');
require('../constants');

exports.initApp = async (req, resp) => {
  var ports = await portDAO.load_ports();
  var countries = await countryDAO.load_countries();

  var inspectorTitleArr = [];
  Object.keys(inspectorTitle).forEach(function(key) {
  	inspectorTitleArr.push({id: key, name: inspectorTitle[key]});
  });

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

  var inspectorSkillsArr = [];
  Object.keys(inspectorSkills).forEach(function(key) {
  	inspectorSkillsArr.push({id: key, name: inspectorSkills[key]});
  });

  /*var regionArr = [];
  Object.keys(region).forEach(function(key) {
  	regionArr.push({id: key, name: region[key]});
  });*/

  var inspectorLevelArr = [];
  Object.keys(inspectorLevel).forEach(function(key) {
  	inspectorLevelArr.push({id: key, name: inspectorLevel[key]});
  });

  var inspectorCompanyArr = [];
  Object.keys(inspectorCompany).forEach(function(key) {
  	inspectorCompanyArr.push({id: key, name: inspectorCompany[key]});
  });

  resp.json({ status: {success: true}, config : { ports: ports, countries: countries, inspectionTypes: inspectionTypesArr,
				vesselTypes: vesselTypesArr, inspectorPositions : positionsArr, inspectorQualifications: inspectorQualificationsArr,
				regionCodes: regionCodesArr, inspectorTitles : inspectorTitleArr, inspectorSkills : inspectorSkillsArr,
        inspectorLevel : inspectorLevelArr, inspectorCompany : inspectorCompanyArr}});
}
