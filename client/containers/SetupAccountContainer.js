import { connect } from 'react-redux'

import {setupAccount} from '../actions/auth';

import SetupAccountPage from '../components/pages/SetupAccountPage.jsx';

const mapStateToProps = (state) => {
	const {userToken, userProfile, setupAccountSuccess, error} = state;
  	return  {userToken, userProfile, setupAccountSuccess, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setupAccount: (requestToken, form) => {
			dispatch(setupAccount(requestToken, form));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupAccountPage);