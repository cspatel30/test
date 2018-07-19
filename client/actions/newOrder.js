import Request from 'axios';
import { DECLINED_RESPONSE, ACCCEPTED_REQUEST,LIST_OF_ALL_JOB_ORDERS } from '../constants/ActionsTypes';
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
export function gotAllJobOrders(payload) { return ({ type: LIST_OF_ALL_JOB_ORDERS, payload }); }
export function acceptedRequest(payload,id) { return ({ type: ACCCEPTED_REQUEST, payload,id }); }
export function declinedResponse(payload) { return ({ type: DECLINED_RESPONSE, payload }); }

// async actions


//GET JOB ORDERS
export function getJobOrders(){return dispatch => makeGetRequest('get','/customerOrder/getAll?page=0&size=2')
  .then((response) => dispatch(gotAllJobOrders(response.data)))
  .catch((err)=> console.log("error in gotAllJobOrdres: "+JSON.stringify(err)))
}

export function acceptRequest(id){
  return dispatch => makePostRequest('post','/customerOrder/accept/'+id)
  .then((response) => dispatch(acceptedRequest(response.data,id)))
  .catch((err)=>console.log("error in acceptedRequest: "+JSON.stringify(err)))
}
export function declineRequest(id){
  return dispatch => makePostRequest('post','/customerOrder/decline/'+id)
  .then((response) =>dispatch(declinedResponse(response.data)))
  .catch((err)=> console.log("error in acceptedRequest: "+JSON.stringify(err)))
}