// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      forgot: false,
      forgotEmail: '',
      tabIndex: 0,
      loginForm: {
        email: "",
        password: ""
      },
      loginFormError: {
        email: "",
        password: ""
      },
      activeTab: "cust"
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
  onForgotPass(email) {
    if (email !== '') {
      this.props.forgotPassword(email);
    }
    return;
  }

  render() {
    const { activeTab, forgot, forgotEmail } = this.state;
    const activeTabStyle= { background: '#1475af', color: '#fff' }
  	const { userToken , userProfile } = this.props;

  	if(userToken && userProfile) {
  		this.props.history.push('/');
    }
    
	return (
          <div className="page">
          	<div className="login-page">
              <h1>Login to ShipInspectors.com</h1>
              <form className="contact-form"  onSubmit={this.handleSubmit} action="/" method="post">
                <div className="" style={{ color: '#1475af', marginBottom: '15px', fontSize: '18px' }}>Select Client or Inspector</div>
                <div className="error">{this.props.error}</div>
                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                  <TabList> 
                    <Tab style={activeTab === 'cust' ? activeTabStyle : {}} onClick={() => this.setState({ activeTab: 'cust' })}>Client</Tab>
                    <Tab style={activeTab === 'insp' ? activeTabStyle : {}} onClick={() => this.setState({ activeTab: 'insp' })}>Inspector</Tab>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  { !forgot
                    ?
                    <div className="forgot-pass" onClick={() => this.setState({ forgot: true })} style={{ color: '#1475af', fontSize: '16px', cursor: 'pointer' }}>Forgot Password ?</div>
                    :
                    <div style={{ display: 'flex'}}>
                      <div className="field">
                        <input className="inputField" type="text" placeholder="Type your registered email" name="forgotEmail" value={forgotEmail} onChange={e => this.setState({ forgotEmail: e.target.value })}/>
                        <div className="errorField"></div>
                      </div>
                      <div onClick={() => this.onForgotPass(forgotEmail)} style={{cursor: 'pointer', padding: '10px', height: '40%', marginLeft: '15px', background: 'gray'}}>Reset</div>
                    </div>
                  }
                  <div style={{ color: '#1475af', fontSize: '16px' }}>New User <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>SIGN UP.</span></div>
                </div>
                <div className="btn"><button type="submit">Login</button></div>
              </form>
            </div>  
            <div className="ship-inspector-logo">
              <a href="/"><img alt="ShipInspector" src="https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/shipinspectors-logo.png" width="150" height="150" style={{ float: 'right'}}/></a>
            </div>
          </div>
      );
  }
}