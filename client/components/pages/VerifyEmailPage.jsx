// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

export default class VerifyEmailPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      requestToken: this.props.match.params.requestToken,
      verifyEmailSuccess: false,
      verifyEmailErrorMsg: ""
    };
   
  } 

  componentWillMount() {
    if(this.state.requestToken) {
      this.props.verifyEmail(this.state.requestToken);
    }
  }

  componentWillReceiveProps(props) {
    if(props.verifyEmailSuccess) {
      this.setState((state) => { state.verifyEmailSuccess = props.verifyEmailSuccess; state.verifyEmailErrorMsg = "";});
    }
    if(props.error) {
      this.setState((state) => { state.verifyEmailErrorMsg = props.error; state.verifyEmailSuccess = false;});
    }
  }

  render() {
  	
  	const { userToken , userProfile } = this.props;

  	if(userToken && userProfile) {
  		this.props.history.push('/');
  	}

  	if(this.state.verifyEmailSuccess) {
  		return (<div className="page"><div className="success">Email verification successful! Please login to continue using ShipInspectors.</div></div>);
  	} else if(this.state.verifyEmailErrorMsg && this.state.verifyEmailErrorMsg != "") {
  		return (<div className="page"><div className="error">{this.state.verifyEmailErrorMsg}</div></div>);
  	} else {
  		return (<div className="page"></div>);
  	}
  }
}