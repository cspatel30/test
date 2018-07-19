import React, { Component } from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";


// import CustomerBillingContainer from "../containers/CustomerBillingContainer";
import BillingPage from './billing/BillingPage';

// import CustomerSettingContainer from "../containers/CustomerSettingContainer";
import SettingPage from './setting/SettingPage';

// import CustomerProfileContainer from "../containers/CustomerProfileContainer";
import ProfilePage from './profile/ProfilePage';

import ClientHeader from "./ClientHeader";

class MyAccount extends Component {
  render() {
    return (
      <div>
        <ClientHeader {...this.props} />
        <div>
          <ProfilePage id="profile" {...this.props} />
          <div className="shadowDivider" id="billing" />
          <BillingPage id="billing" {...this.props} />
          <div className="shadowDivider" />
          <SettingPage id="setting" {...this.props} />
        </div>
      </div>
    );
  }
}

export default MyAccount;
