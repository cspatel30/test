import _ from 'lodash';
import React from 'react';
import './Header.scss';

const Header = () => (
  <div className="header-wrapper d-flex align-items-center justify-content-between px-5">
    <div className="logo mx-2"><img src="../../resources/headerLogo.jpg" alt="#logo"/></div>
    <div className="nav-wrap d-flex align-items-center">
        <div className="mx-3">HOW IT WORKS</div>
        <div className="mx-3">CONTACT US</div>
        <div className="mx-3"><i className="fa fa-sign-in mr-1" aria-hidden="true" />LOGIN</div>
        <div className="mx-3"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true" />SIGN UP</div>
        <div className="mx-2"><button type="button" className="btn btn-head btn-pink">FIND INSPECTOR</button></div>
        <div className="mx-2"><button type="button" className="btn btn-head btn-white">INSPECTION ENQUIRY</button></div>
    </div>
  </div>
  );

export default Header;

