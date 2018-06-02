import _ from 'lodash';
import React from 'react';
import './Header.scss';

const Header = () => (
  <div className="header-wrapper">
    <div className="logo mx-2"></div>
    <div className="nav-wrap d-flex">
        <div className="mx-2">HOW IT WORKS</div>
        <div className="mx-2">CONTACT US</div>
        <div className="mx-2"><i className="fa fa-sign-in mr-1" aria-hidden="true" />LOGIN</div>
        <div className="mx-2"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true" />SIGN UP</div>
        <div className="mx-2"><button type="button" class="btn">FIND INSPECTOR</button></div>
        <div className="mx-2"><button type="button" class="btn">INSPECTION ENQUIRY</button></div>
    </div>
    <div></div>
  </div>
  );

export default Header;

