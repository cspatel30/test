import { connect } from 'react-redux'
import Login from '../components/loginPage/LoginPage.jsx';
import {login,makeRequest } from '../actions/auth2';

const mapStateToProps = (state) => {
	console.log("LOGIN DATA"+JSON.stringify(state))
	const { userToken, userProfile, error, fgpwdMsg  } = state;
  	return {userToken, userProfile, error, fgpwdMsg  };
}

const mapDispatchToProps = (dispatch) => {
	return {
		logMeIn: (payload,method,api) => {
			//payload['userType'] = tabIndex == 0 ? 'customer': 'inspector';
       		dispatch(login(payload,method,api));
		},
		forgotPassword: (email) => {
       		dispatch(forgotPassword(email));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);