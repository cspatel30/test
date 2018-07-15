import Request from 'axios';
import { TOKEN_VERIFIED, GETLISTINSPECTORS, LOGIN, REGISTER, MYPROFILE } from '../constants/ActionsTypes';
import Cookie from 'js-cookie';

const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';

function makeGetRequest(method, api = api) {
  var token = Cookie.get('token')
  var headers = { 'Authorization': token };
  return Request[method](ip + api, headers = { headers })
    .then(r => r);
}

function makePostRequest(method, api = api, data) {
  var token = Cookie.get('token')
  var headers = { 'Authorization': token };
  return Request[method](ip + api, data, headers = { headers })
    .then(r => r);
}

// SYNC ACTIONS //
export function tokenVerified(payload) { return ({ type: TOKEN_VERIFIED, payload }); }
export function loggedIn(payload) { return ({ type: LOGIN, payload }); }
export function registerd(payload) { return ({ type: REGISTER, payload }); }


//ASYNC ACTIONS or SERVER REQUEST FROM FRONT-END //
export function verifyToken() { return dispatch => makeGetRequest('get', '/auth/validate/token/')
    .then(response => dispatch(tokenVerified(response.data)));
}

export function login(data) {
  return dispatch => makePostRequest('post', '/login', data)
    .then(response => {
      Cookie.set('token', response.data.data.token);
      const userType = response.data.data.userType !== 'I' ? 'user' : 'inspector';
        makeGetRequest('get', `/${userType}/myProfile`, data)
        .then(profile => dispatch(loggedIn(response.data)))
        .catch(err => console.log("error: " + JSON.stringify(err)))
    })
    .catch(err => console.log("error in login: " + JSON.stringify(err)))
}

//SIGNUP
export function signup(data) {
  const userType = data.type !== 'INSPECTOR' ? 'user' : 'inspector';
  return dispatch => makePostRequest('post', `/${userType}/sign-up`, data)
  .then(response => dispatch(registerd(response.data)))
  .catch(error => console.log("inspector signup error: "+JSON.stringify(error)));
}
