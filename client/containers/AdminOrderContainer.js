
import { connect } from 'react-redux'
import AdminOrderComponent from '../components/admin/orders/AdminOrderComponent.jsx';

import {getAdminOrders} from '../actions/admin';

const mapStateToProps = (state) => {
	const {adminReducer, userProfile, error} = state;
    return  {userProfile: adminReducer.userProfile, adminOrderList: adminReducer.adminOrderList, error};
}

const mapDispatchToProps = (dispatch) => {
	return {	
        getAdminOrders: (payload) => {
        dispatch(getAdminOrders(payload));
      }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderComponent);