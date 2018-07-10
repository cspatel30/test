import Request from 'axios';
import { USER_PROFILE, ENQUIRY_MARKUP, ADMIN_ENQUIRY_LIST, ADMIN_ORDER_LIST } from '../constants/ActionsTypes';

const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';
function makeRequest(method, api = '/login', data) {
	
  return Request[method](ip + api, data)
        .then(r => { console.log( "api", api, method); let headers = r; 
        	r.headers["access-control-expose-headers"] = '*';
        	r.headers["Content-Type"] = 'application/json';
        	if(api!='/login'){
        		r.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBzaGlwaW5zcGVjdG9ycy5jb20iLCJleHAiOjE1MzIwNzcxMjB9.Mm-ZDQJuuw_Oy0GuGXJEgk5rXevemzteco5xirtWe50n_CO2n7IQ4EODIDKNIXexXCY_lg3TNiT6TsZuhMG_1A'
        	}
        	console.log(api, "r headers", headers); 
        	return headers});
}

export function loginPayload(payload) { console.log("Admin Login Payload Response", payload);return (
	{    type: USER_PROFILE, 
		payload: payload.data
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
