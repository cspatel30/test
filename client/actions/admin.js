import Request from 'axios';
import { ADMIN_AUTH_TOKEN, USER_PROFILE, ENQUIRY_MARKUP, ADMIN_ENQUIRY_LIST, ADMIN_ORDER_LIST } from '../constants/ActionsTypes';
import { getApiHeader } from '../common/global';
import Cookie from 'js-cookie';

const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';

 function  makeRequest(method, api = '/login', data) {

  
    let headers = {
      'access-control-expose-headers': "*",
      'Content-Type': "application/json"
      }
      return Request[method](ip + api, data, headers={headers})
      .then(r => r);
  
 }

export function makeGetRequest(method, api = api, tokenNotRequired) {
  let defaultHeader =  {adminToken: true};
  if(tokenNotRequired){
    delete defaultHeader.adminToken;
  }
  var headers = getApiHeader(defaultHeader);
  return Request[method](ip + api, headers = { headers })
    .then(r => r);
}

export function makePostRequest(method, api = api, data, tokenNotRequired) {
  let defaultHeader =  { 'adminToken': true,
                         'Access-Control-Allow-Origin': true
                       };
  if(tokenNotRequired){
    delete defaultHeader.adminToken;
  }
  var headers = getApiHeader(defaultHeader);
  var headers = {
          'access-control-expose-headers': "*",
          'Content-Type': "application/json"
          }
  console.log("headers>>>",{ headers}, data);
  return Request[method](ip + api, data, headers = { headers })
    .then(r => r);
}

export function loginPayload(payload) { 
  // let storageFunction = async () => { console.log("payload");await storeAdminToken({token: payload.data}); }
  // storageFunction();
 Cookie.set('token', payload.token);
  return (
  	{    type: ADMIN_AUTH_TOKEN, 
  		   payload: payload
  	}); 
}
export function enquiryMarkupSaveSettingsPayload(payload) { return ({ type: ENQUIRY_MARKUP, payload }); }
export function getEnquiryListPayload(payload) { return ({ type: ADMIN_ENQUIRY_LIST, payload }); }
export function getAdminOrdersPayload(payload) { return ({ type: ADMIN_ENQUIRY_LIST, payload }); }


//async actions or server request from front-end
export function login(data) { return dispatch => makePostRequest('post', '/login', data, true)
  .then(response => dispatch(loginPayload(response.data)));     }
  /* Enquiry Markup Save */ 
export function enquiryMarkupSaveSettings(data) { return dispatch => makeGetRequest('post', '/systemSettings/save', false)
  .then(response => dispatch(enquiryMarkupSaveSettingsPayload(response.data)));     }

 /* Enquiry Markup Save */ 
export function getEnquiryList(data) { return dispatch => makeGetRequest('get', '/enquiry/getAll?page='+data.page+'&size='+data.pageSize, false)
  .then(response => dispatch(getEnquiryListPayload(response.data)));     }

 /* Order List */ 
export function getAdminOrders(data) { return dispatch => makeGetRequest('get', '/enquiry/getAll?page='+data.page+'&size='+data.pageSize, false)
  .then(response => dispatch(getAdminOrdersPayload(response)));     }
