import { connect } from 'react-redux'

import SettingPage from '../components/myAccount/setting/SettingPage';
import {changeUserPassword} from '../actions/customerAccount';
const mapStateToProps = (state) => {
	const {userProfile, error} = state;
  	return  {userProfile, error};
}

const mapDispatchToProps = (dispatch) => {
	return {
		changeUserPassword: (values) => {dispatch(changeUserPassword(values))}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);