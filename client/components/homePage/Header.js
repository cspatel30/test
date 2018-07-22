import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Cookie from 'js-cookie';
import { logout } from '../../actions/auth2';
import './Header.scss';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: Cookie.get('token') || null,
      userType: Cookie.get('userType') || null,
    }
  }
  
  componentWillReceiveProps(nextProps) {
    let token, userType;
    if (this.props.auth.loginData !== nextProps.auth.loginData) {
      userType = Cookie.get('userType') || null;
      token = Cookie.get('token') || null;
      this.setState({ token: token, userType: userType });
    }
  }

  logout() {
    this.props.dispatch(logout());
    this.props.history.push('/')
  }

  renderProfileDropdown() {
    return (
      <div className="profile-head mx-3 d-flex align-items-center">
        <div className="img-wrap"><img src="https://images.firstpost.com/wp-content/uploads/2017/03/disha-patani_380.jpg" /></div>
        <div className="username mx-2">Raghav Lawaniya</div>
        <div className="dropdown">
          <i className="fa fa-angle-down pointer" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item pointer">Option 1</a>
            <a className="dropdown-item pointer">Option 2</a>
            <a className="dropdown-item pointer" onClick={() => this.logout()}>Logout</a>
          </div>
        </div>
      </div>
    )
  }

  renderOptions() {
    const { token, userType }  = this.state;
    if (token && userType) {
      if (userType === 'I') {
        return this.renderInspectorOptions();
      }
      else {
        return this.renderClientOptions();
      }
    }
    else {
      return this.renderHomeOptions();
    }
  }

  renderHomeOptions() {
    return (
      <div className="nav-wrap d-flex align-items-center">
        <div className="mx-3 pointer option">HOW IT WORKS</div>
        <div className="mx-3 pointer option">CONTACT US</div>
        <div className="mx-3 pointer option" onClick={() => { this.props.history.push('/login') }}><i className="fa fa-sign-in mr-1" aria-hidden="true" />LOGIN</div>
        <div className="mx-3 pointer option" onClick={() => { this.props.history.push('/register') }}><i className="fa fa-pencil-square-o mr-1" aria-hidden="true" />SIGN UP</div>
        <div className="mx-2 pointer" onClick={() => {}}><button type="button" className="bn-head bn-pink">FIND INSPECTOR</button></div>
        <div className="mx-2 pointer" onClick={() => {}}><button type="button" className="bn-head bn-white">INSPECTION ENQUIRY</button></div>
      </div>
    )
  }
  renderInspectorOptions() {
    return (
      <div className="nav-wrap d-flex align-items-center">
        <div className="mx-3 pointer" onClick={() => {}}><button type="button" className="bn-head bn-pink">AFFILIATE</button></div>
        <div className="mx-3 pointer option" onClick={() => { this.props.history.push('/newprofile') }}>MY PROFILE</div>
        <div className="mx-3 pointer option" onClick={() => { this.props.history.push('/enquries') }}>ENQURIES</div>
        <div className="mx-3 pointer option" onClick={() => { this.props.history.push('/orders') }}>ORDERS</div>
        <div className="mx-3 pointer option" onClick={() => {}}>REPORTS</div>
        {this.renderProfileDropdown()}
      </div>
    )
  }

  renderClientOptions() {
    return (
      <div className="nav-wrap d-flex align-items-center">
        <div className="mx-3 pointer option">HOW IT WORKS</div>
        <div className="mx-3 pointer option">CONTACT US</div>
        <div className="mx-3 pointer option">HELP</div>
        <div className="mx-2 pointer" onClick={() => {}}><button type="button" className="bn-head bn-pink">FIND INSPECTOR</button></div>
        <div className="mx-2 pointer" onClick={() => {}}><button type="button" className="bn-head bn-white">INSPECTION ENQUIRY</button></div>
        {this.renderProfileDropdown()}
      </div>
    )
  }

  render() {
    const token = this.state.token ? this.state.token : ''

    return (
      <div className="header-wrapper d-flex align-items-center justify-content-between px-5">
        <div className="logo mx-2"><img src="/public/img/headerLogo.jpg" alt="#logo" /></div>
        {this.renderOptions()}
      </div>
    )
  }
}

const select = state => ({ auth: state.authReducer });
export default withRouter(connect(select)(Header));  
