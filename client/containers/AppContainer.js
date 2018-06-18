import { connect } from 'react-redux'

import App from '../components/App.jsx';
import { verifyToken } from '../actions/auth';
import { initApp } from '../actions/app';

const mapStateToProps = (state) => {
	const {userToken, userProfile} = state;
  	return  {userToken, userProfile};
}

const mapDispatchToProps = (dispatch) => {
	return {
		initialiseUser: (token) => {
       		dispatch(verifyToken(token));
       		dispatch(initApp());
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);