import { connect } from 'react-redux'
import Header from '../components/Header.jsx';

import { logout } from '../actions/auth';


const mapStateToProps = (state) => {
	console.log("$TSATE: "+JSON.stringify(state))
	const { userToken, userProfile, logout } = state;
  	return {userToken, userProfile, logout};
}

const mapDispatchToProps = (dispatch) => {
	return {
    	logMeOut: () => {
    		dispatch(logout());	
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);