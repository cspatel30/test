import React, { Component } from 'react';
import { Link } from 'react-router-link'

export default class LoginPage extends Component {

  constructor(props) {
    super(props);
  } 
  
  render() {

      return (
        <div className="section">
              <div className="container">
                  <div className="row mt-5">
                      <div className="col-md-5 loginImageSec">
                          <div className="logoTrans text-center p-5">
                              <img src="/public/img/LogoWhite.png" alt />
                          </div>
                          <div className="text-center text-white pt-5">
                              Login to<br />ShipInspectors.com
                          </div>
                      </div>
                      <div className="col-md-7 loginFormSec p-5 position-relative">
                          {/* Material form login */}
                          <form>
                              <p className="h4 text-blue text-left mb-4 loginTitle">Select Client or Inspector</p>
                              <div className="position-relative mDivider">
                                  <div className="divider" />
                                  <div className="triangle-down" />
                              </div>
                              <div className="d-flex loginType pt-3">
                                  <div>
                                      <input type="radio" id="client" name="radio-group" defaultChecked />
                                      <label className="lablePlaceholder" htmlFor="client">Client</label>
                                  </div>
                                  <div className="pl-4">
                                      <input type="radio" id="inspector" name="radio-group" />
                                      <label className="lablePlaceholder" htmlFor="inspector">Inspector</label>
                                  </div>
                              </div>
                              {/* Material input email */}
                              <div className="md-form">
                                  <img className="prefix grey-text" src="/public/img/at.png" alt />
                                  <input type="email" id="materialFormLoginEmailEx" className="form-control" />
                                  <label htmlFor="materialFormLoginEmailEx">Your email</label>
                              </div>
                              {/* Material input password */}
                              <div className="md-form">
                                  <img className="prefix grey-text" src="/public/img/key.png" alt />
                                  <input type="password" id="materialFormLoginPasswordEx" className="form-control" />
                                  <label htmlFor="materialFormLoginPasswordEx">Your password</label>
                              </div>
                              <div className="row align-items-center mx-0">
                                  <div className="mr-auto">
                                      <div className="d-flex align-items-center mr-auto">
                                          <input type="checkbox" className="checkbox" />
                                          <label htmlFor="checkbox">Remember me</label>
                                      </div>
                                      <div className="forgotPass">
                                          <a href>Forgot Password?</a>
                                      </div>
                                  </div>
                                  <div className="text-center">
                                      <button type="button" className="btn btn-outline-pink loginBtn">LOGIN</button>
                                  </div>
                              </div>
                          </form>
                          {/* Material form login */}
                          <div className="position-absolute loginBtm w-100 py-5">
                              <div className="toSignUp daj">
                                  <img className="pr-2" src="/public/img/signUpArrow.png" alt /> Don’t have an account?
                                  <a href="/register/"> Sign Up</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}