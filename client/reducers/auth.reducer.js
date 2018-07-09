import _ from 'lodash';
import { makeRequest } from '../actions/auth2';

const initialState = {
  userToken: '',
  loginData:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOKEN_VARIFIED':
      return _.assign({}, state, { userToken: action.payload });
    case 'LOGIN':
    makeRequest(action.method,action.api,action.payload).then((response) => {
      console.log('Success Responce',response)
      console.log('Headers Responce',response.headers)
       if (response !== null) {
         console.log("success response", JSON.stringify(response))
       }
       })
       .catch((error)=>{
       console.log("error in response..."+JSON.stringify(error))
       })
    return _.assign({}, state, { loginData: action.payload });
      
    default:
      return state;
  }
};
