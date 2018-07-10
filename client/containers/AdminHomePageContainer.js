import { connect } from 'react-redux'

import AdminPage from '../components/AdminPage.jsx';
//import { login } from '../actions/auth';
import { login } from '../actions/admin';

const mapStateToProps = (state) => {
	const {adminReducer, userProfile, error} = state;
  	return  {userProfile: adminReducer.userProfile, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
		logMeIn: (payload) => {console.log("payload", payload);
			//payload['userType'] = 'admin';
       		dispatch(login(payload));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);