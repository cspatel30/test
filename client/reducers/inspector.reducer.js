import _ from 'lodash';
import Cookie from 'js-cookie';

const initialState = {
    myProfileData: '',
    getListInspectors: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MY_PROFILE':
      return _.assign({}, state, { myProfileData: action.payload });
    case 'GET_LIST_INSPECTORS':
      return _.assign({}, state, { getListInspectors: action.payload });
    default:
      return state;
  }
};
