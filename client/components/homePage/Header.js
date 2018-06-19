import _ from 'lodash';
import React, { Component } from 'react';
import './Header.scss';
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
  <div className="header-wrapper d-flex align-items-center justify-content-between px-5">
    <div className="logo mx-2"><img src="../../resources/headerLogo.jpg" alt="#logo"/></div>
    <div className="nav-wrap d-flex align-items-center">
        <div className="mx-3 pointer">HOW IT WORKS</div>
        <div className="mx-3 pointer">CONTACT US</div>
        <div className="mx-3 pointer" onClick={()=>{this.props.history.push('/login')}}><i className="fa fa-sign-in mr-1" aria-hidden="true" />LOGIN</div>
        <div className="mx-3 pointer" onClick={()=>{this.props.history.push('/register')}}><i className="fa fa-pencil-square-o mr-1" aria-hidden="true" />SIGN UP</div>
        <div className="mx-2 pointer" onClick={()=>{this.props.history.push('/newprofile')}}><button type="button" className="btn btn-head btn-pink">PROFILE</button></div>
        <div className="mx-2 pointer"><button type="button" className="btn btn-head btn-white">INSPECTION ENQUIRY</button></div>
    </div>
  </div>
    )
  }    
}

export default withRouter(Header);

