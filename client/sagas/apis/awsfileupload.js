import axios from 'axios';
import { call, put, select } from 'redux-saga/effects';

const publicApiInstance = axios.create({timeout: 10000, headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Basic YTpi"}});
publicApiInstance.interceptors.response.use(handleResponse);

function handleResponse(response) {
	console.log("Api response : ", response);
	if(response.data && response.data.status.success) {
	  return response.data;
	} else {
		throw new Error(response.data.status.message);
	}
}

const awsApiInstance = axios.create({timeout: 30000});
awsApiInstance.interceptors.response.use(handleAWSResponse);

function handleAWSResponse(response) {
	console.log("AWS signed url based Api response : ", response);
	if(response.status == 200) {
	  return response.data;
	} else {
		throw new Error(response);
	}
}

function getAWSSignedUrl(payload) {
	return publicApiInstance.post('/api/aws/s3/sign/',
			payload,
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function putObjectToS3(signedUrl, file, req) {
	console.log("Put object to url : ", signedUrl, file);
	var options = {headers: {"Content-Type": file.type, 'x-amz-acl': req.acl}};
	return awsApiInstance.put(signedUrl, file, options);
}

const s3FolderToInspectorDocPropertyMapping = {
	'profileimages': 'profilePic',
	'inspectordocs/passport' : 'passportDoc',
	'inspectordocs/qualification': 'qualificationDoc',
	'inspectordocs/seamanbook': 'seamanBookDoc',
	'inspectordocs/shoreservicecert': 'shoreServiceCert',
	'inspectordocs/medicalfitnesscert': 'medicalFitnessDoc',
	'inspectordocs/medicalinsurance': 'medicalInsuranceDoc',
	'inspectordocs/profindemnity': 'profIndemnityCert',
	'inspectordocs/identityproof': 'identityProofDoc',
	'inspectordocs/cv': 'cvDoc'
};

function getReverseMapping() {
	var reverseMapping = {};
	Object.keys(s3FolderToInspectorDocPropertyMapping).map((key) => {
		reverseMapping[s3FolderToInspectorDocPropertyMapping[key]] = key;
	});
	return reverseMapping;
}

exports.uploadInspectorDocument = function* (request) {
	var acl = 'private';
	
	switch(request.folderName) {
	  case 'profileimages': 
		updatePayload = {profilePic: request.fileName};
		acl = 'public-read';
		break;
	}

	console.log(request.folderName);
 	var propsKey = s3FolderToInspectorDocPropertyMapping[request.folderName];
 	console.log(propsKey);
	var updatePayload = {};
	updatePayload[propsKey] = request.fileName;

	var req = {method: 'putObject', bucketName: request.bucketName, folderName: request.folderName, 
				fileName: request.fileName, fileType: request.file.type,
			    acl: acl};

	var apiResponse = yield getAWSSignedUrl(req);

	var data = yield putObjectToS3(apiResponse.signedUrl, request.file, req);

	return updatePayload;
}

exports.downloadInspectorDocument = function* (payload) {
	var reverseMapping = getReverseMapping();
	var req = {method: 'getObject', bucketName: 'sinotechmarineassets', folderName: reverseMapping[payload.docType], 
				fileName: payload.fileName};

	var apiResponse = yield getAWSSignedUrl(req);
	return  apiResponse.signedUrl;

}