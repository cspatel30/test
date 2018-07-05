import { connect } from 'react-redux'
import AdminEnquiryPage from '../components/admin/enquiry/AdminEnquiryPage.jsx';

import { getCustomerEnquiries, cancelEnquiry, updateEnquiryQuote, 
          searchInspectorsForEnquiry, assignInspectorsForEnquiry } from '../actions/enquiry';

import { enquiryMarkupSaveSettings } from '../actions/admin';

const mapStateToProps = (state) => {
	const { userProfile, error, enquiries, enquiryQuoteUpdated, enquiryInspectorMatches, adminReducer } = state;
  	return {userProfile, error, enquiries, enquiryQuoteUpdated, enquiryInspectorMatches, adminReducer};
}

const mapDispatchToProps = (dispatch) => {
	return {
		  getCustomerEnquiries: () => {
       		dispatch(getCustomerEnquiries('admin'));
    	},
    	cancelEnquiry: (enquiryId) => {
    		dispatch(cancelEnquiry(enquiryId));
    	},
      updateEnquiryQuote: (enquiryId, quoteDetails) => {
        dispatch(updateEnquiryQuote(enquiryId, quoteDetails));
      },
      searchInspectorsForEnquiry: (enquiryId) => {
        dispatch(searchInspectorsForEnquiry(enquiryId));
      },
      assignInspectorsForEnquiry: (enquiryId, inspectorIds) => {
        dispatch(assignInspectorsForEnquiry(enquiryId, inspectorIds));
      },
      enquiryMarkupSaveSettings: (enquiryMarkup) => {
         dispatch(enquiryMarkupSaveSettings(enquiryMarkup));
      }

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEnquiryPage);