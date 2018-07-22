
import { connect } from 'react-redux'
import AdminOrderComponent from '../components/admin/orders/AdminOrderComponent';

import {getAdminOrders} from '../actions/admin';

const mapStateToProps = (state) => {
    const {adminReducer, error} = state;
    const { adminOrderList, adminAuthToken, userProfile } = adminReducer;
    return  {userProfile, adminAuthToken, adminOrderList, error};
}

const mapDispatchToProps = (dispatch) => {
	return {	
        getAdminOrders: (payload) => {
        dispatch(getAdminOrders(payload));
      }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderComponent);