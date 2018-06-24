import React, { Component } from 'react';
import Select from 'react-select';
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
      <div className="my-5 form-wrap">
        <form>
          <div className="form-row justify-content-between">
            <div className="input-group col-3">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-user" /></div>
              </div>
              <input type="text" className="form-control" id="" placeholder="Your Name" />
            </div>
            <div className="input-group col-3">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-phone" /></div>
              </div>
              <input type="text" className="form-control" id="" placeholder="Your Phone No." />
            </div>
            <div className="input-group col-3">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-at" /></div>
              </div>
              <input type="text" className="form-control" id="" placeholder="Your Email Address" />
            </div>
          </div>

          <div className="form-row justify-content-between">
            <div className="input-group d-flex align-items-center col-3 pr-0">
              <div className="input-group-prepend p-0 col-1">
                <div className="input-group-text"><i className="fa fa-random" /></div>
              </div>
              <Select className="field-select col-11 pr-0" id="" options={[{ value: 'one', label: 'one' }, { value: 'two', label: 'two' }]} placeholder="Inspection Type" />
            </div>
            <div className="input-group d-flex align-items-center col-3 pr-0">
              <div className="input-group-prepend p-0 col-1">
                <div className="input-group-text"><i className="fa fa-anchor" /></div>
              </div>
              <Select className="field-select col-11 pr-0" id="" options={[{ value: 'one', label: 'one' }, { value: 'two', label: 'two' }]} placeholder="Choose port" />
            </div>
            <div className="input-group col-3">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-envelope" /></div>
              </div>
              <input type="text" className="form-control" id="" placeholder="Your Message" />
            </div>
          </div>

          <div className="form-row justify-content-between">
            <div className="input-group d-flex align-items-center col-3 pr-0">
              <div className="input-group-prepend p-0 col-1">
                <div className="input-group-text"><i className="fa fa-ship" /></div>
              </div>
              <Select className="field-select col-11 pr-0" id="" options={[{ value: 'one', label: 'one' }, { value: 'two', label: 'two' }]} placeholder="Ship Type" />
            </div>
            <div className="input-group d-flex align-items-center col-3 pr-0">
              <div className="input-group-prepend p-0 col-1">
                <div className="input-group-text"><i className="fa fa-calendar" /></div>
              </div>
              <Select className="field-select col-11 pr-0" id="" options={[{ value: 'one', label: 'one' }, { value: 'two', label: 'two' }]} placeholder="Expected Inspection Date" />
            </div>
            <div className="input-group col-3" style={{ visibility: 'hidden' }}>
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-user" /></div>
              </div>
              <input type="text" className="form-control" id="" placeholder="Your Email Address" />
            </div>
          </div>
          <div className="text-center"><button className="btn-post-enquiry" type="submit">POST ENQUIRY</button></div>
        </form>
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