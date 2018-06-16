import React, { Component } from "react";

class PaymentDetails extends React.Component {

  state = {
    card: true
  }

  render() {
    return (
      <div className="informationText">
        <div className="row mt-5 mb-4">
          <div className="col-12">
            <span className="subHeadlineText">Payment Options</span>
          </div>
        </div>
        <div className="row">
          <div className="col-6" style={{ borderRight: '1px solid gray' }}>
            <input type="radio" name="card" value="card" className="paymentOptions mb-4" checked={this.state.card} onChange={() => { this.setState({ card: !this.state.card }) }} /> Debit/Credit Card
              <div className="card paymentCardStyles">
              <div className="row">
                <label className="col-12 col-md-6">Card Number</label>
                <div className="col-12 col-md-6">{this.props.cardDetails.card_number}</div>
              </div>
              <div className="row">
                <label className="col-12 col-md-6">Expiration Date</label>
                <div className="col-12 col-md-6">{this.props.cardDetails.expiry_date}</div>
              </div>
              <div className="row">
                <label className="col-12 col-md-6">Name Of Card Holder</label>
                <div className="col-12 col-md-6">{this.props.cardDetails.card_holder_name}</div>
              </div>
            </div>
            <span style={{ float: 'right', padding: 20, color: 'red' }}>+ Add New Card</span>
          </div>
          <div className="col-6">
            <input className="paymentOptions mb-4" type="radio" name="paypal" value="paypal" checked={!this.state.card} onChange={() => { this.setState({ card: !this.state.card }) }} /> Pay with Paypal
            <br />
            <div className="paypalImageBox align-items-center">
              <img src="../../resources/paypal.png" className="paypalImage" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PaymentDetails;
