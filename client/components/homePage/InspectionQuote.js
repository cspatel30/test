import React, { Component } from 'react';
import './InspectionQuote.scss';

class InspectionQuote extends Component {
  constructor() {
    super();
    this.state = {
      xyz: ''
    };
  }  

  renderForm() {
    return (
      <div className="my-5">
        Hi
      </div>
    )
  }
  render() {
    return (
      <div className="inspection-quote-wrap">
        <div className="title d-flex flex-column align-items-center">
          <h1 className="mb-2">Get Inspection Quotation</h1>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
        </div>
        {this.renderForm()}
      </div> 
    );
  }
}

export default InspectionQuote;