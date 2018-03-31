
var userDAO = require('../dao/userDAO');
var encryptionUtil = require('../util/encryptionutil.js');

module.exports = async (req,res, next) => {

  console.log("Validate user with cookie ", req.cookies);
  if(req.cookies && req.cookies['si.at']) {
    try{
      var userId = encryptionUtil.decryptToken(req.cookies['si.at']);
      console.log("User Profile for token - " + userId);
      if(!userId) {
      	console.log("Token is invalid : No user found for token");		
		    res.sendStatus(401);
		    res.end();
      } else {
        var userDTOs = await userDAO.fetchUserProfile(userId);
        var transformedUsers = await userDAO.transformUserProfile(userDTOs);
        var userProfile = transformedUsers[0];
        if(userProfile && (userProfile.type == 'customer' || userProfile.type == 'inspector') ){
          res.locals.userProfile = userProfile;
          next();
        } else  {
          res.sendStatus(403);
          res.end();
        }
      }
    } catch( error) {
      console.log("Token is invalid : ", error);		
	    res.sendStatus(401);
	    res.end();
    }
  } else {
    console.log("Token is invalid : No token found for user in cookies");		
	  res.sendStatus(401);
	  res.end();
  }

}