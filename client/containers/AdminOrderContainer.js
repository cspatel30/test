
import { connect } from 'react-redux'
import AdminOrderComponent from '../components/admin/orders/AdminOrderComponent.jsx';

import {getAdminOrders} from '../actions/order';

const mapStateToProps = (state) => {
	const { userProfile, error, orders } = state;
  	return {userProfile, error, orders };
}

const mapDispatchToProps = (dispatch) => {
	return {	
        getAdminOrders: () => {
        dispatch(getAdminOrders());
      }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderComponent);