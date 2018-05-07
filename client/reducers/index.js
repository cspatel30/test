import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'lodash';
import { ACTION_IN_PROGRESS, SESSION_EXPIRED } from '../actions/common';

import { LOGIN_SUCCESS, LOGIN_FAILURE, VERIFY_TOKEN_SUCCESS, VERIFY_TOKEN_FAILURE, 
  LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILURE,
  SETUP_ACCOUNT_SUCCESS, SETUP_ACCOUNT_FAILURE, VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE } from '../actions/auth';

import {INIT_APP_SUCCESS, INIT_APP_FAILURE} from '../actions/app';

import {CONTACT_US_EMAIL_SUCCESS, CONTACT_US_EMAIL_FAILURE } from '../actions/contactus';

import {GET_INSPECTOR_PROFILE_SUCCESS, GET_INSPECTOR_PROFILE_FAILURE, GET_INSPECTORS_SUCCESS,
GET_INSPECTORS_FAILURE, GET_INSPECTOR_PUBLIC_PROFILE_SUCCESS, GET_INSPECTOR_PUBLIC_PROFILE_FAILURE ,
UPLOAD_INSPECTOR_DOC_SUCCESS, UPLOAD_INSPECTOR_DOC_FAILURE, DOWNLOAD_INSPECTOR_DOC_SUCCESS, DOWNLOAD_INSPECTOR_DOC_FAILURE,
UPDATE_INSPECTOR_PROFILE_SUCCESS, UPDATE_INSPECTOR_PROFILE_FAILURE, UPDATE_INSPECTOR_PROFILE} from '../actions/inspector';

import {CREATE_ENQUIRY_SUCCESS, CREATE_ENQUIRY_FAILURE, GET_CUSTOMER_ENQUIRIES_SUCCESS, 
GET_CUSTOMER_ENQUIRIES_FAILURE, CANCEL_ENQUIRY_SUCCESS, CANCEL_ENQUIRY_FAILURE,
UPDATE_ENQUIRY_QUOTE_SUCCESS, UPDATE_ENQUIRY_QUOTE_FAILURE,
SEARCH_INPECTORS_ENQUIRY_SUCCESS, SEARCH_INPECTORS_ENQUIRY_FAILURE,
ASSIGN_INSPECTORS_FOR_ENQUIRY_SUCCESS, ASSIGN_INSPECTORS_FOR_ENQUIRY_FAILURE,
ACCEPT_REJECT_ENQUIRY_QUOTE_SUCCESS, ACCEPT_REJECT_ENQUIRY_QUOTE_FAILURE} from '../actions/enquiry';

import { CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE, GET_USER_ORDERS_SUCCESS, GET_USER_ORDERS_FAILURE,
          GET_ADMIN_ORDERS_SUCCESS, GET_ADMIN_ORDERS_FAILURE } from '../actions/order';


