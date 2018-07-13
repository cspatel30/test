import { connect } from 'react-redux'
import Register from '../components/registerPage/RegisterPage.jsx'
import { signup } from '../actions/auth2'

const mapStateToProps = (state) => {
	const { userToken, userProfile, signUpSuccess, error, ports, countries, vesselTypes, inspectorPositions, inspectorQualifications, regionCodes, inspectionTypes, inspectorCompany } = state;
  	return {userToken, userProfile, signUpSuccess, error, ports, countries, vesselTypes, inspectorPositions, inspectorQualifications, regionCodes, inspectionTypes, inspectorCompany };
}

const mapDispatchToProps = (dispatch) => {
	return {
		registerMe: (type, payload) => {
			payload['type'] = payload.type;
       		dispatch(signup(payload));
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);