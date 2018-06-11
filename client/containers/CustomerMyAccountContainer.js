import { connect } from 'react-redux'

import MyAccountPage from '../components/MyAccountPage.jsx';

const mapStateToProps = (state) => {
	const {userProfile, error} = state;
  	return  {
          userProfile, 
          error
        };
}

const mapDispatchToProps = (dispatch) => {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountPage);