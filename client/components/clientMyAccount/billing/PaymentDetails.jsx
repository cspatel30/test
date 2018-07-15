import React, { Component } from "react";

class PaymentDetails extends React.Component {

  state = {
    card: true
  }

  render() {
    return (
      <div className="container informationText">
        <div className="row mt-5 mb-3">
          <div className="col-12">
            <span className="subHeadlineText">Payment Options</span>
          </div>
        </div>
        <div className="row">
          <div className="col-6" style={{ borderRight: '1px solid gray' }}>
            <input type="radio" name="card" value="card" className="paymentOptions" checked={this.state.card} onChange={() => { this.setState({ card: !this.state.card }) }} /> Debit/Credit Card
              <div className="card paymentCardStyles">
              <div className="row">
                <label className="col-12 col-md-4">Card Number</label>
                <div className="col-12 col-md-8">{this.props.cardDetails.card_number}</div>
              </div>
              <div className="row">
                <label className="col-12 col-md-4">Expiration Date</label>
                <div className="col-12 col-md-8">{this.props.cardDetails.expiry_date}</div>
              </div>
              <div className="row">
                <label className="col-12 col-md-4">Name Of Card Holder</label>
                <div className="col-12 col-md-8">{this.props.cardDetails.card_holder_name}</div>
              </div>
            </div>
            <span style={{ float: 'right', padding: 20, color: 'red' }}>+ Add New Card</span>
          </div>
          <div className="col-6">
            <input style={{ marginLeft: 50 }} className="paymentOptions" type="radio" name="paypal" value="paypal" checked={!this.state.card} onChange={() => { this.setState({ card: !this.state.card }) }} /> Paypal
            <br />
            <div className="paypalImageBox align-items-center">
              <img src="https://cdn.wccftech.com/wp-content/uploads/2016/05/paypal-earnings.png" className="paypalImage mt-5" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PaymentDetails;
