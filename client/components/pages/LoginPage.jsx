// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
      loginForm: {
        email: "",
        password: ""
      },
      loginFormError: {
        email: "",
        password: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  } 

  handleInputChange (event) {
    event.persist();
    this.setState((state) => { state.loginForm[event.target.name] = event.target.value });
  }

  handleSubmit(event) {

    event.preventDefault();

    var error = false;

    var loginFormError = {  email: "", password: "" };

    if(this.state.loginForm.email == "") {
      error = true;
      loginFormError.email = "This field is mandatory";
    }

    if(this.state.loginForm.password == "") {
      loginFormError.password = "This field is mandatory";
      error = true;
    }

    this.setState( (state) => { state.loginFormError = loginFormError});

    if(error) 
      return;

    this.props.logMeIn(this.state.tabIndex, this.state.loginForm);

  }

  render() {

  	const { userToken , userProfile } = this.props;

  	if(userToken && userProfile) {
  		this.props.history.push('/');
  	}

	return (
          <div className="page">
          	<h1>Login</h1>
          	<div className="login-page">
              <form className="contact-form"  onSubmit={this.handleSubmit} action="/" method="post">
                <div className="error">{this.props.error}</div>
                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                  <TabList> 
                    <Tab>Customer</Tab>
                    <Tab>Inspector</Tab>
                  </TabList>
                  <TabPanel>
                    <div className="label">Email</div>
                    <div className="field">  
                      <input className="inputField" type="text" placeholder="email" name="email" value={this.state.loginForm.email} onChange={this.handleInputChange}/>
                      <div className="errorField">{this.state.loginFormError.email}</div>
                    </div>  
                    <div className="label">Password</div>
                    <div className="field">  
                      <input className="inputField" type="password" placeholder="password" name="password" value={this.state.loginForm.password} onChange={this.handleInputChange}/>
                      <div className="errorField">{this.state.loginFormError.password}</div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="label">Email</div>
                    <div className="field">  
                      <input className="inputField" type="text" placeholder="email" name="email" value={this.state.loginForm.email} onChange={this.handleInputChange}/>
                      <div className="errorField">{this.state.loginFormError.email}</div>
                    </div>  
                    <div className="label">Password</div>
                    <div className="field">  
                      <input className="inputField" type="password" placeholder="password" name="password" value={this.state.loginForm.password} onChange={this.handleInputChange}/>
                      <div className="errorField">{this.state.loginFormError.password}</div>
                    </div>
                  </TabPanel>
                </Tabs>
                <div className="btn"><button>Login</button></div>
                <div className="clear"></div>
              </form>
            </div>  

          </div>
      );
  }
}