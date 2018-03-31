// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DateTime from 'react-datetime';
import VirtualizedSelect from 'react-virtualized-select';

var yesterday = DateTime.moment().subtract(1, 'day');

export default class QuoteEnquiryPage extends Component {

  constructor(props) {
    super(props);

    this.state = {

      userId: props.userProfile ? props.userProfile.id : null,
      quoteForm: {
        inspectionType: "",
        vesselType: "",
        vesselName: "",
        imo: "",
        portId: "",
        startTime: null,
        endTime: null,
        email: "",
        company: ""
      },
      quoteFormError: {
        inspectionType: "",
        vesselName: "",
        vesselType: "",
        imo: "",
        portId: "",
        startTime: "",
        endTime: "",
        email: "",
        company: ""
      },
      createdEnquiry: false,
      enquiryErrorMsg: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.portOptionRenderer = this.portOptionRenderer.bind(this);
  }

  componentWillReceiveProps(props) {
    if(!this.props.createdEnquiry && props.createdEnquiry) {
      this.setState((state) => { state.createdEnquiry = props.createdEnquiry; });
    }
    if(props.error) {
      this.setState((state) => { state.enquiryErrorMsg = props.error; });
    }

    if(!this.props.userProfile && props.userProfile) {
      this.setState((state) => { 
        state.quoteForm.email = props.userProfile.email;
        state.quoteForm.company = props.userProfile.company;
        state.userId = props.userProfile.id;
      });
    }
  }

  isValidDate = (date) => {
     return date.isAfter( yesterday );
  }

  handleStartTimeChange = (date) => {
    this.setState((state) => { state.quoteForm['startTime'] = date });
  }

  handleEndTimeChange = (date) => {
    this.setState((state) => { state.quoteForm['endTime'] = date });
  }

  handleInputChange (event) {
    event.persist();
    this.setState((state) => { state.quoteForm[event.target.name] = event.target.value });
  }

  handleSubmit(event) {

    event.preventDefault();

    var error = false;

    var quoteFormError = {  inspectionType: "", vesselName: "", imo: "", portName: "", startTime: "", endTime: "", email: "", company: "" };

    var enquiry = {};

    if(this.state.quoteForm.inspectionType == "") {
      error = true;
      quoteFormError.inspectionType = "This field is mandatory";
    } else 
      enquiry['inspectionType'] = this.state.quoteForm.inspectionType;

    if(this.state.quoteForm.vesselName == "") {
      error = true;
      quoteFormError.vesselName = "This field is mandatory";
    } else 
      enquiry['vesselName'] = this.state.quoteForm.vesselName;

    if(this.state.quoteForm.vesselType == "") {
      error = true;
      quoteFormError.vesselType = "This field is mandatory";
    } else 
      enquiry['vesselType'] = this.state.quoteForm.vesselType;

    if(this.state.quoteForm.imo == "") {
      error = true;
      quoteFormError.imo = "This field is mandatory";
    } else 
      enquiry['imo'] = this.state.quoteForm.imo;

    if(this.state.quoteForm.portId == "") {
      error = true;
      quoteFormError.portId = "This field is mandatory";
    } else 
      enquiry['portId'] = this.state.quoteForm.portId;

    if(!this.state.userId) {
      if(this.state.quoteForm.email == "") {
        error = true;
        quoteFormError.email = "This field is mandatory";
      } else 
        enquiry['email'] = this.state.quoteForm.email;

      if(this.state.quoteForm.company == "") {
        error = true;
        quoteFormError.company = "This field is mandatory";
      } else 
        enquiry['company'] = this.state.quoteForm.company;  
    } else {

      enquiry['userId'] = this.state.userId;
    }

    if(this.state.quoteForm.startTime) {
      enquiry.startTime = this.state.quoteForm.startTime.valueOf();
    } else {
      error = true;
      quoteFormError.startTime = "Please select start date of your project";
    }

    if(this.state.quoteForm.endTime) {
      enquiry.endTime = this.state.quoteForm.endTime.valueOf();
    } else {
      error = true;
      quoteFormError.endTime = "Please select end date of your project";
    }

    this.setState( (state) => { state.quoteFormError = quoteFormError});

    if(error)
      return;

    this.props.submitEnquiry(enquiry);

  }

  renderSelectBox = (datasource) => {
      var options = [];
      options.push(<option key="" value="">Select</option>);
      datasource.map( (ds) => {
        options.push(<option key={ds.id} value={ds.id}>{ds.name}</option>);
      });
      return  options;             
  }

  portOptionRenderer = ({ focusedOption, focusedOptionIndex, focusOption, key, labelKey, option, options, selectValue, style, valueArray, valueKey }) => {
    
    const flagImageUrl = `https://cdn.rawgit.com/hjnilsson/country-flags/9e827754/svg/${option.countryCode.toLowerCase()}.svg`;

    const classNames = ["country-option"];
    if (option === focusedOption) {
      classNames.push("country-option-focussed");
    }
    if (valueArray.indexOf(option) >= 0) {
      classNames.push("country-option-selected");
    }

    return (
      <div key={key} onClick={() => selectValue(option)}  className={classNames.join(' ')} style={style}>
        <img src={flagImageUrl} className="country-flag" />
        <label className="country-label">
          {option.name} , {option.countryName} , {option.regionName}
        </label>
      </div>
    )
  }

  renderUserAccountInformation = () => {
    if(!this.state.userId) {
      return (
              <div style={{border : '1px solid #F39841', width: '90%', padding: 10, backgroundColor: '#e8ebef'}}>
              <h2>Your Account Details</h2>
              <p>We will create an account to manage your quotations</p>
              <div className="leftHalf">
                <div className="label">Email</div>
                <div className="field">  
                  <input className="inputField" type="text" placeholder="email" name="email" value={this.state.quoteForm.email} onChange={this.handleInputChange}
                  disabled={this.state.userId} />
                  <div className="errorField">{this.state.quoteFormError.email}</div>
                </div>
              </div>
              <div className="leftHalf">
                <div className="label">Company</div>
                <div className="field">  
                  <input className="inputField" type="text" placeholder="company" name="company" value={this.state.quoteForm.company} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.quoteFormError.company}</div>
                </div>
              </div>
              <div className="clear"></div>
            </div>);
    }
  }

