import _ from 'lodash';
import Cookie from 'js-cookie';

const initialState = {
    myProfileData: '',
    getListInspectors: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MYPROFILE':
      return _.assign({}, state, { myProfileData: action.payload });
    case 'GETLISTINSPECTORS':
      return _.assign({}, state, { getListInspectors: action.payload });
    default:
      return state;
  }
};
