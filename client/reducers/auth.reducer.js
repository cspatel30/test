import _ from 'lodash';
import Cookie from 'js-cookie';

const initialState = {
  userToken: '',
  loginData:'',
  signupData:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOKEN_VARIFIED':
      return _.assign({}, state, { userToken: action.payload });
    case 'LOGIN':
      Cookie.set('token', action.payload.email);
      return _.assign({}, state, { loginData: action.payload });
    case 'REGISTER':
      return _.assign({}, state, { signupData: action.payload });
    default:
      return state;
  }
};
