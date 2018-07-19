import { connect } from 'react-redux'
import InspectorDashboardPage from '../components/inspectorDashboard/InspectorDashboardPage.jsx';
import { getAllInspectors } from '../actions/newInspector'


const mapStateToProps = (state) => {
    //console.log("redux inspectors"+JSON.stringify(state.authReducer))
    const allInspectorsData = state.inspectorReducer.getListInspectors.data
  	return allInspectorsData;
  //  console.log(" inspectors"+JSON.stringify(state))
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllInspectors: () => {
       		dispatch(getAllInspectors());
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorDashboardPage);