
var db = require('../mysql/db');
require('../constants');
var Promise = require('bluebird');

module.exports = {
 	get_country_by_code: get_country_by_code,
  load_countries: Promise.coroutine(load_countries)
}

function get_country_by_code(country_code) {
  
  var query = "select * from country where code = \'"+country_code+"\'";  
  
  return db.mysql_query(query)
    .then((rows) => {
      if(rows.length > 0) {
        return {code: rows[0]['code'], name: rows[0]['name'], fullName: rows[0]['full_name'], iso3: rows[0]['iso3'], number: rows[0]['number'], 
        		continentCode: rows[0]['continent_code'], continentName: regionCodes[rows[0]['continent_code']], phoneCode: rows[0]['phonecode']};
      } else {
        return null;
      }
    }).catch((error) => {
      console.log(error);
      throw error;
    });
 }

 function* load_countries() {
  
  var rows = yield db.mysql_query("select * from country");
  if(rows.length > 0) {
    var countries = [];
    rows.map((row) => {  
      countries.push({code: row['code'], name: row['name'], fullName: row['full_name'], iso3: row['iso3'], number: row['number'], 
        continentCode: row['continent_code'], continentName: regionCodes[row['continent_code']], phoneCode: row['phonecode']});
    });

    return countries;
  } else {
    return null;
  }
 }