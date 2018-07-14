import { connect } from 'react-redux'

import MyAccountPage from '../components/clientMyAccount/MyAccountPage.jsx';

import { updateUserProfile, changeUserPassword } from '../actions/customerAccount';

const mapStateToProps = (state) => {
	const {userProfile, error} = state;
  	return  {
          userProfile,
          cardDetails: {card_number: 'xxxx xxxx xxxx 1234', expiry_date: '02/2025', card_holder_name: 'XYZ'}, 
          error
        };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserProfile: (userProfile) => {dispatch(updateUserProfile(userProfile));},
    changeUserPassword: (values) => {dispatch(changeUserPassword(values))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountPage);