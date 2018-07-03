import Request from 'axios';
import { TOKEN_VARIFIED } from '../constants/ActionsTypes';

const ip = '/api';
function makeRequest(method, api = '/login', data) {
  return Request[method](ip + api, data)
        .then(r => r);
}


// sync actions
export function tokenVarified(payload) { return ({ type: TOKEN_VARIFIED, payload }); }


//async actions or server request from front-end
export function varifyToken() { return dispatch => makeRequest('get', '/auth/validate/token/')
  .then(response => dispatch(tokenVarified(response.data)));     }
