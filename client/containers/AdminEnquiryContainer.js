import { connect } from 'react-redux'
import AdminEnquiryPage from '../components/admin/enquiry/AdminEnquiryPage.jsx';

// import { getCustomerEnquiries, cancelEnquiry, updateEnquiryQuote, 
//           searchInspectorsForEnquiry, assignInspectorsForEnquiry } from '../actions/enquiry';

import { enquiryMarkupSaveSettings, getEnquiryList } from '../actions/admin';

const mapStateToProps = (state) => {
	// const { userProfile, error, adminEnquiryList, enquiryMarkup} = state;
 //  	return { userProfile, error, adminEnquiryList, enquiryMarkup};
    const {adminReducer, userProfile, error} = state;
    return  {userProfile: adminReducer.userProfile, adminEnquiryList: adminReducer.adminEnquiryList, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
		  getAdminEnquiries: (payload) => {
       		dispatch(getEnquiryList(payload));
    	},
      enquiryMarkupSaveSettings: (payload) => {
          dispatch(enquiryMarkupSaveSettings(payload));
      }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEnquiryPage);