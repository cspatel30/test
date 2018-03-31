
import { connect } from 'react-redux'
import UserOrdersPage from '../components/pages/UserOrdersPage.jsx';

import {getUserOrders} from '../actions/order';

const mapStateToProps = (state) => {
	const { userProfile, error, orders } = state;
  	return {userProfile, error, orders };
}

const mapDispatchToProps = (dispatch) => {
	return {	
      getUserOrders: () => {
        dispatch(getUserOrders());
      }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrdersPage);