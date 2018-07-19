import _ from 'lodash';
import Cookie from 'js-cookie';

const initialState = {
    gotAllJobOrders:'',
    acceptedRequest:'',
    declinedRequest:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_OF_ALL_JOB_ORDERS':
      return _.assign({}, state, { gotAllJobOrders: action.payload });
      case 'ACCCEPTED_REQUEST':
      return _.assign({}, state, { acceptedRequest: action.payload });
      case 'DECLINED_RESPONSE':
      return _.assign({}, state, { declinedRequest: action.payload });
    default:
      return state;
  }
};
