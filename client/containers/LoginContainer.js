import { connect } from 'react-redux'
import Login from '../components/loginPage/LoginPage.jsx';
import { login } from '../actions/auth2';

const mapStateToProps = (state) => {
	console.log("LOGIN DATA"+JSON.stringify( state.authReducer.loginData))
	const loginData=state.authReducer.loginData;
	// get authReducer's data using state.authReducer, for loginData -> state.authReducer.loginData
	// const {loginData,userToken, userProfile, error, fgpwdMsg  } = state;
	
  	return loginData;
}

const mapDispatchToProps = (dispatch) => {
	return {
		logMeIn: (payload) => {
			//payload['userType'] = tabIndex == 0 ? 'customer': 'inspector';
       		dispatch(login(payload));
		},
		forgotPassword: (email) => {
       		dispatch(forgotPassword(email));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);