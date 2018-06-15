import { connect } from 'react-redux'
import ProposalPage from '../components/pages/ProposalPage.jsx';

import { getCustomerEnquiries, cancelEnquiry, acceptRejectEnquiryQuote } from '../actions/enquiry';
import {getUserOrders} from '../actions/order';

const mapStateToProps = (state) => {
	const { userProfile, error, enquiries, orders} = state;
  	return {userProfile, error, enquiries, orders};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCustomerEnquiries: (userType) => {
       		dispatch(getCustomerEnquiries(userType));
		},
		getUserOrders: () => {
			dispatch(getUserOrders());
		  }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalPage);