import { connect } from 'react-redux'
import AdminAssignInspectorPage from '../components/admin/enquiry/AdminAssignInspectorPage';

import { getInspectorsList , assignInspector , changeAssignInspectorStatus } from '../actions/admin';

const mapStateToProps = (state) => {
    const {adminReducer, error} = state;
    const { adminInspectorsList, assignInspectorStatus, adminAuthToken, userProfile } = adminReducer;
    return  {userProfile, adminAuthToken, assignInspectorStatus, adminInspectorsList, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
      searchInspectorsForEnquiry: (payload) => {
        dispatch(getInspectorsList(payload));
      },
      assignInspectorsForEnquiry: (payload) => {
        dispatch(assignInspector(payload));
      },
      changeAssignInspectorStatus: (payload) => {
        dispatch(changeAssignInspectorStatus(payload));
      },

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAssignInspectorPage);