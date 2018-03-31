import { connect } from 'react-redux'
import CustomerEnquiriesPage from '../components/pages/CustomerEnquiriesPage.jsx';

import { getCustomerEnquiries, cancelEnquiry, acceptRejectEnquiryQuote } from '../actions/enquiry';
import {createOrder} from '../actions/order';

const mapStateToProps = (state) => {
	const { userProfile, error, enquiries, createOrderSuccess, createdOrder } = state;
  	return {userProfile, error, enquiries, createOrderSuccess, createdOrder};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCustomerEnquiries: (userType) => {
       		dispatch(getCustomerEnquiries(userType));
    	},
    	cancelEnquiry: (enquiryId) => {
    		dispatch(cancelEnquiry(enquiryId));
    	},
      updateEnquiryQuoteRequest: (enquiryId, accepted) => {
        dispatch(acceptRejectEnquiryQuote(enquiryId, accepted));
      },
      createOrder: (enquiryId, inspectorId) => {
        dispatch(createOrder(enquiryId, inspectorId));
      }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEnquiriesPage);