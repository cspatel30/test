import Request from 'axios';
import { LIST_OF_ALL_ENQUIRIES} from '../constants/ActionsTypes';
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
export function gotAllListEnquiries(payload) { return ({ type: LIST_OF_ALL_ENQUIRIES, payload }); }


// async actions
export function getAllEnquiries(){return dispatch => makeGetRequest('get','/enquiry/getAllEnquiryForInspector?page=0&size=3&from=2018-01-01&to=2018-07-30&status=ORDERED')
  .then((response) => dispatch(gotAllListEnquiries(response.data)))
  .catch((err)=> console.log("error in gotAllListEnquiries: "+JSON.stringify(err)))
}