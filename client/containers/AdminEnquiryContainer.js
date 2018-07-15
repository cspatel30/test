import { connect } from 'react-redux'
import AdminEnquiryPage from '../components/admin/enquiry/AdminEnquiryPage.jsx';

// import { getCustomerEnquiries, cancelEnquiry, updateEnquiryQuote, 
//           searchInspectorsForEnquiry, assignInspectorsForEnquiry } from '../actions/enquiry';

import { enquiryMarkupSaveSettings, getEnquiryList, getEnquiryMarkupSettings  } from '../actions/admin';

const mapStateToProps = (state) => {
    const {adminReducer, error} = state;
    const { adminEnquiryList, adminAuthToken, userProfile } = adminReducer;
    return  {userProfile, adminAuthToken, adminEnquiryList, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
		  getAdminEnquiries: (payload) => {
       		dispatch(getEnquiryList(payload));
    	},
      enquiryMarkupSaveSettings: (payload) => {
          dispatch(enquiryMarkupSaveSettings(payload));
      },
      getEnquiryMarkupSettings: (payload) => {
        dispatch(getEnquiryMarkupSettings(payload));
    }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEnquiryPage);