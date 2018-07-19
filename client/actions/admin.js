import Request from 'axios';
import { ADMIN_AUTH_TOKEN, USER_PROFILE, ENQUIRY_MARKUP, ADMIN_ENQUIRY_LIST,
   ADMIN_ORDER_LIST, REFRESH_API_LIST, ADMIN_CLIENTS_LIST, ADMIN_INSPECTORS_LIST  } from '../constants/ActionsTypes';
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
export function enquiryMarkupSaveSettingsPayload(payload) {getEnquiryMarkupSettings(); return ({ type: ENQUIRY_MARKUP, payload }); }
export function getEnquiryMarkupSettingsPayload(payload) { return ({ type: ENQUIRY_MARKUP, payload }); }
export function getEnquiryListPayload(payload) { return ({ type: ADMIN_ENQUIRY_LIST, payload }); }
export function getAdminOrdersPayload(payload) { return ({ type: ADMIN_ORDER_LIST, payload }); }
export function assignInspectorPayload(payload) { return ({ type: REFRESH_API_LIST, payload:true }); }
export function getInspectorsListPayload(payload) { return ({ type: ADMIN_INSPECTORS_LIST, payload }); }
export function approveQuotationPayload(payload) { return ({ type: REFRESH_API_LIST, payload:true }); }
export function updateQuotationPayload(payload) { return ({ type: REFRESH_API_LIST, payload:true }); }
export function resetAdminRefreshApiCallPayload(payload) { return ({ type: REFRESH_API_LIST, payload }); }
export function getClientsListPayload(payload) { return ({ type: ADMIN_CLIENTS_LIST, payload }); }
export function editEnquiryPayload(payload) { return ({ type: REFRESH_API_LIST, payload:true }); }
export function deleteEnquiryPayload(payload) { return ({ type: REFRESH_API_LIST, payload:true }); }

//async actions or server request from front-end
export function login(data) { return dispatch => makePostRequest('post', '/login', data, true)
  .then(response => dispatch(loginPayload(response.data)));     }
  /* Enquiry Markup Save */ 
export function enquiryMarkupSaveSettings(data) { return dispatch => makePostRequest('post', '/systemSettings/save', data)
  .then(response => dispatch(enquiryMarkupSaveSettingsPayload(response.data)));     }
  
 /* Enquiry Markup Save */ 
export function getEnquiryMarkupSettings(data) { return dispatch => makeGetRequest('get', '/systemSettings/getAll')
.then(response => dispatch(getEnquiryMarkupSettingsPayload(response.data && response.data.length>0?response.data[0]:"")));     }

 /* Enquiry Markup Save */ 
export function getEnquiryList(data) { return dispatch => makeGetRequest('get', '/enquiry/getAllEnquiryForAdmin?page='+parseInt(data.page-1)+'&size='+data.pageSize)
  .then(response => dispatch(getEnquiryListPayload(response.data)));     }
 /* Delete Enquiry */ 
 export function deleteEnquiry(data) { return dispatch => makePostRequest('delete', '/enquiry/delete/'+data)
 .then(response => dispatch(deleteEnquiryPayload(response.data)));     }
  /* Edit Enquiry */ 
export function editEnquiry(data) { return dispatch => makePostRequest('post', '/enquiry/update', data)
.then(response => dispatch(editEnquiryPayload(response.data)));     }

  
 /* Order List */ 
export function getAdminOrders(data) { return dispatch => makeGetRequest('get', '/customerOrder/getAll?page='+parseInt(data.page-1)+'&size='+data.pageSize)
  .then(response => dispatch(getAdminOrdersPayload(response.data)));     }
  
/* Assign Inspector */ 
export function assignInspector(data) { return dispatch => makePostRequest('post', '/enquiry/assignInspector', data)
.then(response => dispatch(assignInspectorPayload(response.data)));   }  

/* Get All Inspectors */ 
export function getInspectorsList(data) {return dispatch => makeGetRequest('get', '/inspector/getAll')//?page='+parseInt(data.page-1)+'&size='+data.pageSize)
.then(response => dispatch(getInspectorsListPayload(response.data)));  }

/* Approve quotation */ 
export function approveQuotation(data) { return dispatch => makePostRequest('post', '/quotation/approve/'+data)
.then(response => dispatch(approveQuotationPayload(response.data)));   }  

/* Update quotation */ 
export function upodateQuotation(data) { return dispatch => makePostRequest('post', '/quotation/approve/', data)
.then(response => dispatch(updateQuotationPayload(response.data)));   }  

/* Reset Api refresh list variable */ 
export function resetAdminRefreshApiCall(data) { return dispatch => dispatch(resetAdminRefreshApiCallPayload(states))  }  

/* Get Admin Clients List */
export function getClientsList(data) {return dispatch => makeGetRequest('get', '/user/getAll?page='+parseInt(data.page-1)+'&size='+data.pageSize)
.then(response => dispatch(getClientsListPayload(response.data)));  }
