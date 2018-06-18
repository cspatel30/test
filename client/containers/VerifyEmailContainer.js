import { connect } from 'react-redux'

import {verifyEmail} from '../actions/auth';

import VerifyEmailPage from '../components/pages/VerifyEmailPage.jsx';

const mapStateToProps = (state) => {
	const {userToken, userProfile, verifyEmailSuccess, error} = state;
  	return  {userToken, userProfile, verifyEmailSuccess, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
		verifyEmail: (requestToken) => {
			dispatch(verifyEmail(requestToken));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage);