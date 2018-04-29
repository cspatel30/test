
import { uploadInspectorDocument, downloadInspectorDocument} from './awsfileupload';

import axios from 'axios';
import { call, put, select } from 'redux-saga/effects';

import {initAppSuccess, initAppFailure} from '../../actions/app';

import {sendContactUsEmailSuccess, sendContactUsEmailFailure} from '../../actions/contactus';

import { loginSuccess, loginFailure, forgotPasswordSuccess, forgotPasswordFailure, verifyTokenSuccess, verifyTokenFailure, 
		logoutSuccess, registerSuccess, registerFailure, setupAccountSuccess, setupAccountFailure,
		verifyEmailSuccess, verifyEmailFailure } from '../../actions/auth';

import { createEnquirySuccess, createEnquiryFailure, getCustomerEnquiriesSuccess, getCustomerEnquiriesFailure,
		cancelEnquirySuccess, cancelEnquiryFailure, updateEnquiryQuoteSuccess, updateEnquiryQuoteFailure,
		searchInspectorsForEnquirySuccess, searchInspectorsForEnquiryFailure,
		assignInspectorsForEnquirySuccess, assignInspectorsForEnquiryFailure, 
		acceptRejectEnquiryQuoteSuccess, acceptRejectEnquiryQuoteFailure} from '../../actions/enquiry';

import { actionInProgress, sessionExpired} from '../../actions/common';

import { getProfileSuccess, getProfileFailure, uploadDocumentSuccess, uploadDocumentFailure,
getInspectorsSuccess, getInspectorsFailure, getPublicProfileSuccess, getPublicProfileFailure,
downloadDocumentSuccess, downloadDocumentFailure, updateInspectorProfileSuccess, updateInspectorProfileFailure,
deleteEducationItemSuccess, deleteEducationItemFailure, deleteEmploymentItemSuccess, deleteEmploymentItemFailure} from '../../actions/inspector';

import {createOrderSuccess, createOrderFailure, getUserOrdersSuccess, getUserOrdersFailure} from '../../actions/order';


import Cookies from 'universal-cookie';
const cookies = new Cookies();

//export const getToken = state => state.userToken;

function handleResponse(response) {
	console.log("Api response : ", response);
	if(response.data && response.data.status.success) {
	  return response.data;
	} else {
		throw new Error(response.data.status.message);
	}
}

