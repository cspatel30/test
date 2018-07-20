import React, { Component } from 'react';
import Profile from './Profile';
import Address from './Address';
import AccountSettings from './AccountSettings';
import './InspectorMyAccount.scss';

class InspectorMyAccount extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div className="InspectorMyAccount">
        <div className="banner">
          <img className="bg" src="/public/img/banner.png" />
          <h1>MY ACCOUNT</h1>
        </div>
        <div className="row InspectorMyAccount-Form">
          <div className="col-md-4">
            <h3>PROFILE</h3>
            <Profile />
          </div>
          <div className="col-md-4">
            <h3>ADDRESS</h3>
            <Address />
          </div>
          <div className="col-md-4">
            <h3>ACCOUNT SETTING</h3>
            <AccountSettings />
          </div>
        </div>
      </div>
    )
  }
}
export default InspectorMyAccount;
