import { connect } from 'react-redux'

import BillingPage from '../components/myAccount/billing/BillingPage';
import {updateUserProfile} from '../actions/customerAccount';

const mapStateToProps = (state) => {
	const {userProfile} = state;
      return  {
          userProfile,
          cardDetails: {card_number: 'xxxx xxxx xxxx 1234', expiry_date: '02/2025', card_holder_name: 'XYZ'}
        };
}

const mapDispatchToProps = (dispatch) => {
	return {
    updateUserProfile: (userProfile) => {dispatch(updateUserProfile(userProfile))}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingPage);