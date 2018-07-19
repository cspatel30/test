import Request from 'axios';
import { TOKEN_VERIFIED, UPDATE_USER_PROFILE, CHANGE_USER_PASSWORD } from '../constants/ActionsTypes';

const ip = 'http://sis-beta.us-east-1.elasticbeanstalk.com';
function makeRequest(method, api = '/login', data) {
  return Request[method](ip + api, data)
        .then(r => r);
}


// sync actions
export function userProfileUpdated(payload) { return ({ type: UPDATE_USER_PROFILE, payload }); }
export function userPasswordChanged(payload) { return ({ type: CHANGE_USER_PASSWORD, payload }); }


//async actions or server request from front-end
export function updateUserProfile(userProfile) { return dispatch => makeRequest('put', '/client/updateprofile', userProfile)
  .then(response => dispatch(userProfileUpdated(response.data)));     }

export function changeUserPassword(passowrds) { return dispatch => makeRequest('put', '/client/updatepassword', passowrds)
  .then(response => dispatch(userPasswordChanged(response.data)));     }
