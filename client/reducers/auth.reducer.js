import _ from 'lodash';

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
      return _.assign({}, state, { loginData: action.payload });
    case 'REGISTER':
      return _.assign({}, state, { signupData: action.payload });
    default:
      return state;
  }
};
