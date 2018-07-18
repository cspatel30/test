import React, { Component } from "react";
import AddressDetails from "./AddressDetails";
import PaymentDetails from "./PaymentDetails";
import CreditCard from "material-ui/svg-icons/action/credit-card";
import ArrowUpword from "material-ui/svg-icons/navigation/arrow-upward";
import '../client.scss';
class Billing extends React.Component {
  render() {
    return (
      <div className="client-wrap">
        <div className="container myAccountHeadline">
          <span>
            <CreditCard />
            <span className="headlineText">Billing Details</span>
          </span>
          <hr className="hrStyle" />
          <AddressDetails {...this.props} />
          <PaymentDetails {...this.props} />
          <div className="float-right upwordIcon">
            <a href="#" >
              <ArrowUpword />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Billing;
// good