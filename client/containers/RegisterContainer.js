import { connect } from 'react-redux'
import Register from '../components/registerPage/RegisterPage.jsx';

import { register } from '../actions/auth';
// require('../../service/constants');

// onSubmit(e){
// 	//build form body
// 	e.preventDefault();

// 	var formBody = [];
// 	formBody.push("question=" + encodeURIComponent(this.refs.question.value));
// 	formBody.push("answer=" + encodeURIComponent(this.refs.answer.value));
// 	formBody.push("cat=" + encodeURIComponent(this.refs.cat.value));

// 	formBody = formBody.join("&");

// 	//do fetch call
// 	fetch('/apiConfig.url/user/sign-up',{
// 		method:'post',
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/x-www-form-urlencoded'
// 		},
// 		body: formBody
// 	})
// 		.then((response)=>response.json())
// 		.then((status)=>{
// 			console.log(JSON.stringify(status))
// 			if(status.code===200){
// 				alert("FAQ submitted")
// 				//or redirect to thank you page
// 				//clear fields now

// 				this.refs.question.value='';
// 				this.refs.answer.value='';
// 				this.refs.cat.value='';
// 				//.. clear other fields
// 			}
// 			else
// 			{
// 				alert("Failed to submit" + status.message)
// 			}
// 		})
// 		.catch((err)=>{
// 			alert("Error to submit: " + JSON.stringify(err))
// 		})
// }
const mapStateToProps = (state) => {
	const { userToken, userProfile, signUpSuccess, error, ports, countries, vesselTypes, inspectorPositions, inspectorQualifications, regionCodes, inspectionTypes, inspectorCompany } = state;
  	return {userToken, userProfile, signUpSuccess, error, ports, countries, vesselTypes, inspectorPositions, inspectorQualifications, regionCodes, inspectionTypes, inspectorCompany };
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (type, payload) => {
			payload['type'] = type;
       		dispatch(register(payload));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);