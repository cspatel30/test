import Request from 'axios';
import { TOKEN_VERIFIED, GETLISTINSPECTORS, LOGIN, REGISTER, DROP_DOWN_VALUES, MYPROFILE } from '../constants/ActionsTypes';
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
export function gotDropDownValues(payload) { return ({ type: DROP_DOWN_VALUES, payload }); }
export function gotMyProfileDetails(payload) { return ({ type: MYPROFILE, payload }); }
export function gotListInspectors(payload) { return ({ type: GETLISTINSPECTORS, payload }); }


//ASYNC ACTIONS or SERVER REQUEST FROM FRONT-END //
export function verifyToken() { return dispatch => makeGetRequest('get', '/auth/validate/token/')
    .then(response => dispatch(tokenVerified(response.data)));
}

//LOGIN
export function login(data) {
  return dispatch => makePostRequest('post', '/login', data)
    .then(response => {
      Cookie.set('token', response.data.data.token);
      if (response.data.data.userType == "I") {
        makeGetRequest('get', '/inspector/myProfile')
          .then((profile) => {
            console.log("myProfile User response: " + JSON.stringify(profile))
            // dispatch(gotMyProfileDetails(response.data))
          })
          .catch((err) => {
            console.log("error in ddc: " + JSON.stringify(err))
          })
      } else {
        Cookie.set('token',response.data.data.token);
        console.log("myProfile user response: " + JSON.stringify(response.data.data.userType))
        makeGetRequest('get', '/user/myProfile')
          .then((profile) => {
            console.log("myProfile Inspector response: " + JSON.stringify(profile))
            // dispatch(gotMyProfileDetails(response.data))
          })
          .catch((err) => {
            console.log("error in ddc: " + JSON.stringify(err))
          })
      }
    })
    // dispatch(loggedIn(response.data))
    .catch((err) => {
      console.log("error in login: " + JSON.stringify(err))
    })
}
//SIGNUP
export function signup(data) {
  const userType = data.type !== 'INSPECTOR' ? 'user' : 'inspector';
  return dispatch => makePostRequest('post', `/${userType}/sign-up`, data)
  .then(response => dispatch(registerd(response.data)))
  .catch(error => console.log("inspector signup error: "+JSON.stringify(error)));
}

//PROFILE
export function getMyProfileDetails() {
  return dispatch => makeGetRequest('get', '/inspector/myProfile')
    .then((response) => {
      console.log("myProfile response: " + JSON.stringify(response))
      dispatch(gotMyProfileDetails(response.data))
    })
    .catch((err) => {
      console.log("error in ddc: " + JSON.stringify(err))
    })
}

//GET DROPDOWN CONSTANTS
export function dropDownValues() { return dispatch => makeGetRequest('get', '/init/getDropdownConstants')
  .then((response) =>{
    dispatch(gotDropDownValues(response.data))
  })
  .catch((err)=>{
    console.log("error in ddc: "+JSON.stringify(err))
  })
}


//GET ALL INSPECTORS
export function getAllInspectors() {
  return dispatch => makeGetRequest('get', '/inspector/all')
    .then((response) => {
      console.log("getAllInspectors response: " + JSON.stringify(response))
      dispatch(gotListInspectors(response.data))
    })
    .catch((err) => {
      console.log("error in getAllInspectors: " + JSON.stringify(err))
    })
}