const publicApiInstance = axios.create({timeout: 10000, headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Basic YTpi"}});
publicApiInstance.interceptors.response.use(handleResponse);

const secureApiInstance = axios.create({timeout: 10000, headers: { "Content-Type": "application/json", "Accept": "application/json"}});
secureApiInstance.interceptors.response.use(handleResponse);

function registerApi(payload) {
  return publicApiInstance.post('/api/signup/credentials/', 
            payload,
            { timeout: 2000, headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Basic YTpi"} }
  );
}

function loginApi(payload) {
  return publicApiInstance.post('/api/auth/credentials/', 
            payload,
            { timeout: 2000, headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Basic YTpi"} }
  );
}
function forgoPasswordApi(email) {
	return publicApiInstance.get(`/api/user/forgotPassword/${email}`,
			  { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
	);
  }

function logoutApi() {
  return publicApiInstance.get('/api/auth/logout/',
            { timeout: 2000, headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function validateTokenApi() {
  return publicApiInstance.get('/api/auth/validate/token/',
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function initApplicationApi() {
  return publicApiInstance.get('/api/app/init/',
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function createEnquiryApi(payload) {	
  return publicApiInstance.post('/api/enquiry/', payload,
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function getCustomerEnquiriesApi(userType) {
  if(userType == 'admin')
  	return publicApiInstance.get('/api/admin/enquiries/',
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} });
  else
  	return publicApiInstance.get('/api/my/enquiries/',
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} });
}

function cancelCustomerEnquiryApi(enquiryId) {
  return publicApiInstance.put('/api/my/enquiry/'+enquiryId,
		{status: 'CANCELLED'},
        { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function acceptRejectEnquiryQuoteApi(enquiryId, accepted) {
  return publicApiInstance.put('/api/my/enquirymapping/'+enquiryId,
		{status: (accepted?'ACCEPTED':'REJECTED')},
        { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function getProfileApi() {
  return publicApiInstance.get('/api/my/profile/',
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function getInspectorPublicProfileApi(userId) {
  return publicApiInstance.get('/api/inspector/profile/'+userId,
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function getInspectorsApi(pageNo) {
  return publicApiInstance.get('/api/inspectors/'+pageNo,
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function updateEnquiryQuoteApi(payload) {
  return publicApiInstance.put('/api/admin/enquiry/'+ payload.enquiryId,
			payload.quoteDetails,
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function searchInspectorsForEnquiryApi(enquiryId) {
  return publicApiInstance.get('/api/admin/enquiry/'+ enquiryId +'/inspectors/',
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function assignInspectorsForEnquiryApi(payload) {
  return publicApiInstance.put('/api/admin/enquiry/'+payload.enquiryId+'/inspectors/',
			payload.inspectorIds,
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function updateInspectorProfileApi(payload) {
  return publicApiInstance.put('/api/my/profile/',
			payload,
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function deleteEducationItemApi(id) {
  return publicApiInstance.delete(`/api/my/deleteEducation/${id}`,
			{ headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function deleteEmploymentItemApi(id) {
  return publicApiInstance.delete(`/api/my/deleteEmployment/${id}`,
			  { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function sendContactUsEmailApi(payload) {
  return publicApiInstance.post('/api/contactus/email/',
			payload,
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function setupAccountApi(payload) {
  return publicApiInstance.put('/api/account/setup/'+payload.token,
			payload.form,
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function verifyEmailApi(payload) {
  return publicApiInstance.put('/api/verify/email/'+payload,
  			{},
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function createOrderApi(payload) {
	return publicApiInstance.post('/api/my/order/',
  			payload,
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  );
}

function getUserOrdersApi(userType) {
	if(userType == 'admin')
		return publicApiInstance.get('/api/admin/orders/',
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  		);
	else
		return publicApiInstance.get('/api/my/orders/',
            { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
  		);
}

function* makeApiCall(action, apiFn, apiSuccessCb, apiFailureCb) {
	try {
		console.log('...make api');
		switch(action.type) {
			case 'INIT_APP':
				var apiResponse = yield apiFn();
				yield put (apiSuccessCb(apiResponse.config));
				break;
			case 'REGISTER':
				var apiResponse = yield apiFn(action.payload);
				cookies.set("si.at", apiResponse.token, {path: "/", maxAge: 24*60*60});
				yield put (apiSuccessCb(apiResponse.token, apiResponse.userProfile));
				break;

			case 'LOGIN':
				var apiResponse = yield apiFn(action.payload);
				cookies.set("si.at", apiResponse.token, {path: "/", maxAge: 24*60*60});
				yield put (apiSuccessCb(apiResponse.token, apiResponse.userProfile));
				break;
			
			case 'FORGOT_PASSWORD':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb(apiResponse)); // write what you need at front end @success
				break;

			case 'LOGOUT':
				var apiResponse = yield apiFn();
				yield put (apiSuccessCb());
				break;				
			
			case 'VERIFY_TOKEN':
				var apiResponse = yield apiFn();
				yield put (apiSuccessCb(apiResponse.userToken, apiResponse.userProfile));
				break;

			case 'CREATE_ENQUIRY':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb(apiResponse.enquiries[0]));
				break;

			case 'GET_CUSTOMER_ENQUIRIES':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb(apiResponse.enquiries));
				break;

			case 'CANCEL_ENQUIRY':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb(apiResponse.enquiries));
				break;

			case 'GET_INSPECTOR_PROFILE':
				var apiResponse = yield apiFn();
				yield put (apiSuccessCb(apiResponse.profile));
				break;

			case 'UPLOAD_INSPECTOR_DOC':
				var updatePayload = yield uploadInspectorDocument(action.payload);
				
				var updateApiResponse = yield updateInspectorProfileApi(updatePayload);
				
				yield put (apiSuccessCb(updateApiResponse.userProfile, updateApiResponse.inspectorProfile));
				break;

			case 'DOWNLOAD_INSPECTOR_DOC':
				var downloadURL = yield downloadInspectorDocument(action.payload);
				yield put (apiSuccessCb(downloadURL));
				break;

			case 'GET_INSPECTORS':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb(action.payload, apiResponse.inspectors));
				break;
			case 'GET_INSPECTOR_PUBLIC_PROFILE':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb(apiResponse.profile));
				break;
			case 'UPDATE_ENQUIRY_QUOTE':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb(apiResponse.enquiry));
				break;
			case 'SEARCH_INPECTORS_ENQUIRY':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb({enquiry: apiResponse.enquiry, inspectors: apiResponse.inspectors}));
				break;
			case 'ASSIGN_INSPECTORS_FOR_ENQUIRY':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb());
				break;
			case 'ACCEPT_REJECT_ENQUIRY_QUOTE':
				var apiResponse = yield apiFn(action.payload.enquiryId, action.payload.accepted);
				yield put (apiSuccessCb(apiResponse.enquiries));
				break;
			case 'UPDATE_INSPECTOR_PROFILE':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb(apiResponse.userProfile, apiResponse.inspectorProfile));
				break;
			case 'DELETE_EDUCATION_ITEM':
				console.log('delete api call...');
				var apiResponse = yield apiFn(action.payload);
				console.log('.....delete response', apiResponse);
				yield put (apiSuccessCb(apiResponse));
				break;
			case 'DELETE_EMPLOYMENT_ITEM':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb(apiResponse));
				break;
			case 'CONTACT_US_EMAIL':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb());
				break;
			case 'SETUP_ACCOUNT':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb());
				break;
			case 'VERIFY_EMAIL':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb());
				break;
			case 'CREATE_ORDER':
				var apiResponse = yield apiFn(action.payload);
				yield put (apiSuccessCb(apiResponse.order));
				break;
			case 'GET_USER_ORDERS':
				var apiResponse = yield apiFn('user');
				yield put (apiSuccessCb(apiResponse.orders));
				break;
			case 'GET_ADMIN_ORDERS':
				var apiResponse = yield apiFn('admin');
				yield put (apiSuccessCb(apiResponse.orders));
				break;

		}
	} catch (error) {
		if(error.response && (error.response.status === 401 || error.response.status === 403)) {
			console.log("Api error : ", error.response.status);
			yield put(sessionExpired());
		} else {
			if(error.response)
				yield put(apiFailureCb({message: error.message}));
			else {
				console.log("Error = ", error.message);
				yield put(apiFailureCb(error.message));
			}
		}
	}
}

export default function* performAction(action) {
	yield put(actionInProgress());
	switch(action.type) {
		case 'INIT_APP':
			yield makeApiCall(action, initApplicationApi, initAppSuccess, initAppFailure);
			break;
		case 'REGISTER' :
			yield makeApiCall(action, registerApi, registerSuccess, registerFailure);
			break;
		case 'LOGIN' :
			yield makeApiCall(action, loginApi, loginSuccess, loginFailure);
			break;
		case 'FORGOT_PASSWORD' :
			yield makeApiCall(action, forgoPasswordApi, forgotPasswordSuccess, forgotPasswordFailure);
			break;
		case 'VERIFY_TOKEN' :
			yield makeApiCall(action, validateTokenApi, verifyTokenSuccess, verifyTokenFailure);
			break;
		case 'PAY' :
			yield makeApiCall(action, makePaymentApi, null, null);
			break;
		case 'LOGOUT' :
			yield makeApiCall(action, logoutApi, logoutSuccess, null);
			break;
		case 'CREATE_ENQUIRY':
			yield makeApiCall(action, createEnquiryApi, createEnquirySuccess, createEnquiryFailure)
			break;
		case 'GET_CUSTOMER_ENQUIRIES':
			yield makeApiCall(action, getCustomerEnquiriesApi, getCustomerEnquiriesSuccess, getCustomerEnquiriesFailure)
			break;
		case 'CANCEL_ENQUIRY':
			yield makeApiCall(action, cancelCustomerEnquiryApi, cancelEnquirySuccess, cancelEnquiryFailure)
			break;
		case 'GET_INSPECTOR_PROFILE':
			yield makeApiCall(action, getProfileApi, getProfileSuccess, getProfileFailure)
			break;
		case 'UPLOAD_INSPECTOR_DOC':
			yield makeApiCall(action, null, updateInspectorProfileSuccess, updateInspectorProfileFailure)
			break;
		case 'DOWNLOAD_INSPECTOR_DOC': 
			yield makeApiCall(action, null, downloadDocumentSuccess, downloadDocumentFailure);
			break;
		case 'GET_INSPECTORS':
			yield makeApiCall(action, getInspectorsApi, getInspectorsSuccess, getInspectorsFailure)
			break;
		case 'GET_INSPECTOR_PUBLIC_PROFILE':
			yield makeApiCall(action, getInspectorPublicProfileApi, getPublicProfileSuccess, getPublicProfileFailure)
			break;
		case 'UPDATE_ENQUIRY_QUOTE':
			yield makeApiCall(action, updateEnquiryQuoteApi, updateEnquiryQuoteSuccess, updateEnquiryQuoteFailure)
			break;
		case 'SEARCH_INPECTORS_ENQUIRY':
			yield makeApiCall(action, searchInspectorsForEnquiryApi, searchInspectorsForEnquirySuccess, searchInspectorsForEnquiryFailure)
			break;
		case 'ASSIGN_INSPECTORS_FOR_ENQUIRY':
			yield makeApiCall(action, assignInspectorsForEnquiryApi, assignInspectorsForEnquirySuccess, assignInspectorsForEnquiryFailure)
			break;
		case 'ACCEPT_REJECT_ENQUIRY_QUOTE':
			yield makeApiCall(action, acceptRejectEnquiryQuoteApi, acceptRejectEnquiryQuoteSuccess, acceptRejectEnquiryQuoteFailure)
			break;
		case 'UPDATE_INSPECTOR_PROFILE':
			yield makeApiCall(action, updateInspectorProfileApi, updateInspectorProfileSuccess, updateInspectorProfileFailure)
			break;
		case 'DELETE_EDUCATION_ITEM':
			yield makeApiCall(action, deleteEducationItemApi, deleteEducationItemSuccess, deleteEducationItemFailure)
			break;
		case 'DELETE_EMPLOYMENT_ITEM':
			yield makeApiCall(action, deleteEmploymentItemApi, deleteEmploymentItemSuccess, deleteEmploymentItemFailure)
			break;
		case 'CONTACT_US_EMAIL':
			yield makeApiCall(action, sendContactUsEmailApi, sendContactUsEmailSuccess, sendContactUsEmailFailure)
			break;
		case 'SETUP_ACCOUNT':
			yield makeApiCall(action, setupAccountApi, setupAccountSuccess, setupAccountFailure)
			break;
		case 'VERIFY_EMAIL':
			yield makeApiCall(action, verifyEmailApi, verifyEmailSuccess, verifyEmailFailure)
			break;
		case 'CREATE_ORDER':
			yield makeApiCall(action, createOrderApi, createOrderSuccess, createOrderFailure)
			break;
		case 'GET_USER_ORDERS':
			yield makeApiCall(action, getUserOrdersApi, getUserOrdersSuccess, getUserOrdersFailure)
			break;
		case 'GET_ADMIN_ORDERS':
			yield makeApiCall(action, getUserOrdersApi, getAdminOrdersSuccess, getAdminOrdersFailure)
			break;

	}
}