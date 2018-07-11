import Request from 'axios';
import { TOKEN_VERIFIED, GETLISTINSPECTORS,LOGIN, REGISTER, DROP_DOWN_VALUES, MYPROFILE } from '../constants/ActionsTypes';
import Cookie from 'js-cookie';

const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';
var token = Cookie.get('token')
// console.log("auth2/// "+token)
var headers = {
  'Authorization':"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXZhbmt1bWFyLmRAc3RlbGxlbnRzb2Z0LmNvbSIsImV4cCI6MTUzMjE4ODk3M30.GygQa8oL375YKErJrKUkZmyzUOLL1Ir6TnPpIndMw64HOrneoi63LirffgLGHh3AaF4ur8dqK7yw7r2PXZKj-A"
};

export  function makeGetRequest(method,  api = api) {
  return Request[method](ip + api,headers={headers})
  .then(r => r);
 }

 export  function makePostRequest(method,  api = api, data) {
  return Request[method](ip + api,data,headers={headers})
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
  .then(response => dispatch(tokenVerified(response.data))); }

//LOGIN
export function login(data) { return dispatch => makePostRequest('post', '/login', data)
  .then(response => dispatch(loggedIn(response.data))); 
}

//SIGNUP
export function signup(data) { return dispatch => makePostRequest('post', '/user/sign-up', data)
  .then(response => {
   // console.log("response is:"+JSON.stringify(response))
    dispatch(registerd(response.data))
  }) 
}

//PROFILE
export function getMyProfileDetails() { return dispatch => makeGetRequest('get', '/user/myProfile')
  .then((response) =>{
   // console.log("myProfile response: "+JSON.stringify(response))
    dispatch(gotMyProfileDetails(response.data))
  })
  .catch((err)=>{
    console.log("error in ddc: "+JSON.stringify(err))
  })
}

//GET DROPDOWN CONSTANTS
export function dropDownValues() { return dispatch => makeGetRequest('get', '/init/getDropdownConstants')
  .then((response) =>{
   // console.log("ddc response: "+JSON.stringify(response))
    dispatch(gotDropDownValues(response.data))
  })
  .catch((err)=>{
    console.log("error in ddc: "+JSON.stringify(err))
  })
}


//GET ALL INSPECTORS
export function getAllInspectors() { return dispatch => makeGetRequest('get', '/inspector/all')
  .then((response) =>{
    console.log("getAllInspectors response: "+JSON.stringify(response))
    dispatch(gotListInspectors(response.data))
  })
  .catch((err)=>{
    console.log("error in getAllInspectors: "+JSON.stringify(err))
  })
}
