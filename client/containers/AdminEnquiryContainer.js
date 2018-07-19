import { connect } from 'react-redux'
import AdminEnquiryPage from '../components/admin/enquiry/AdminEnquiryPage.jsx';

// import { getCustomerEnquiries, cancelEnquiry, updateEnquiryQuote, 
//           searchInspectorsForEnquiry, assignInspectorsForEnquiry } from '../actions/enquiry';

import { enquiryMarkupSaveSettings, getEnquiryList, getEnquiryMarkupSettings, approveQuotation, 
    upodateQuotation, deleteEnquiry, editEnquiry, resetAdminRefreshApiCall    } from '../actions/admin';

const mapStateToProps = (state) => {
    const {adminReducer, error} = state;
    const { adminEnquiryList, enquiryMarkup, adminRefreshApiList,  adminAuthToken, userProfile } = adminReducer;
    return  {userProfile, adminAuthToken, adminEnquiryList, adminRefreshApiList, enquiryMarkup, error};
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
        },
        approveQuotation: (payload) => {
            dispatch(approveQuotation(payload));
        },
        upodateQuotation: (payload) => {
            dispatch(upodateQuotation(payload));
        },
        deleteEnquiry: (payload) => {
            dispatch(deleteEnquiry(payload));
        },
        editEnquiry: (payload) => {
            dispatch(editEnquiry(payload));
        },
        resetAdminRefreshApiCall: (payload) => {
            dispatch(resetAdminRefreshApiCall(payload));
        },
        
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEnquiryPage);