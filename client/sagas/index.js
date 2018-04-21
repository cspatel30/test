import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import performAction from './apis/api';

function* nevtopSaga() {
	yield takeLatest('INIT_APP', performAction);
	yield takeLatest('REGISTER', performAction);
	yield takeLatest('LOGIN', performAction);
	yield takeLatest('FORGOT_PASSWORD', performAction);
	yield takeLatest('VERIFY_TOKEN', performAction);
	yield takeLatest('LOGOUT', performAction);
	yield takeLatest('CREATE_ENQUIRY', performAction);
	yield takeLatest('GET_CUSTOMER_ENQUIRIES', performAction);
	yield takeLatest('CANCEL_ENQUIRY', performAction);
	yield takeLatest('GET_INSPECTOR_PROFILE', performAction);
	yield takeLatest('UPLOAD_INSPECTOR_DOC', performAction);
	yield takeLatest('DOWNLOAD_INSPECTOR_DOC', performAction);
	yield takeLatest('GET_INSPECTORS', performAction);
	yield takeLatest('GET_INSPECTOR_PUBLIC_PROFILE', performAction);
	yield takeLatest('UPDATE_ENQUIRY_QUOTE', performAction);
	yield takeLatest('SEARCH_INPECTORS_ENQUIRY', performAction);
	yield takeLatest('ASSIGN_INSPECTORS_FOR_ENQUIRY', performAction);
	yield takeLatest('ACCEPT_REJECT_ENQUIRY_QUOTE', performAction);
	yield takeLatest('UPDATE_INSPECTOR_PROFILE', performAction);
	yield takeLatest('CONTACT_US_EMAIL', performAction);
	yield takeLatest('SETUP_ACCOUNT', performAction);
	yield takeLatest('VERIFY_EMAIL', performAction);
	yield takeLatest('CREATE_ORDER', performAction);
	yield takeLatest('GET_USER_ORDERS', performAction);
	yield takeLatest('GET_ADMIN_ORDERS', performAction);
	
}

export default nevtopSaga;