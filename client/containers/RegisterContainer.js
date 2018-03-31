import { connect } from 'react-redux'
import Register from '../components/pages/RegisterPage.jsx';

import { register } from '../actions/auth';


const mapStateToProps = (state) => {
	const { userToken, userProfile, signUpSuccess, error, ports, countries, vesselTypes, inspectorPositions, inspectorQualifications, regionCodes, inspectionTypes } = state;
  	return {userToken, userProfile, signUpSuccess, error, ports, countries, vesselTypes, inspectorPositions, inspectorQualifications, regionCodes, inspectionTypes};
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (type, payload) => {
			payload['type'] = type;
       		dispatch(register(payload));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);