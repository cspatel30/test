import { connect } from 'react-redux'

import ActionInProgress from '../components/ActionInProgress.jsx';

const mapStateToProps = (state) => {
	const { loading } = state;
  	return  { loading } ;
}

const mapDispatchToProps = (dispatch) => {
	return {
		
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionInProgress);