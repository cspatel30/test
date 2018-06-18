// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import VirtualizedSelect from 'react-virtualized-select';

import TermsPage from './TermsPage.jsx';

export default class SetupAccountPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      requestToken: this.props.match.params.requestToken,
      setupAccountSuccess: false,
      setupAccountErrorMsg: "",
      termsAgreed: false,
      termsOpen: false,
      form: {
        name: "",        
        password: "",
        confirmpassword: ""
      },
      formError: {
        name: "",        
        password: "",
        confirmpassword: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAgreementCheckBox = this.toggleAgreementCheckBox.bind(this);
    this.handleAgreementPopupOpen = this.handleAgreementPopupOpen.bind(this);
    this.handleAgreementPopupClose = this.handleAgreementPopupClose.bind(this);
   
  } 

  componentWillReceiveProps(props) {
    if(props.setupAccountSuccess) {
      this.setState((state) => { state.setupAccountSuccess = props.setupAccountSuccess; state.setupAccountErrorMsg = "";});
    }
    if(props.error) {
      this.setState((state) => { state.setupAccountErrorMsg = props.error; state.setupAccountSuccess = false;});
    }
  }

  handleInputChange (event) {
    event.persist();
    this.setState((state) => { state.form[event.target.name] = event.target.value });
  }

  handleAgreementPopupOpen () {
    this.setState((state) => { state.termsOpen = true});
  }

  handleAgreementPopupClose () {
    this.setState((state) => { state.termsOpen = false, state.termsAgreed = true});
  }

  toggleAgreementCheckBox (event) {
    event.persist();
    this.setState((state) => { state.termsAgreed = event.target.checked});
  }

  handleSubmit(event) {

    event.preventDefault();
    var error = false;
    var formError = { name: "", password: "", confirmpassword: ""}

    if(this.state.form.name == "") {
      error = true;
      formError.name = "This field is mandatory";
    }

    if(this.state.form.password == "") {
      formError.password = "This field is mandatory";
      error = true;
    }

    if(this.state.form.confirmpassword == "") {
      formError.confirmpassword = "This field is mandatory";
      error = true;
    }

    if(this.state.form.password != "" && this.state.form.confirmpassword != "" && 
      this.state.form.password !== this.state.form.confirmpassword) {
      error = true;
      formError.confirmpassword = "Both passwords do not match";
    }

    if(error) { 
      this.setState( (state) => { state.formError = formError; state.setupAccountSuccess = false;});
      return;
    }

    this.setState((state) => { state.setupAccountErrorMsg = ""; state.formError = formError; });

    if(!this.state.termsAgreed) {
      alert("Please agree to terms and conditions");
      return;
    }

    this.props.setupAccount(this.state.requestToken, this.state.form);
  }

  render() {

  	const { userToken , userProfile } = this.props;

  	if(userToken && userProfile) {
  		this.props.history.push('/');
  	}

  	if(this.state.setupAccountSuccess) {
  		return (
          <div className="page">
          	<div className="success">You account has been setup successfully. Please login to access your acccount.</div>
          </div>
        );
  	} else {
  		const actions = [<FlatButton label="I Agree" primary={true} onClick={this.handleAgreementPopupClose}/>];

		return (
          <div className="page">
          	<h1>Setup Your Account</h1>
          	<div className="login-page">
          	  <form className="contact-form"  onSubmit={this.handleSubmit} action="/" method="post">
          	    <div className="error">{this.state.setupAccountErrorMsg}</div>	
          		<div className="label">Full Name</div>
                <div className="field">  
                  <input className="inputField" type="text" placeholder="name" name="name" value={this.state.form.name} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.formError.name}</div>
                </div>  
                <div className="label">Password</div>
                <div className="field">  
                  <input className="inputField" type="password" placeholder="password" name="password" value={this.state.form.password} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.formError.password}</div>
                </div>
                <div className="label">Re-Enter Password</div>
                <div className="field">  
                  <input className="inputField" type="password" placeholder="confirmpassword" name="confirmpassword" value={this.state.form.confirmpassword} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.formError.confirmpassword}</div>
                </div> 
                <div className="label">
              		<input className="checkbox" type="checkbox" checked={this.state.termsAgreed} onChange={this.toggleAgreementCheckBox}/>
                	&nbsp; &nbsp; I agree with all <a className="link" onClick={this.handleAgreementPopupOpen}>Terms & Conditions</a>
            	</div>
                <div className="btn"><button>Setup</button></div>
              </form>
              <Dialog title="" modal={true} open={this.state.termsOpen} actions={actions} autoScrollBodyContent={true}>
            	<div className="register-terms">
                	<TermsPage/>
            	</div>
          		</Dialog>
          	</div>
          </div>
	    );
	}
  }
}