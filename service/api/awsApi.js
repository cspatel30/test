
var AWS = require('aws-sdk');
var UltraSES = require('ultrases');
require('../constants');
var jade = require('jade');

AWS.config.update({
    accessKeyId: appConfig.accessKeyId,
    secretAccessKey: appConfig.secretAccessKey
});

var ses = new AWS.SES({apiVersion: '2010-12-01', region: 'us-east-1'});
var mailer = new UltraSES({client: ses, defaults: { from: appConfig.defaultFrom }});

exports.signUrl = function (req, resp) {
    var s3 = new AWS.S3({region: 'ap-southeast-1'});

    var params = {
        Bucket: req.body.bucketName,
        Key: req.body.folderName+"/"+req.body.fileName,
        Expires: 600
    }
    if(req.body.method == 'putObject') {
        params['ContentType'] = req.body.fileType;
        params['ACL'] = req.body.acl;
    }

    console.log("Get signedUrl for params", params);

    s3.getSignedUrl(req.body.method, params, function(err, data) {
        if (err) {
            console.log(err);
            resp.json({ status: {success: false}, error: err});
        } else {
            resp.json({ status: {success: true}, signedUrl: data});
        }
    });
}

exports.sendEmail =  function (template_name, params) {
    
    var email = { to: params['to'], subject: params['subject'] };

    var options = { pretty: true };
    var fn = jade.compileFile(appConfig.emailTemplatesPath+template_name, options);
    var html = fn(params);

    return new Promise(function(resolve, reject) {
      mailer.sendHTML(email, html, function(err, data) {
            if(err) return reject(err);
            resolve(data.messageId);
          }
      );
    });
}

exports.sendContactUsEmail = async ( req, resp ) => {
    var email = { from: appConfig.defaultFrom, to: 'admin@shipinspectors.com', subject: 'New Customer Connect Request' };

    var options = { pretty: true };
    var fn = jade.compileFile(appConfig.emailTemplatesPath+'contactus.jade', options);
    var html = fn(req.body);

    var messageId = await new Promise(function(resolve, reject) {
      mailer.sendHTML(email, html, function(err, data) {
            if(err) return reject(err);
            resolve(data.messageId);
          }
      );
    });

    var cfn = jade.compileFile(appConfig.emailTemplatesPath+'customer-contactus.jade', options);
    var chtml = cfn(req.body);
    var cemail = { to: req.body.email, from: appConfig.defaultFrom, subject: 'Thank you for contacting us' };
    var message2Id = await new Promise(function(resolve, reject) {
      mailer.sendHTML(cemail, chtml, function(err, data) {
            if(err) return reject(err);
            resolve(data.messageId);
          }
      );
    });

    resp.json({status: {success: true}});
}