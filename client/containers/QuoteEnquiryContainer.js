import { connect } from 'react-redux'
import QuoteEnquiryPage from '../components/pages/QuoteEnquiryPage.jsx';

import { createEnquiry } from '../actions/enquiry';


const mapStateToProps = (state) => {
	const { userProfile, error, createdEnquiry, ports, vesselTypes, inspectionTypes  } = state;
  	return {userProfile, error, createdEnquiry, ports, vesselTypes, inspectionTypes};
}

const mapDispatchToProps = (dispatch) => {
	return {
		submitEnquiry: (payload) => {
       		dispatch(createEnquiry(payload));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteEnquiryPage);