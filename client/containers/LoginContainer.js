import { connect } from 'react-redux'
import Login from '../components/pages/LoginPage.jsx';

import { login, forgotPassword } from '../actions/auth';


const mapStateToProps = (state) => {
	const { userToken, userProfile, error, fgpwdMsg  } = state;
  	return {userToken, userProfile, error, fgpwdMsg  };
}

const mapDispatchToProps = (dispatch) => {
	return {
		logMeIn: (tabIndex, payload) => {
			payload['userType'] = tabIndex == 0 ? 'customer': 'inspector';
       		dispatch(login(payload));
		},
		forgotPassword: (email) => {
       		dispatch(forgotPassword(email));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);