export default function(state = INITIAL_STATE, action) {
  let error;
  console.log('Got Event for action = ', action.type);
  switch(action.type) {
  	case LOCATION_CHANGE:
      return { ...state, error: null, loading: false, logout: false, createEnquirySuccess: false, createdEnquiry: null, 
        enquiryQuoteUpdated: false, enquiryInspectorMatches: [], inspectorAssignedSuccess: false, currentEnquiry: null,
        quoteAcceptRejectSuccess: false, downloadUrl: null, profileUpdateSuccess: false, contactUsEmailSuccess: false,
        signUpSuccess: false, inspectors: [], setupAccountSuccess: false, verifyEmailSuccess: false, createOrderSuccess: false,
        createdOrder: null, orders: null}

    case ACTION_IN_PROGRESS:// start fetching posts and set loading = true
  		return { ...state, error: null, loading: true, logout: false, createEnquirySuccess: false, createdEnquiry: null, 
        enquiryQuoteUpdated: false, enquiryInspectorMatches: [], inspectorAssignedSuccess: false, currentEnquiry: null,
        quoteAcceptRejectSuccess: false, downloadUrl: null, profileUpdateSuccess: false, contactUsEmailSuccess: false, 
        signUpSuccess: false, inspectors: [], setupAccountSuccess: false, verifyEmailSuccess: false, createOrderSuccess: false,
        createdOrder: null, orders: null};
    
    case SESSION_EXPIRED:
      return { ...state, userToken: null, loading: false};    

    case INIT_APP_SUCCESS:
      return { ...state, ports: action.payload.ports, countries: action.payload.countries, 
              inspectionTypes: action.payload.inspectionTypes, vesselTypes: action.payload.vesselTypes, 
              inspectorPositions: action.payload.inspectorPositions, inspectorQualifications: action.payload.inspectorQualifications,
              inspectorTitles: action.payload.inspectorTitles, inspectorSkills: action.payload.inspectorSkills,
              region: action.payload.region,
              inspectorLevel:action.payload.inspectorLevel, regionCodes: action.payload.regionCodes};    

    case INIT_APP_FAILURE:
      return { ...state, ports: [], error: action.payload};    

    case LOGIN_SUCCESS:
      return { ...state, userToken: action.payload.userToken, userProfile: action.payload.userProfile, logout: false, loading: false}; 
       
    case LOGIN_FAILURE:
      error = action.payload.message;
      return { ...state, userToken: null, error: action.payload, loading: false}; 
      
    case 'FORGOT_PASSWORD_SUCCESS':
      return { ...state, fgpwdMsg: action.payload.status.message, loading: false};
    
    case 'FORGOT_PASSWORD_FAILURE':
      error = action.payload;
      console.log('forgot pass error....', error);
      return { ...state, fgpwdMsg: error, loading: false};
    
    case REGISTER_SUCCESS:
      return { ...state, loading: false, signUpSuccess: true}; 

    case REGISTER_FAILURE:
      return { ...state, userToken: null, error: action.payload, loading: false, signUpSuccess: false}; 

    case VERIFY_TOKEN_SUCCESS:
      return { ...state, userToken: action.payload.userToken, userProfile: action.payload.userProfile, loading: false}; 
      
    case VERIFY_TOKEN_FAILURE:
      return { ...state, userToken: null, userProfile:null, error: action.payload, loading: false};  
    
    case LOGOUT_SUCCESS:
      return { ...state, userToken: null, userProfile: null, logout: true, loading: false}; 

    case CREATE_ENQUIRY_SUCCESS:
      return { ...state, loading: false, createEnquirySuccess: true, createdEnquiry: action.payload}; 

    case CREATE_ENQUIRY_FAILURE:
      return { ...state, userToken: null, error: action.payload, createEnquirySuccess: false, loading: false}; 

    case GET_CUSTOMER_ENQUIRIES_SUCCESS: 
      return { ...state, loading: false, enquiries: action.payload}; 

    case GET_CUSTOMER_ENQUIRIES_FAILURE:
      return { ...state, error: action.payload, loading: false}; 

    case CANCEL_ENQUIRY_SUCCESS:
      return {...state, loading: false, enquiries: action.payload};

    case CANCEL_ENQUIRY_FAILURE:
      return { ...state, error: action.payload, loading: false}; 
    
    case GET_INSPECTOR_PROFILE_SUCCESS:
      return {...state, loading: false, inspectorProfile: action.payload};

    case GET_INSPECTOR_PROFILE_FAILURE:
      return { ...state, error: action.payload, loading: false}; 

    case GET_INSPECTORS_SUCCESS:
      return {...state, loading: false, inspectorPageNo: action.payload.pageNo, inspectors: action.payload.profiles};

    case GET_INSPECTORS_FAILURE:
      return { ...state, error: action.payload, loading: false}; 

    case GET_INSPECTOR_PUBLIC_PROFILE_SUCCESS:
      return {...state, loading: false, inspectorPublicProfile: action.payload};

    case GET_INSPECTOR_PUBLIC_PROFILE_FAILURE:
      return { ...state, error: action.payload, loading: false}; 

    case UPDATE_ENQUIRY_QUOTE_SUCCESS:
      console.log("Update quote success - ", action.payload);
      for(var i=0; i < state.enquiries.length ; i++) {
        if(state.enquiries[i].id == action.payload.id) {
          state.enquiries[i]['customerQuote'] = action.payload['customerQuote'];
          state.enquiries[i]['inspectorQuote'] = action.payload['inspectorQuote'];
        }
      }
      return {...state, loading: false, enquiryQuoteUpdated: true };

    case UPDATE_ENQUIRY_QUOTE_FAILURE:
      return { ...state, error: action.payload, loading: false}; 

    case SEARCH_INPECTORS_ENQUIRY_SUCCESS:
      return {...state, loading: false, enquiryInspectorMatches: action.payload.inspectors, currentEnquiry: action.payload.enquiry };

    case SEARCH_INPECTORS_ENQUIRY_FAILURE:
      return { ...state, error: action.payload, loading: false}; 

    case ASSIGN_INSPECTORS_FOR_ENQUIRY_SUCCESS:
      return {...state, loading: false, inspectorAssignedSuccess: true };

    case ASSIGN_INSPECTORS_FOR_ENQUIRY_FAILURE:
      return { ...state, error: action.payload, loading: false}; 

    case ACCEPT_REJECT_ENQUIRY_QUOTE_SUCCESS:
      return {...state, loading: false, quoteAcceptRejectSuccess: true, enquiries: action.payload };

    case ACCEPT_REJECT_ENQUIRY_QUOTE_FAILURE:
      return {...state, loading: false, error: action.payload };

    case UPLOAD_INSPECTOR_DOC_SUCCESS:
      return {...state, loading: false, currentDocument: action.payload};

    case UPLOAD_INSPECTOR_DOC_FAILURE:
      return {...state, loading: false, error: action.payload};

    case DOWNLOAD_INSPECTOR_DOC_SUCCESS:
      return {...state, loading: false, downloadUrl: action.payload};

    case DOWNLOAD_INSPECTOR_DOC_FAILURE:
      return {...state, loading: false, error: action.payload};

    case UPDATE_INSPECTOR_PROFILE_SUCCESS:
      return {...state, loading: false, userProfile: action.payload.userProfile, inspectorProfile: action.payload.inspectorProfile, profileUpdateSuccess: true};

    case UPDATE_INSPECTOR_PROFILE_FAILURE:
      return {...state, loading: false, error: action.payload};
    
    case 'DELETE_EDUCATION_ITEM_SUCCESS':
      const newArr = state.inspectorProfile.education.filter(x => x.id != action.payload.id);
      const obj = {...state.inspectorProfile, education: newArr };
      return {...state, loading: false, deletedItemFromEdu: action.payload, inspectorProfile: obj };

    case 'DELETE_EDUCATION_ITEM_FAILURE':
      return {...state, loading: false, error: action.payload};
    
    case 'DELETE_EMPLOYMENT_ITEM_SUCCESS':
      const newArr1 = state.inspectorProfile.employment.filter(x => x.id != action.payload.id);
      const obj1 = {...state.inspectorProfile, employment: newArr1 };
      return {...state, loading: false, deletedItemFromEdu: action.payload, inspectorProfile: obj1 };

    case 'DELETE_EMPLOYMENT_ITEM_FAILURE':
      return {...state, loading: false, error: action.payload};
    
    case UPDATE_INSPECTOR_PROFILE:
      return {...state, profileUpdateSuccess: false, inspectorProfile: null};

    case CONTACT_US_EMAIL_SUCCESS:
      return {...state, contactUsEmailSuccess: true, loading: false, error: null};

    case CONTACT_US_EMAIL_FAILURE:
      return {...state, loading: false, contactUsEmailSuccess: false, error: action.payload};

    case SETUP_ACCOUNT_SUCCESS:
      return {...state, loading: false, setupAccountSuccess: true};

    case SETUP_ACCOUNT_FAILURE:
      return {...state, loading: false, setupAccountSuccess: false, error: action.payload};

    case VERIFY_EMAIL_SUCCESS:
      return {...state, loading: false, verifyEmailSuccess: true};

    case VERIFY_EMAIL_FAILURE:
      return {...state, loading: false, verifyEmailSuccess: false, error: action.payload};
        
    case CREATE_ORDER_SUCCESS:
      return {...state, loading: false, createOrderSuccess: true, createdOrder: action.payload};

    case CREATE_ORDER_FAILURE:
      return {...state, loading: false, createOrderSuccess: false, error: action.payload};

    case GET_USER_ORDERS_SUCCESS:
      return {...state, loading: false, orders: action.payload};

    case GET_USER_ORDERS_FAILURE:
      return {...state, loading: false, error: action.payload};      

    case GET_ADMIN_ORDERS_SUCCESS:
      return {...state, loading: false, orders: action.payload};

    case GET_ADMIN_ORDERS_FAILURE:
      return {...state, loading: false, error: action.payload};
    
    case 'SUBMIT_FEEDBACK_SUCCESS':
      return {...state, loading: false, feedback: action.payload};

    case 'SUBMIT_FEEDBACK_FAILURE':
      return {...state, loading: false, error: action.payload};
    
    case 'GET_FEEDBACK_BY_ORDERID_SUCCESS':
      return {...state, loading: false, feedbackbyOrderId: action.payload.feedback};

    case 'GET_FEEDBACK_BY_ORDERID_FAILURE':
      return {...state, loading: false, error: action.payload};

  	default:
    	return state;
  }
}