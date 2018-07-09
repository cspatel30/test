import Request from 'axios';
import { TOKEN_VERIFIED, LOGIN } from '../constants/ActionsTypes';

const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';

export  function makeRequest(method, api = '/login', data) {
  return Request[method](ip + api, data)
        .then(r => r);
}


// sync actions
export function tokenVerified(payload) { return ({ type: TOKEN_VERIFIED, payload }); }
export function loggedIn(payload) { return ({ type: LOGIN, payload }); }



//async actions or server request from front-end
export function verifyToken() { return dispatch => makeRequest('get', '/auth/validate/token/')
  .then(response => dispatch(tokenVerified(response.data))); }
export function login(data) { return dispatch => makeRequest('post', '/login', data)
  .then(response => dispatch(loggedIn(response.data))); }


