import Request from 'axios';
import { ADMIN_AUTH_TOKEN, USER_PROFILE, ENQUIRY_MARKUP, ADMIN_ENQUIRY_LIST, ADMIN_ORDER_LIST } from '../constants/ActionsTypes';
import { getApiHeader } from '../common/global';
import Cookie from 'js-cookie';

const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';

export function makeGetRequest(method, api = api, tokenNotRequired) {
  let defaultHeader =  {adminAuthToken: true};
  console.log("defaultHeader>>>>>>>>>", defaultHeader);
  if(tokenNotRequired){
    delete defaultHeader.adminAuthToken;
  }
  var headers = getApiHeader(defaultHeader);
  console.log(defaultHeader, "headers>>>>> in Get ApI", headers);
  return Request[method](ip + api, headers = { headers })
    .then(r => r);
}

export function makePostRequest(method, api = api, data, tokenNotRequired) {
  let defaultHeader =  { 'adminAuthToken': true,
                         'Access-Control-Allow-Origin': true
                       };
  if(tokenNotRequired){
    delete defaultHeader.adminAuthToken;
  }
  var headers = getApiHeader(defaultHeader);
  return Request[method](ip + api, data, headers = { headers })
    .then(r => r);
}

export function loginPayload(payload) { 
  // let storageFunction = async () => { console.log("payload");await storeAdminToken({token: payload.data}); }
  // storageFunction();
  Cookie.set('adminToken', payload.data.token);
  return (
  	{    type: ADMIN_AUTH_TOKEN, 
  		   payload: payload
  	}); 
}
export function enquiryMarkupSaveSettingsPayload(payload) { return ({ type: ENQUIRY_MARKUP, payload }); }
export function getEnquiryMarkupSettingsPayload(payload) { return ({ type: ENQUIRY_MARKUP, payload }); }
export function getEnquiryListPayload(payload) { return ({ type: ADMIN_ENQUIRY_LIST, payload }); }
export function getAdminOrdersPayload(payload) { return ({ type: ADMIN_ORDER_LIST, payload }); }


//async actions or server request from front-end
export function login(data) { return dispatch => makePostRequest('post', '/login', data, true)
  .then(response => dispatch(loginPayload(response.data)));     }
  /* Enquiry Markup Save */ 
export function enquiryMarkupSaveSettings(data) { return dispatch => makePostRequest('post', '/systemSettings/save', data)
  .then(response => dispatch(enquiryMarkupSaveSettingsPayload(response.data)));     }
  
 /* Enquiry Markup Save */ 
export function getEnquiryMarkupSettings(data) { return dispatch => makeGetRequest('get', '/systemSettings/getAll')
.then(response => dispatch(getEnquiryMarkupSettingsPayload(response.data)));     }

 /* Enquiry Markup Save */ 
export function getEnquiryList(data) { return dispatch => makeGetRequest('get', '/enquiry/getAll?page='+parseInt(data.page-1)+'&size='+data.pageSize)
  .then(response => dispatch(getEnquiryListPayload(response.data)));     }

 /* Order List */ 
export function getAdminOrders(data) { return dispatch => makeGetRequest('get', '/customerOrder/getAll?page='+parseInt(data.page-1)+'&size='+data.pageSize)
  .then(response => dispatch(getAdminOrdersPayload(response.data)));     }
