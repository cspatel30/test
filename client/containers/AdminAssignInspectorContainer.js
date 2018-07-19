import { connect } from 'react-redux'
import AdminAssignInspectorPage from '../components/admin/enquiry/AdminAssignInspectorPage.jsx';

import { getInspectorsList , assignInspector  } from '../actions/admin';

const mapStateToProps = (state) => {
    const {adminReducer, error} = state;
    const { getInspectorsList, assignInspector, adminAuthToken, userProfile } = adminReducer;
    return  {userProfile, adminAuthToken, assignInspector, getInspectorsList, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
      searchInspectorsForEnquiry: (payload) => {
        dispatch(getInspectorsList());
      },
      assignInspectorsForEnquiry: (payload) => {
        dispatch(assignInspector(payload));
      }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAssignInspectorPage);