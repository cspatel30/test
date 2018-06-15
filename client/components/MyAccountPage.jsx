import React, { Component } from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import CustomerBillingContainer from "../containers/CustomerBillingContainer";
import CustomerSettingContainer from "../containers/CustomerSettingContainer";
import CustomerProfileContainer from "../containers/CustomerProfileContainer";
import MainHeader from "./homePage/Header";
import Footer from "./homePage/Footer";
import Header from "./myAccount/Header";

class MyAccount extends Component {
  render() {
    return (
      <div>
        <MainHeader />
        <Header {...this.props} />
        <div>
          <CustomerProfileContainer id="profile" />
          <div className="shadowDivider" id="billing" />
          <CustomerBillingContainer id="billing" />
          <div className="shadowDivider" />
          <CustomerSettingContainer id="setting" />
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyAccount;
