import { connect } from 'react-redux'
import NewProfilePage from '../components/newProfile/NewProfilePage.jsx'
import {getMyProfileDetails} from '../actions/newInspector'


const mapStateToProps = (state) => {
	console.log("MAPSTATETOPROPS: "+JSON.stringify(state.inspectorReducer))
	const  myProfileData  = state.inspectorReducer.myProfileData.data
	return  myProfileData ;
}

const mapDispatchToProps = (dispatch) => {
	return {
		getMyProfileInfo: () => {
			dispatch(getMyProfileDetails());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProfilePage);