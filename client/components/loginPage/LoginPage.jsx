import React, { Component } from 'react';
import Select from 'react-select';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './LoginPage.scss';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      xyz: ''
    };
  }

  renderForm() {
    return (
      <div className="form-wrap">
        <form onSubmit={this.handleSubmit} action="/" method="post">
        <p className="h4 text-blue mb-4 loginTitle">Select Client or Inspector</p>
                    <div className="position-relative mDivider">
                        <div className="divider" />
                        <div className="triangle-down" />
                    </div>
          <div className="form-row justify-content-between">
          <div className="d-flex loginType pt-3 pl-0">
                        <div>
                            <input className="with-gap" type="radio" name="gender" id="client" defaultChecked />
                            <label htmlFor="client">Client</label>
                        </div>
                        <div className="pl-4">
                            <input className="with-gap" type="radio" name="gender" id="inspector" />
                            <label htmlFor="inspector">Inspector</label>
                        </div>
                    </div>
                   
                    <div className="input-group col-12">
                      <div className="input-group-prepend">
                        <div className="input-group-text"><img className="prefix grey-text" src="/public/img/at.png" alt=""/></div>
                      </div>
                      <input type="text" className="form-control" id="" placeholder="Your Email" />
                    </div>
                 
                   <div className="input-group col-12">
                    <div className="input-group-prepend">
                      <div className="input-group-text"> <img className="prefix grey-text" src="/public/img/key.png" alt=""/></div>
                    </div>
                    <input type="text" className="form-control" id="" placeholder="Your Password" />
                  </div>
          </div>
          <div className="row align-items-center mx-0 mt-5">
                        <div className="mr-auto">
                            <div className="d-flex align-items-center mr-auto">
                                <input type="checkbox" className="filled-in mr-2" name="tech" id="js" />
                                <label className="mt-9" htmlFor="js">Remember me</label>
                            </div>
                            <div className="forgotPass">
                                <a className="logincolor" href>Forgot Password?</a>
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
    )
  }
  render() {
    return (
      <div className="loginpagewrap">
        <div className="section bg-gray">
          <div className="container">
            <div className="inspection-quote-wrap row">
              <div className="col-md-5 loginImageSec">
                <div className="logoTrans text-center p-5">
                  <img src="/public/img/LogoWhite.png" alt />
                </div>
                <div className="text-center text-white pt-5">
                  Login to
                    <br />ShipInspectors.com
                </div>
              </div>
              <div className="col-md-7 bg-white loginFormSec p-5 position-relative">
                {this.renderForm()}
              </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;