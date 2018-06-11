import React, { Component } from "react";
import AddressDetails from "./AddressDetails";
import PaymentDetails from "./PaymentDetails";
import CreditCard from 'material-ui/svg-icons/action/credit-card';
import ArrowUpword from 'material-ui/svg-icons/navigation/arrow-upward';

class Billing extends React.Component {

  render() {
    return (
      <div className="container myAccountHeadline" >
        <span><CreditCard /><span className="headlineText">Billing Details</span></span>
        <hr className="hrStyle" />
        <AddressDetails {...this.props} />
        <PaymentDetails {...this.props}/>
        <div className="float-right" ><a href="#"><ArrowUpword /></a></div>
        <div className="shadowDivider" />
      </div>
    );
  }
}

export default Billing;
