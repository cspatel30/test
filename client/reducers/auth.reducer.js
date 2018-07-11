import _ from 'lodash';
import Cookie from 'js-cookie';

const initialState = {
  userToken: '',
  loginData: '',
  signupData: '',
  myProfileData: '',
  dropDownConstants: '',
  getListInspectors: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOKEN_VARIFIED':
      return _.assign({}, state, { userToken: action.payload });
    case 'LOGIN':
      //console.log("token value" + JSON.stringify(action.payload.data))
      Cookie.set('token', action.payload.data);
      //console.log("reducer get value" + JSON.stringify(Cookie.get('token')))
      return _.assign({}, state, { loginData: action.payload });
    case 'REGISTER':
      return _.assign({}, state, { signupData: action.payload });
    case 'MYPROFILE':
      return _.assign({}, state, { myProfileData: action.payload });
    case 'DROP_DOWN_VALUES':
      localStorage.setItem('constantValues', JSON.stringify(action.payload));
      return _.assign({}, state, { dropDownConstants: action.payload });
    case 'GETLISTINSPECTORS':
      return _.assign({}, state, { getListInspectors: action.payload });
    default:
      return state;
  }
};
