import _ from 'lodash';
import Cookie from 'js-cookie';

const initialState = {
  gotAllListEnquiries:'',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_OF_ALL_ENQUIRIES':
      return _.assign({}, state, { gotAllListEnquiries: action.payload });
    default:
      return state;
  }
};
