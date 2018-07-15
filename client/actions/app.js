import Request from 'axios';
import { DROP_DOWN_VALUES } from '../constants/ActionsTypes';
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

// sync actions
export function gotDropDownValues(payload) { return ({ type: DROP_DOWN_VALUES, payload }); }


// async actions
export function dropDownValues() { return dispatch => makeGetRequest('get', '/init/getDropdownConstants')
  .then((response) =>{
    dispatch(gotDropDownValues(response.data))
  })
  .catch((err)=>{
    console.log("error in ddc: "+JSON.stringify(err))
  });
}