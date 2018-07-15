import _ from 'lodash';

const initialState = {
  adminAuthToken: '', 
  enquiryMarkup: '',
  adminEnquiryList:{},
  adminOrderList: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADMIN_AUTH_TOKEN':
      return _.assign({}, state, { adminAuthToken: action.payload });
    case 'ENQUIRY_MARKUP':
    return _.assign({}, state, { enquiryMarkup: action.payload });  
    case 'ADMIN_ENQUIRY_LIST': 
    return _.assign({}, state, { adminEnquiryList:  action.payload });  
    case 'ADMIN_ORDER_LIST': console.log("admin order:",  action.payload);
    return _.assign({}, state, { adminOrderList: action.payload  });  
    default:
      return state;
  }
};
