import ManageMainPage from '../components/manageEnquries/ManageMainPage.jsx';
import { connect } from 'react-redux'
import { getAllEnquiries } from '../actions/newEnquiry'


const mapStateToProps = (state) => {
    const allEnquriesData = state
  	return allEnquriesData;
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllEnquiries: () => {
       		dispatch(getAllEnquiries());
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageMainPage);