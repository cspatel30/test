import { connect } from 'react-redux'
import AdminEnquiryPage from '../components/admin/AdminEnquiryPage.jsx';

import { getCustomerEnquiries, cancelEnquiry, updateEnquiryQuote, 
          searchInspectorsForEnquiry, assignInspectorsForEnquiry } from '../actions/enquiry';


const mapStateToProps = (state) => {
	const { userProfile, error, enquiries, enquiryQuoteUpdated, enquiryInspectorMatches } = state;
  	return {userProfile, error, enquiries, enquiryQuoteUpdated, enquiryInspectorMatches};
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
      }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEnquiryPage);