import { connect } from 'react-redux'
import InspectorsPage from '../components/pages/InspectorsPage.jsx';

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

export default connect(mapStateToProps, mapDispatchToProps)(InspectorsPage);