import { connect } from 'react-redux'

import ProfilePage from '../components/myAccount/profile/ProfilePage';
import { updateUserProfile } from '../actions/customerAccount';

const mapStateToProps = (state) => {
	const {userProfile, error} = state;
  	return  {
          userProfile
        };
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateUserProfile: (userProfile) => {dispatch(updateUserProfile(userProfile));}		
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);