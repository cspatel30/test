import { connect } from 'react-redux'

import AdminPage from '../components/AdminPage.jsx';
//import { login } from '../actions/auth';
import { login, updateAdminAuthToken } from '../actions/admin';

const mapStateToProps = (state) => {
	const {adminReducer, error} = state;
	const { adminAuthToken, userProfile } = adminReducer;
  	return  {userProfile, adminAuthToken, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
		logMeIn: (payload) => {console.log("payload", payload);
			//payload['userType'] = 'admin';
       		dispatch(login(payload));
		},
		updateAdminAuthToken: (payload) => {
			dispatch(updateAdminAuthToken(payload));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);