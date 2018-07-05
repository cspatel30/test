import _ from 'lodash';

const initialState = {
  adminLogin: '', 
  enquiryMarkup: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADMIN_LOGIN':
      return _.assign({}, state, { adminLogin: action.payload });
    case 'ENQUIRY_MARKUP':
    return _.assign({}, state, { enquiryMarkup: action.payload });  
    default:
      return state;
  }
};
