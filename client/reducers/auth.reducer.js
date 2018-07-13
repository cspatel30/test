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
      return _.assign({}, state, { loginData: action.payload });
    case 'REGISTER':
      return _.assign({}, state, { signupData: action.payload });
    case 'MYPROFILE':
      return _.assign({}, state, { myProfileData: action.payload });
    case 'DROP_DOWN_VALUES':
      localStorage.setItem('countries', JSON.stringify(action.payload.countries))
      localStorage.setItem('Qualification', JSON.stringify(action.payload.highestQualification))
      localStorage.setItem('titles', JSON.stringify(action.payload.title))
      return _.assign({}, state, { dropDownConstants: action.payload });
    case 'GETLISTINSPECTORS':
      return _.assign({}, state, { getListInspectors: action.payload });
    default:
      return state;
  }
};
