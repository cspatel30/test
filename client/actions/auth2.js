import Request from 'axios';
import { TOKEN_VERIFIED, LOGIN, REGISTER, DROP_DOWN_VALUES } from '../constants/ActionsTypes';
import Cookie from 'js-cookie';

const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';
var headers = {
  'Authorization': Cookie.get('token')
};
// let axiosConfig = {
//   headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//       "Access-Control-Allow-Origin": "*",
//   }
// };
export  function makeRequest(method,  api = api, data) {
  return Request[method](ip + api, data, headers)
  .then(r => r);
 }

// SYNC ACTIONS //
export function tokenVerified(payload) { return ({ type: TOKEN_VERIFIED, payload }); }
export function loggedIn(payload) { return ({ type: LOGIN, payload }); }
export function registerd(payload) { return ({ type: REGISTER, payload }); }
export function gotDropDownValues(payload) { return ({ type: DROP_DOWN_VALUES, payload }); }



//ASYNC ACTIONS or SERVER REQUEST FROM FRONT-END //
export function verifyToken() { return dispatch => makeRequest('get', '/auth/validate/token/')
  .then(response => dispatch(tokenVerified(response.data))); }

//LOGIN
export function login(data) { return dispatch => makeRequest('post', '/login', data)
  .then(response => dispatch(loggedIn(response.data))); 
}

//SIGNUP
export function signup(data) { return dispatch => makeRequest('post', '/user/sign-up', data)
  .then(response => {
    console.log("response is:"+JSON.stringify(response))
    dispatch(registerd(response.data))
  }) 
}

//GET DROPDOWN CONSTANTS
export function dropDownValues() { return dispatch => makeRequest('get', '/init/getDropdownConstants')
  .then((response) =>{
    console.log("ddc response: "+JSON.stringify(response))
    dispatch(gotDropDownValues(response.data))
  })
  .catch((err)=>{
    console.log("error in ddc: "+JSON.stringify(err))
  })
}