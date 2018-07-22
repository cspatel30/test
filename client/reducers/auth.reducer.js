import _ from 'lodash';
import Cookie from 'js-cookie';

const initialState = {
  loginData: '',
  signupData: '',
  profile: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      Cookie.set('token', action.payload.token);
      Cookie.set('userType', action.payload.userType);
      return _.assign({}, state, { loginData: action.payload });
    case 'REGISTER':
      return _.assign({}, state, { signupData: action.payload });
    case 'LOGOUT':
      Cookie.remove('token');
      Cookie.remove('userType');
      localStorage.clear();
      return _.assign({}, state, { signupData: '', loginData: '' });
    default:
      return state;
  }
};
