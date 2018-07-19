import OrdersMainPage from '../components/orders/OrdersMainPage.jsx';
import { connect } from 'react-redux'
import { getJobOrders,acceptRequest,declineRequest } from '../actions/newOrder'


const mapStateToProps = (state) => {
    console.log("redux inspectors123"+JSON.stringify(state.authReducer))
    const allListJobOrders = state
	  return allListJobOrders;
  //  console.log(" inspectors"+JSON.stringify(state)
}

const mapDispatchToProps = (dispatch) => {
	return {
		allListJobOrders: () => {
       		dispatch(getJobOrders());
		},
		acceptRequest: (id) =>{
			console.log("orderContaineid"+id)
			dispatch(acceptRequest(id));
		},
		declinedRequest: (id) =>{
			dispatch(declineRequest(id));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersMainPage);