import Request from 'axios';
import { TOKEN_VERIFIED } from '../constants/ActionsTypes';
import { LOGIN } from '../constants/ActionsTypes';

const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';

export  function makeRequest(method, api = '/login', data) {
  return Request[method](ip + api, data)
        .then(r => r);
}


// sync actions
export function tokenVerified(payload) { return ({ type: TOKEN_VERIFIED, payload }); }

export function login(payload,method,api) {
  return {
    type: LOGIN,
    payload : payload,
    method:method,
    api:api
  };
}


//async actions or server request from front-end
export function verifyToken() { return dispatch => makeRequest('get', '/auth/validate/token/')
  .then(response => dispatch(tokenVerified(response.data))); }


