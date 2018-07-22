import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './LoginPage.scss';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const customContentStyle = {
  width: '100%',
  maxWidth: 450,
};
export default class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      loginForm: {
        email: "",
        password: "",
      },
      loginFormError: {
        email: "",
        password: ""
      }      
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  } 
  componentWillReceiveProps(nextProps) {
    if(nextProps.loginData.data){
      if(nextProps.loginData.data.userType=='I'){
        console.log("Inspector")
        this.props.history.push('/newprofile')
      }else{
        console.log("Customer")
        this.props.history.push('/')
      }
    }
    this.setState({ fgpwdMsg: nextProps.fgpwdMsg });
  }

  handleInputChange (event) {
    event.persist();
    console.log(" name "+JSON.stringify(event.target.name))
    console.log("value "+JSON.stringify(event.target.value))
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
    this.props.logMeIn(this.state.loginForm);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  // forgotPwd() {
  //   const { activeTab, forgot, forgotEmail, fgpwdMsg } = this.state;
  //   if (!forgot) {
  //     return <div className="forgot-pass" onClick={() => this.setState({ forgot: true })} style={{ color: '#1475af', fontSize: '16px', cursor: 'pointer' }}>Forgot Password ?</div>
  //   } else {
  //     return (
  //       <div>
  //         <div className="label">Enter Your Registered Email</div>
  //         <div style={{ display: 'flex', alignItems: 'center' }}>
  //           <div className="field" style={{ margin: 0}}>
  //             <input className="inputField" type="text" placeholder="Enter Your Registered Email" name="forgotEmail" value={forgotEmail} onChange={e => this.setState({ forgotEmail: e.target.value })}/>
  //             <div className="errorField">{fgpwdMsg}</div>
  //           </div>
  //           <div onClick={() => this.onForgotPass(forgotEmail)} style={{cursor: 'pointer', padding: '15px', marginLeft: '15px', background: '#1475af', color: '#fff'}}>Reset</div>
  //           <div onClick={() => this.setState({forgot: false, forgotEmail: '', fgpwdMsg: ''})} style={{cursor: 'pointer', padding: '15px', marginLeft: '15px', background: '#1475af', color: '#fff'}}>Cancel</div>
  //         </div>
  //       </div>
  //     )
  //   }
  // }

  render() {
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
  	const { userToken , userProfile } = this.props;
  	if(userToken && userProfile) {
  		this.props.history.push('/');
    }
    
	return (
    <div className="section bg-gray loginSec">
      <div>
        <Dialog
          title="Enter Your Registered Email"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          <TextField
            hintText="Email"
          /><br />
        </Dialog>
      </div>
      <div className="container">
          <div className="row col-md-10 mx-auto mt-5">
              <div className="col-md-5 loginImageSec">
                  <div className="logoTrans text-center p-5">
                      <img src="/public/img/LogoWhite.png" alt />
                  </div>
                  <div className="text-center text-white pt-5">
                      Login to
                      <br />ShipInspectors.com
                  </div>
              </div>
              <div className="col-md-7 loginFormSec p-5 position-relative">
                
                  <form onSubmit={this.handleSubmit} action="/" method="post">
                      <p className="h4 text-blue mb-4 loginTitle">Select Client or Inspector</p>
                      <div className="position-relative mDivider">
                          <div className="divider" />
                          <div className="triangle-down" />
                      </div>
                      <div className="d-flex loginType pt-3 pl-0" style={{paddingBottom:"35px"}}>
                          <div>
                              <input className="with-gap" type="radio" name="gender" id="client" defaultChecked />
                              <label htmlFor="client">Client</label>
                          </div>
                          <div className="pl-4">
                              <input className="with-gap" type="radio" name="gender" id="inspector" />
                              <label htmlFor="inspector">Inspector</label>
                          </div>
                      </div>
                    
                      <div className="input-field">
                          <img className="prefix grey-text" src="/public/img/at.png" alt />
                          <input id="email" type="text" name="email"  value={this.state.loginForm.email} onChange={this.handleInputChange} placeholder="Email" />
                          {/* <label htmlFor="email">Email Address</label> */}
                          <div className="errorField">{this.state.loginFormError.email}</div>
                      </div>
                  
                      <div className="input-field">
                          <img className="prefix grey-text" src="/public/img/key.png" alt />
                          <input id="password" name="password" type="password" value={this.state.loginForm.password} onChange={this.handleInputChange} placeholder="Password" />
                          {/* <label htmlFor="password">Password</label> */}
                          <div className="errorField">{this.state.loginFormError.password}</div>
                      </div>
                      <div className="row align-items-center mx-0">
                          <div className="mr-auto">
                            <div className="d-flex align-items-center mr-auto ">
                              <input   type="checkbox" value="value1"/>
                              <label   className="W-100"for="styled-checkbox-1">Remeber Me</label>
                            </div>
                              <div className="forgotPass">
                                <span className="pointer " style={{color: "#e24f7c"}} onClick={this.handleOpen}>Forgot Password ?</span>
                              {/* <RaisedButton label="Modal Dialog" onClick={this.handleOpen} /> */}
                              {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                              Forgot Password?
                            </button> */}
                              </div>
                          </div>
                          <div className="text-center">
                              <input type="submit" defaultValue="Login" className="btn btn-outline-pink loginBtn" />
                          </div>
                      </div>
                  </form>
                
                  <div className="position-absolute fixedBtm w-100 col-md-12 pl-1 pr-2 pb-1">
                      <div className="toSignUp fixedBtmBg daj py-4">
                          <img className="pr-2" src="/public/img/signUpArrow.png" alt /> Don’t have an account? 
                          <Link className="logincolor" to="/register/"> Sign Up 
                    </Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
      );
  }
}