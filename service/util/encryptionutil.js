
var jwt = require('jsonwebtoken');

exports.decryptToken = function(authHeader) {
  console.log("Validate user with auth token ", authHeader);
    var token = authHeader.trim(" ");
    var decodedToken = new Buffer(token, 'base64').toString('ascii');
    var userId = parseInt(decodedToken.split("~")[1]);
    console.log("UserId from token = " + userId);
    return userId;
}

exports.encryptToken = function(userProfile) {
	return (new Buffer(userProfile.name+'~'+userProfile.id).toString('base64'));
}

exports.getJWT = function(data, expiry) {
	return jwt.sign(data, 'sinotech123##', { algorithm: 'HS256', expiresIn: expiry});
}

exports.decryptJWT = function (jwtToken) {
	return new Promise(function(resolve, reject) {
      jwt.verify(jwtToken, 'sinotech123##', function(err, data) {
            if(err) return reject(err);
            resolve(data);
          }
      );
    });
}