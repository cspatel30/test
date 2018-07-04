import Request from 'axios';
import { TOKEN_VERIFIED } from '../constants/ActionsTypes';

const ip = '/api';
function makeRequest(method, api = '/login', data) {
  return Request[method](ip + api, data)
        .then(r => r);
}


// sync actions
export function tokenVerified(payload) { return ({ type: TOKEN_VERIFIED, payload }); }


//async actions or server request from front-end
export function verifyToken() { return dispatch => makeRequest('get', '/auth/validate/token/')
  .then(response => dispatch(tokenVerified(response.data)));     }
