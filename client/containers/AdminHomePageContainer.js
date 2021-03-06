import { connect } from 'react-redux'

import AdminPage from '../components/AdminPage.jsx';
import { login } from '../actions/auth';

const mapStateToProps = (state) => {
	const {userProfile, error} = state;
  	return  {userProfile, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
		logMeIn: (payload) => {
			payload['userType'] = 'admin';
       		dispatch(login(payload));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);