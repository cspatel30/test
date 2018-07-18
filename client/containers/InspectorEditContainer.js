import { connect } from 'react-redux'
import InspectorEditProfile from '../components/InspectorEditProfile/InspectorEditProfile';

import { getInspectors} from '../actions/inspector';

const mapStateToProps = (state) => {
	const { userProfile, inspectors, inspectorPageNo, error } = state;
  	return { userProfile, inspectors, inspectorPageNo, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getInspectors: (pageNo) => {
      dispatch(getInspectors(pageNo));
    }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorEditProfile);