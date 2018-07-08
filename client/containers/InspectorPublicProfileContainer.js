import { connect } from 'react-redux'
// import InspectorPublicProfilePage from '../components/pages/InspectorPublicProfilePage.jsx';
import InspectorPublicProfilePage from '../components/pages/InspectorProfilePage1.jsx';

import { getPublicProfile } from '../actions/inspector';


const mapStateToProps = (state) => {
	const { userProfile, inspectorPublicProfile, ports, error, bool } = state;
	const inspectorProfile = inspectorPublicProfile;
  	return { userProfile, inspectorProfile, ports, error, bool };
}

const mapDispatchToProps = (dispatch) => {
	return {
		getInspectorPublicProfile: (userId) => {
       		dispatch(getPublicProfile(userId));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorPublicProfilePage);