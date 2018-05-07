// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      forgot: false,
      forgotEmail: '',
      fgpwdMsg: '',
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
  componentWillReceiveProps(nextProps) {
    this.setState({ fgpwdMsg: nextProps.fgpwdMsg });
  }
  handleInputChange (event) {
    event.persist();
    this.setState((state) => { state.loginForm[event.target.name] = event.target.value });
  }
  toggleTab (tab) {
    let { activeTab, fgpwdMsg, forgot, forgotEmail } = this.state;
    if (activeTab !== tab) {
      fgpwdMsg = '', forgot=false, forgotEmail='';
    }
    this.setState({ activeTab: tab, fgpwdMsg, forgot, forgotEmail });
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
  forgotPwd() {
    const { activeTab, forgot, forgotEmail, fgpwdMsg } = this.state;
    if (!forgot) {
      return <div className="forgot-pass" onClick={() => this.setState({ forgot: true })} style={{ color: '#1475af', fontSize: '16px', cursor: 'pointer' }}>Forgot Password ?</div>
    } else {
      return (
        <div>
          <div className="label">Enter Your Registered Email</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="field" style={{ margin: 0}}>
              <input className="inputField" type="text" placeholder="Enter Your Registered Email" name="forgotEmail" value={forgotEmail} onChange={e => this.setState({ forgotEmail: e.target.value })}/>
              <div className="errorField">{fgpwdMsg}</div>
            </div>
            <div onClick={() => this.onForgotPass(forgotEmail)} style={{cursor: 'pointer', padding: '15px', marginLeft: '15px', background: '#1475af', color: '#fff'}}>Reset</div>
            <div onClick={() => this.setState({forgot: false, forgotEmail: '', fgpwdMsg: ''})} style={{cursor: 'pointer', padding: '15px', marginLeft: '15px', background: '#1475af', color: '#fff'}}>Cancel</div>
          </div>
        </div>
      )
    }
  }
  onForgotPass(email) {
    if (email !== '') {
      this.props.forgotPassword(email);
    }
    return;
  }

  render() {
    const { activeTab, forgot } = this.state;
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
                    <Tab style={activeTab === 'cust' ? activeTabStyle : {}} onClick={() => this.toggleTab('cust')}>Client</Tab>
                    <Tab style={activeTab === 'insp' ? activeTabStyle : {}} onClick={() => this.toggleTab('insp')}>Inspector</Tab>
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
                  {this.forgotPwd()}
                  <div style={{ color: '#1475af', fontSize: '16px' }}><Link to="/register/">New User <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>SIGN UP.</span></Link></div>
                </div>
                <div className="btn"><button type="submit" style={{ cursor: forgot && 'not-allowed'}} disabled={forgot}>Login</button></div>
              </form>
            </div>
            <div className="ship-inspector-logo">
              <a href="/"><img alt="ShipInspector" src="https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/shipinspectors-logo.png" width="150" height="150" style={{ float: 'right'}}/></a>
            </div>
          </div>
      );
  }
}