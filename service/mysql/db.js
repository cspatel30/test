var mysql = require("mysql");
require('../constants');

var con = mysql.createConnection(mysqlConfig);

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});


exports.mysql_query = (query) => {
  return new Promise(function(resolve, reject) {
      con.query(query, function(err, rows){
            if(err) return reject(err);
            resolve(rows);
          }
      );
    }
  );
}

exports.mysql_update_query = (query, params) => {
  return new Promise(function(resolve, reject) {
      con.query(query, params, function(err, rows){
            if(err) return reject(err);
            resolve(rows);
          }
      );
    }
  );
}

exports.mysql_insert_query = (query, record) => {
  return new Promise(function(resolve, reject) {
      con.query(query, [record], function(err, rows){
            if(err)  { 
              if(err.code == 'ER_DUP_ENTRY') {
                var parts = err.message.split(" ");
                reject(new Error("Row already exists with key - " + parts[3]));
              }
              return reject(err) 
            };
            resolve(rows);
          }
      );
    }
  );
}