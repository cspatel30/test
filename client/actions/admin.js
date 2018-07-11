import Request from 'axios';
import { ADMIN_AUTH_TOKEN, USER_PROFILE, ENQUIRY_MARKUP, ADMIN_ENQUIRY_LIST, ADMIN_ORDER_LIST } from '../constants/ActionsTypes';

import { storeAdminToken, getAdminToken } from '../common/global';
const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';




async function  makeRequest(method, api = '/login', data) {

  if(api!='/login'){
    let storageFunction =  async () => {  
      
       let adminToken = await getAdminToken();
        let headers = {
                  'Access-Control-Allow-Origin': "*",
                  'Content-Type': "application/json",
                  'Authorization': adminToken.token
        };

    console.log("call to get async function", headers);
      return Request[method](ip + api, data, headers={headers})
        .then(r => r);
    }
    await storageFunction();
    
   }
   else{  
    var headers = {
      'access-control-expose-headers': "*",
      'Content-Type': "application/json"
      }
      console.log("reducer Header", headers);
      return Request[method](ip + api, data, headers={headers})
      .then(r => r);
    }
  
 }


export function loginPayload(payload) { 
  let storageFunction = async () => { console.log("payload");await storeAdminToken({token: payload.data}); }
  storageFunction();
  return (
  	{    type: ADMIN_AUTH_TOKEN, 
  		   payload: payload
  	}); 
}
export function enquiryMarkupSaveSettingsPayload(payload) { return ({ type: ENQUIRY_MARKUP, payload }); }
export function getEnquiryListPayload(payload) { return ({ type: ADMIN_ENQUIRY_LIST, payload }); }
export function getAdminOrdersPayload(payload) { return ({ type: ADMIN_ENQUIRY_LIST, payload }); }


//async actions or server request from front-end
export function login(data) { return dispatch => makeRequest('post', '/login', data)
  .then(response => dispatch(loginPayload(response.data)));     }

  /* Enquiry Markup Save */ 
export function enquiryMarkupSaveSettings(data) { return dispatch => makeRequest('post', '/systemSettings/save', data)
  .then(response => dispatch(enquiryMarkupSaveSettingsPayload(response.data)));     }

 /* Enquiry Markup Save */ 
export function getEnquiryList(data) { return dispatch => makeRequest('get', '/enquiry/getAll?page='+data.page+'&size='+data.pageSize)
  .then(response => dispatch(getEnquiryListPayload(response.data)));     }

 /* Order List */ 
export function getAdminOrders(data) { return dispatch => makeRequest('get', '/enquiry/getAll?page='+data.page+'&size='+data.pageSize)
  .then(response => dispatch(getAdminOrdersPayload(response)));     }
