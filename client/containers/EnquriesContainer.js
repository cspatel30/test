import ManageMainPage from '../components/manageEnquries/ManageMainPage.jsx';
import { connect } from 'react-redux'
import { getAllEnquiries } from '../actions/newEnquiry'


const mapStateToProps = (state) => {
    //console.log("redux inspectors"+JSON.stringify(state.authReducer))
    const allEnquriesData = state
  	return allEnquriesData;
  //  console.log(" inspectors"+JSON.stringify(state)
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllEnquiries: () => {
       		dispatch(getAllEnquiries());
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageMainPage);