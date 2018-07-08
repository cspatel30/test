import Request from 'axios';
import { ADMIN_LOGIN, ENQUIRY_MARKUP } from '../constants/ActionsTypes';

const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';
function makeRequest(method, api = '/login', data) {
  return Request[method](ip + api, data)
        .then(r => { let headers = r; 
        	r.headers["access-control-expose-headers"] = '*';
        	r.headers["Content-Type"] = 'application/json';
        	console.log("r headers", headers); 
        	return headers});
}

/* Admin Login */
// sync actions
export function loginPayload(payload) { console.log("Admin Login Payload Response", payload);return ({ type: ADMIN_LOGIN, payload }); }
export function enquiryMarkupSaveSettingsPayload(payload) { return ({ type: ENQUIRY_MARKUP, payload }); }


//async actions or server request from front-end
export function login(data) { return dispatch => makeRequest('post', '/login', data)
  .then(response => dispatch(loginPayload(response)));     }

  export function enquiryMarkupSaveSettings() { return dispatch => makeRequest('post', '/systemSettings/save/')
  .then(response => dispatch(enquiryMarkupSaveSettingsPayload(response.data)));     }
