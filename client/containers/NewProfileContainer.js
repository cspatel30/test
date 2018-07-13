import { connect } from 'react-redux'
import NewProfilePage from '../components/newProfile/NewProfilePage.jsx'
import {getMyProfileDetails} from '../actions/auth2'


const mapStateToProps = (state) => {
	const myProfileData = state
	return myProfileData;
}

const mapDispatchToProps = (dispatch) => {
	return {
		getMyProfileInfo: () => {
			dispatch(getMyProfileDetails());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProfilePage);