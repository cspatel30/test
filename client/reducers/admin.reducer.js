import _ from 'lodash';

const initialState = {
  adminAuthToken: '', 
  enquiryMarkup: '',
  adminEnquiryList:{},
  adminOrderList: {},
  adminRefreshApiList: false,
  adminInspectorsList: {}, 
  adminClientsList: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADMIN_AUTH_TOKEN':
    return _.assign({}, state, { adminAuthToken: action.payload });
    case 'ENQUIRY_MARKUP': console.log("Set enquiry markup", action.payload);
    return _.assign({}, state, { enquiryMarkup: action.payload });  
    case 'ADMIN_ENQUIRY_LIST': 
    return _.assign({}, state, { adminEnquiryList:  action.payload });  
    case 'ADMIN_ORDER_LIST':
    return _.assign({}, state, { adminOrderList: action.payload  });
    case 'REFRESH_API_LIST': 
    return _.assign({}, state, { adminRefreshApiList: action.payload  });
    case 'ADMIN_INSPECTORS_LIST': 
    return _.assign({}, state, { adminInspectorsList: action.payload  }); 
    case 'ADMIN_CLIENTS_LIST': 
    return _.assign({}, state, { adminClientsList: action.payload  }); 
    default:
      return state;
  }
};
