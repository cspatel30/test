export const CREATE_ENQUIRY = 'CREATE_ENQUIRY';
export const CREATE_ENQUIRY_SUCCESS = 'CREATE_ENQUIRY_SUCCESS';
export const CREATE_ENQUIRY_FAILURE = 'CREATE_ENQUIRY_FAILURE';

export const GET_CUSTOMER_ENQUIRIES = 'GET_CUSTOMER_ENQUIRIES';
export const GET_CUSTOMER_ENQUIRIES_SUCCESS = 'GET_CUSTOMER_ENQUIRIES_SUCCESS';
export const GET_CUSTOMER_ENQUIRIES_FAILURE = 'GET_CUSTOMER_ENQUIRIES_FAILURE';

export const CANCEL_ENQUIRY = 'CANCEL_ENQUIRY';
export const CANCEL_ENQUIRY_SUCCESS = 'CANCEL_ENQUIRY_SUCCESS';
export const CANCEL_ENQUIRY_FAILURE = 'CANCEL_ENQUIRY_FAILURE';

export const UPDATE_ENQUIRY_QUOTE = 'UPDATE_ENQUIRY_QUOTE';
export const UPDATE_ENQUIRY_QUOTE_SUCCESS = 'UPDATE_ENQUIRY_QUOTE_SUCCESS';
export const UPDATE_ENQUIRY_QUOTE_FAILURE = 'UPDATE_ENQUIRY_QUOTE_FAILURE';

export const SEARCH_INPECTORS_ENQUIRY = 'SEARCH_INPECTORS_ENQUIRY';
export const SEARCH_INPECTORS_ENQUIRY_SUCCESS = 'SEARCH_INPECTORS_ENQUIRY_SUCCESS';
export const SEARCH_INPECTORS_ENQUIRY_FAILURE = 'SEARCH_INPECTORS_ENQUIRY_FAILURE';

export const ASSIGN_INSPECTORS_FOR_ENQUIRY = 'ASSIGN_INSPECTORS_FOR_ENQUIRY';
export const ASSIGN_INSPECTORS_FOR_ENQUIRY_SUCCESS = 'ASSIGN_INSPECTORS_FOR_ENQUIRY_SUCCESS';
export const ASSIGN_INSPECTORS_FOR_ENQUIRY_FAILURE = 'ASSIGN_INSPECTORS_FOR_ENQUIRY_FAILURE';

export const ACCEPT_REJECT_ENQUIRY_QUOTE = 'ACCEPT_REJECT_ENQUIRY_QUOTE';
export const ACCEPT_REJECT_ENQUIRY_QUOTE_SUCCESS = 'ACCEPT_REJECT_ENQUIRY_QUOTE_SUCCESS';
export const ACCEPT_REJECT_ENQUIRY_QUOTE_FAILURE = 'ACCEPT_REJECT_ENQUIRY_QUOTE_FAILURE';

export function createEnquiry(payload) {
  console.log('first action is calling...');
  return {
    type: CREATE_ENQUIRY,
    payload: payload
  };
}

export function createEnquirySuccess(payload) {
  return {
    type: CREATE_ENQUIRY_SUCCESS,
    payload: payload
  };
}

export function createEnquiryFailure(payload) {
  return {
    type: CREATE_ENQUIRY_FAILURE,
    payload: payload
  };
}

export function getCustomerEnquiries(userType) {
  return {
    type: GET_CUSTOMER_ENQUIRIES,
    payload: userType
  };
}

export function getCustomerEnquiriesSuccess(enquiries) {
  return {
    type: GET_CUSTOMER_ENQUIRIES_SUCCESS,
    payload: enquiries
  };
}

export function getCustomerEnquiriesFailure(error) {
  return {
    type: GET_CUSTOMER_ENQUIRIES_FAILURE,
    payload: error
  };
}

export function cancelEnquiry(enquiryId) {
  return {
    type: CANCEL_ENQUIRY,
    payload: enquiryId
  };
}

export function cancelEnquirySuccess(enquiries) {
  return {
    type: CANCEL_ENQUIRY_SUCCESS,
    payload: enquiries
  };
}

export function cancelEnquiryFailure(error) {
  return {
    type: CANCEL_ENQUIRY_FAILURE,
    payload: error
  };
}

export function updateEnquiryQuote(enquiryId, quoteDetails) {
  return {
    type: UPDATE_ENQUIRY_QUOTE,
    payload: {enquiryId: enquiryId, quoteDetails: quoteDetails}
  };
}

export function updateEnquiryQuoteSuccess(enquiry) {
  return {
    type: UPDATE_ENQUIRY_QUOTE_SUCCESS,
    payload: enquiry
  };
}

export function updateEnquiryQuoteFailure(error) {
  return {
    type: UPDATE_ENQUIRY_QUOTE_FAILURE,
    payload: error
  };
}

export function searchInspectorsForEnquiry(enquiryId) {
  return {
    type: SEARCH_INPECTORS_ENQUIRY,
    payload: enquiryId
  };
}

export function searchInspectorsForEnquirySuccess(inspectors) {
  return {
    type: SEARCH_INPECTORS_ENQUIRY_SUCCESS,
    payload: inspectors
  };
}

export function searchInspectorsForEnquiryFailure(error) {
  return {
    type: SEARCH_INPECTORS_ENQUIRY_FAILURE,
    payload: error
  };
}

export function assignInspectorsForEnquiry(enquiryId, inspectorIds) {
  return {
    type: ASSIGN_INSPECTORS_FOR_ENQUIRY,
    payload: {enquiryId: enquiryId, inspectorIds: inspectorIds}
  };
}

export function assignInspectorsForEnquirySuccess() {
  return {
    type: ASSIGN_INSPECTORS_FOR_ENQUIRY_SUCCESS
  };
}

export function assignInspectorsForEnquiryFailure(error) {
  return {
    type: ASSIGN_INSPECTORS_FOR_ENQUIRY_FAILURE,
    payload: error
  };
}

export function acceptRejectEnquiryQuote(enquiryId, accepted) {
  return {
    type: ACCEPT_REJECT_ENQUIRY_QUOTE,
    payload: {enquiryId: enquiryId, accepted: accepted}
  };
}

export function acceptRejectEnquiryQuoteSuccess(enquiries) {
  return {
    type: ACCEPT_REJECT_ENQUIRY_QUOTE_SUCCESS,
    payload: enquiries
  };
}

export function acceptRejectEnquiryQuoteFailure(error) {
  return {
    type: ACCEPT_REJECT_ENQUIRY_QUOTE_FAILURE,
    payload: error
  };
}