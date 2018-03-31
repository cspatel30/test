import { connect } from 'react-redux'
import AdminAssignInspectorPage from '../components/admin/AdminAssignInspectorPage.jsx';

import {  searchInspectorsForEnquiry, assignInspectorsForEnquiry } from '../actions/enquiry';


const mapStateToProps = (state) => {
	const { error, currentEnquiry, enquiryInspectorMatches, inspectorAssignedSuccess } = state;
  	return { error, currentEnquiry, enquiryInspectorMatches, inspectorAssignedSuccess};
}

const mapDispatchToProps = (dispatch) => {
	return {
      searchInspectorsForEnquiry: (enquiryId) => {
        dispatch(searchInspectorsForEnquiry(enquiryId));
      },
      assignInspectorsForEnquiry: (enquiryId, inspectorIds) => {
        dispatch(assignInspectorsForEnquiry(enquiryId, inspectorIds));
      }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAssignInspectorPage);