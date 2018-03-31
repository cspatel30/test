import { connect } from 'react-redux'

import ContactPage from '../components/pages/ContactPage.jsx';
import { sendContactUsEmail } from '../actions/contactus';

const mapStateToProps = (state) => {
	const {contactUsEmailSuccess, error, countries} = state;
  	return  {contactUsEmailSuccess, error, countries};
}

const mapDispatchToProps = (dispatch) => {
	return {
		sendContactUsEmail: (form) => {
       		dispatch(sendContactUsEmail(form));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);