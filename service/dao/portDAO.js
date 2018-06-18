var db = require('../mysql/db');

function find_by_id(port_id) {
  console.log("Find port by id = ", port_id);
  return db.mysql_query("select * from port where id = "+port_id);
}

function get_port_by_id(port_id) {
  
  return find_by_id(port_id)
    .then((rows) => {
      if(rows.length > 0) {
        return transform_data(rows)[0];
      } else {
        return null;
      }
    }).catch((error) => {
      console.log(error);
      throw error;
    });
}

function load_ports() {
	return db.mysql_query("Select * from port")
    .then((rows) => {
      if(rows.length > 0) {
        ports = [];
        for(var i=0; i< rows.length; i++) {
          ports.push({ id: [rows[i]['id']],  name: rows[i]['name'], regionCode: rows[i]['region_code'], regionName: rows[i]['region_name'],
            countryName: rows[i]['country_name'], countryCode: rows[i]['country_code']});
        }  
        return ports;
      } else {
        return null;
      }
    }).catch((error) => {
      console.log(error);
      throw error;
    });
}

function transform_data(rows) {
  if(rows.length > 0) {
    var output = [];
    for(var i = 0; i < rows.length; i++)
      output.push({ id: [rows[i]['id']],  name: rows[i]['name'], regionCode: rows[i]['region_code'], regionName: rows[i]['region_name'],
            countryName: rows[i]['country_name'], countryCode: rows[i]['country_code']});
    return output;
  } else {
    return null;
  }
}

module.exports = {
	load_ports: load_ports,
  get_port_by_id: get_port_by_id,
  transform_data: transform_data,
  find_by_id: find_by_id
}