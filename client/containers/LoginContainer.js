import { connect } from 'react-redux'
import Login from '../components/pages/LoginPage.jsx';

import { login } from '../actions/auth';


const mapStateToProps = (state) => {
	const { userToken, userProfile, error } = state;
  	return {userToken, userProfile, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
		logMeIn: (tabIndex, payload) => {
			payload['userType'] = tabIndex == 0 ? 'customer': 'inspector';
       		dispatch(login(payload));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);