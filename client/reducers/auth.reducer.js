import _ from 'lodash';
import Cookie from 'js-cookie';

const initialState = {
  loginData: '',
  signupData: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return _.assign({}, state, { loginData: action.payload });
    case 'REGISTER':
      return _.assign({}, state, { signupData: action.payload });
    default:
      return state;
  }
};
