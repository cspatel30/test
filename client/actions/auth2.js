import Request from 'axios';
import { TOKEN_VERIFIED, GETLISTINSPECTORS,LOGIN, REGISTER, DROP_DOWN_VALUES, MYPROFILE } from '../constants/ActionsTypes';
import Cookie from 'js-cookie';

const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';
var token = Cookie.get('token')
// console.log("auth2/// "+token)
var headers = {
  'Authorization':"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGx1cmliYXNhbnRoQGdtYWlsLmNvbSIsImV4cCI6MTUzMjIzNTU2OH0.mCt-MkIEzajBU_9_8ZPUl-M6qbSB2MCVIsi1DgU1yJDn3hX6a7QPPeZ1XXQb90gjC5FugM-vdK_AR6iY--EnDQ"
};

export  function makeGetRequest(method,  api = api) {
  //console.log("test"+JSON.stringify(method+api))
  //console.log("test"+JSON.stringify(headers))
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
// export function gotDropDownValues(payload) { return ({ type: DROP_DOWN_VALUES, payload }); }
export function gotMyProfileDetails(payload) { return ({ type: MYPROFILE, payload }); }
export function gotListInspectors(payload) { return ({ type: GETLISTINSPECTORS, payload }); }


//ASYNC ACTIONS or SERVER REQUEST FROM FRONT-END //
export function verifyToken() { return dispatch => makeGetRequest('get', '/auth/validate/token/')
  .then(response => dispatch(tokenVerified(response.data))); }

//LOGIN
export function login(data) { return dispatch => makePostRequest('post', '/login', data)
  .then(response =>{
   console.log("loginAuth2:"+JSON.stringify(response.data.data))
  // dispatch(loggedIn(response.data))
}); 
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
     console.log("myProfile response: "+JSON.stringify(response))
    dispatch(gotMyProfileDetails(response.data))
  })
  .catch((err)=>{
    console.log("error in ddc: "+JSON.stringify(err))
  })
}

// //GET DROPDOWN CONSTANTS
// export function dropDownValues() { return dispatch => makeGetRequest('get', '/init/getDropdownConstants')
//   .then((response) =>{
//    // console.log("ddc response: "+JSON.stringify(response))
//     dispatch(gotDropDownValues(response.data))
//   })
//   .catch((err)=>{
//     console.log("error in ddc: "+JSON.stringify(err))
//   })
// }


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
