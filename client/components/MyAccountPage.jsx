import React, { Component } from "react";
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import CustomerBillingContainer from '../containers/CustomerBillingContainer';
import CustomerSettingContainer from '../containers/CustomerSettingContainer';
import CustomerProfileContainer from '../containers/CustomerProfileContainer';

import Header from './myAccount/Header';

class MyAccount extends Component {

  render() {
    console.log(this.props.match)
    return (
      <div>
        <Header />
        <div>
          <CustomerProfileContainer id="profile"/>
          <CustomerBillingContainer id="billing" />
          <CustomerSettingContainer id="setting" />  
        </div>
      </div>
    );
  }
}

export default MyAccount;