  render() {

    console.log(this.state);

	  if(this.state.createdEnquiry) {
      return(
        <div className="success">
          Your enqiury has been successfully submitted. Please note your enquiry number for future reference - #{this.props.createdEnquiry.id}
        </div>
      );
    }
    else {

      return (
          <div className="page">
          	<h1>Create Your Enquiry</h1>
              <form className="contact-form" onSubmit={this.handleSubmit} action="/" method="post">
                <div className="error">{this.state.enquiryErrorMsg}</div>
                <div className="leftHalf">  
                  <div className="label">Inspection Type</div>
                  <div className="field"> 
                    <VirtualizedSelect
                      options={this.props.inspectionTypes} simpleValue value={this.state.quoteForm.inspectionType}
                      onChange={(selectedValue) => { this.setState((state) => { state.quoteForm.inspectionType = selectedValue; }) } } searchable labelKey="name" valueKey="id" />
                    
                    <div className="errorField">{this.state.quoteFormError.inspectionType}</div>
                  </div>
                  
                  <div className="label">Start Date</div>
                  <div className="field">  
                    <DateTime value={this.state.quoteForm.startTime}  dateFormat={"YYYY-MM-DD"} 
                    timeFormat={"HH:mm"} open={false} onChange={this.handleStartTimeChange}
                    closeOnSelect={true}  isValidDate={ this.isValidDate } disabled={yesterday}/>
                    <div className="errorField">{this.state.quoteFormError.startTime}</div>
                  </div>

                  <div className="label">Vessel Name</div>
                  <div className="field">
                    <input className="inputField" type="text" placeholder="vessel name" name="vesselName" value={this.state.quoteForm.vesselName} onChange={this.handleInputChange}/>
                    <div className="errorField">{this.state.quoteFormError.vesselName}</div>
                  </div>

                  <div className="label">Vessel Type</div>
                  <div className="field"> 
                    <VirtualizedSelect
                      options={this.props.vesselTypes} simpleValue value={this.state.quoteForm.vesselType}
                      onChange={(selectedValue) => { this.setState((state) => { state.quoteForm.vesselType = selectedValue; }) } } searchable labelKey="name" valueKey="id" />
                    <div className="errorField">{this.state.quoteFormError.vesselType}</div>
                  </div>
                </div>

                <div className="leftHalf"> 
                  <div className="label">Port Name</div>
                  <div className="field">
                    <VirtualizedSelect
                        options={this.props.ports} simpleValue value={this.state.quoteForm.portId}
                        onChange={(selectedValue) => { this.setState((state) => { state.quoteForm.portId = selectedValue[0]; }) }} searchable labelKey="name" valueKey="id"
                        optionRenderer={this.portOptionRenderer} clearable={false}/>
                    <div className="errorField">{this.state.quoteFormError.portId}</div>
                  </div>

                  <div className="label">End Date</div>
                  <div className="field">  
                    <DateTime value={this.state.quoteForm.endTime}  dateFormat={"YYYY-MM-DD"} 
                    timeFormat={"HH:mm"} open={false} onChange={this.handleEndTimeChange}
                    closeOnSelect={true}  isValidDate={ this.isValidDate } disabled={yesterday}/>
                    <div className="errorField">{this.state.quoteFormError.endTime}</div>
                  </div>

                  <div className="label">IMO Number</div>
                  <div className="field">  
                    <input className="inputField" type="text" placeholder="imo number" name="imo" value={this.state.quoteForm.imo} onChange={this.handleInputChange}/>
                    <div className="errorField">{this.state.quoteFormError.imo}</div>
                  </div>

                </div>
                <div className="clear"></div>
                
                {this.renderUserAccountInformation()}

                <div className="btn">
                  <button>Create Instant Quote</button>
                </div>
                <div className="clear"></div>
              </form>
          </div>
      );
    }
  }
}