import { connect } from 'react-redux'
import InspectorPublicProfilePage from '../components/pages/InspectorPublicProfilePage.jsx';

import { getPublicProfile } from '../actions/inspector';


const mapStateToProps = (state) => {
	const { userProfile, inspectorPublicProfile, error } = state;
  	return { userProfile, inspectorPublicProfile, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getInspectorPublicProfile: (userId) => {
       		dispatch(getPublicProfile(userId));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorPublicProfilePage);