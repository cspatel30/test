import Request from 'axios';
import { GET_LIST_INSPECTORS, MY_PROFILE } from '../constants/ActionsTypes';
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
export function gotMyProfileDetails(payload) { return ({ type: MY_PROFILE, payload }); }
export function gotListInspectors(payload) { return ({ type: GET_LIST_INSPECTORS, payload }); }


// async actions

//PROFILE
export function getMyProfileDetails() {
  return dispatch => makeGetRequest('get', '/inspector/myProfile')
    .then((response) => {
      console.log("myProfile response: " + JSON.stringify(response))
      dispatch(gotMyProfileDetails(response.data))
    })
    .catch((err) => {
      console.log("error in getMyProfileDetails: " + JSON.stringify(err))
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