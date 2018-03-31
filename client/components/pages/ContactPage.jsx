// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import LocationOn from 'material-ui/svg-icons/communication/location-on';
import Email from 'material-ui/svg-icons/communication/email';
import {blue500} from 'material-ui/styles/colors';
import GoogleMap from 'google-map-react';

const styles = {
  icon: {
    width: 30,
    height: 30,
    verticalAlign: 'middle'
  }
}

export default class ContactPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contactUsForm: {
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        countryCode: "",
        question: ""
      }, 
      contactUsFormError: {
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        countryCode: "",
        question: ""
      },
      errorMsg : "",
      formSuccess: false
    }
  }

  componentWillReceiveProps(props) {
    if(!this.props.contactUsEmailSuccess && props.contactUsEmailSuccess) {
      this.setState((state) => { state.formSuccess = props.contactUsEmailSuccess; });
    }
    if(props.error) {
      this.setState((state) => { state.errorMsg = props.error; });
    }
  }

  handleInputChange = (event) => {
    event.persist();
    this.setState((state) => { state.contactUsForm[event.target.name] = event.target.value });
  }

  submitContactForm = () => {

    var error = false;
    var contactUsFormError = {  name: "", email: "", company: "", phone: "", countryCode: "", message: "", question: ""};

    if(this.state.contactUsForm.name == "") {
      error = true;
      contactUsFormError.name = "This field is mandatory";
    }
    if(this.state.contactUsForm.company == "") {
      error = true;
      contactUsFormError.company = "This field is mandatory";
    }
    if(this.state.contactUsForm.email == "") {
      error = true;
      contactUsFormError.email = "This field is mandatory";
    }
    if(this.state.contactUsForm.countryCode == "") {
      error = true;
      contactUsFormError.countryCode = "This field is mandatory";
    }
    if(this.state.contactUsForm.phone == "") {
      error = true;
      contactUsFormError.phone = "This field is mandatory";
    }
    if(this.state.contactUsForm.message == "") {
      error = true;
      contactUsFormError.message = "This field is mandatory";
    }
    if(this.state.contactUsForm.question == "") {
      error = true;
      contactUsFormError.question = "This field is mandatory";
    }

    if(error) {
      console.log(contactUsFormError);
      this.setState((state) => { state.contactUsFormError = contactUsFormError; });
    } else {
      this.setState((state) => { state.contactUsFormError = contactUsFormError; this.state.errorMsg = ""; });
      console.log(this.state.contactUsForm);
      this.props.sendContactUsEmail(this.state.contactUsForm);
    }
    
  }

  renderActionMessage = () =>  {
    if(this.state.formSuccess) {
      return (<div className="success">Your enquiry has been submitted successfully!!</div>)
    } else if(this.state.errorMsg && this.state.errorMsg.trim() !== "") {
      return (<div className="error">{this.state.errorMsg}</div>)
    } else {
      return null;
    }
  }

  renderSelectBox = (datasource, placeholder, keyField='id', textField='name') => {
      var options = [];
      var prefix = "";
      if(placeholder == 'PhoneCode')
        prefix = "+";

      options.push(<option key="" value="">{"Select " + placeholder }</option>);
      datasource.map( (ds) => {
        options.push(<option key={ds[keyField]} value={ds[keyField]}>{prefix + ds[textField]}</option>);
      });
      return  options;             
  }

  renderForm() {
    if(this.state.formSuccess) {
      return null;
    } else {
      return (
        <div>
          <div className="top">Fields marked with an * are required</div>
          
          <div className="label">Name *</div>
          <div className="field">
            <input className="inputField" name="name" type="text" placeholder="name" value={this.state.contactUsForm.name} onChange={this.handleInputChange}/>
            <div className="errorField">{this.state.contactUsFormError.email}</div>
          </div>

          <div className="label">Email *</div>
          <div className="field">
            <input className="inputField" name="email" type="text" placeholder="email" value={this.state.contactUsForm.email} onChange={this.handleInputChange}/>
            <div className="errorField">{this.state.contactUsFormError.email}</div>
          </div>

          <div className="label">Company *</div>
          <div className="field">
            <input className="inputField" name="company" type="text" placeholder="email" value={this.state.contactUsForm.company} onChange={this.handleInputChange}/>
            <div className="errorField">{this.state.contactUsFormError.company}</div>
          </div>

          <div className="label">Phone *</div>
          <div className="field">
            <div className="phone-country">
              <select style={{width: 60}} name="countryCode" value={this.state.contactUsForm.countryCode} onChange={this.handleInputChange}>
                {this.renderSelectBox(this.props.countries, 'PhoneCode','code', 'phoneCode')}
              </select>
            </div>
            <div className="phone-value">
              <input type="text" placeholder="phone" name="phone" value={this.state.contactUsForm.phone} onChange={this.handleInputChange}/>
            </div>
            <div className="clear"></div>
            <div className="errorField">{this.state.contactUsFormError.email}</div>
          </div>
          
          <div className="label">Message *</div>
          <div className="field">
            <textarea className="inputField" name="message" placeholder="message" value={this.state.contactUsForm.message} onChange={this.handleInputChange}/>
            <div className="errorField">{this.state.contactUsFormError.email}</div>
          </div>
          
          <div className="label">What is 30 minus 6? *</div>
          <div className="field">
            <input className="inputField" name="question" type="text" placeholder="question" value={this.state.contactUsForm.question} onChange={this.handleInputChange}/>
            <div className="errorField">{this.state.contactUsFormError.email}</div>
          </div>
          
          <button onClick={this.submitContactForm}>SEND</button>
        </div>
      );
    }
  }

  render() {

    const location = { lat: 22.262272, lng: 114.1303702 };

	  return (
          <div className="page">
          	<h1>Contact Us</h1>
          	<p>Get in touch and we will get back to you as soon as we can.  We look forward to hearing from you!</p>
          	<h3>Contact Form</h3>
          	<div className="contact-form">
              {this.renderActionMessage()}
          		{this.renderForm()}
          	</div>

          	<div className="contact-info">
          		<h5>Write To Us</h5> 
          		<p><Email color={blue500} style={styles.icon}/> <a style={{color: '#3e3e3e'}} href="mailto:enquiries@shipinspectors.com">enquiries@shipinspectors.com</a> </p>
          	</div>

          	<div className="contact-info">
          		<h5>Postal Address</h5>
          		<p><LocationOn color={blue500} style={styles.icon}/> 1234, Sed Smart space-2, Units 1205-1208, Level 12, Cyberport-2, 100 Cyberport Road Hong Kong</p>

              <div style={{'textAlign': 'center', width: '100%', height: '100%', margin: '20px auto'}}>
                <GoogleMap yesIWantToUseGoogleMapApiInternals={true} bootstrapURLKeys={{key: 'AIzaSyA7GW_hVzuB75WbgYg-M2ZaP9Vn48aS-2I'}} center={location} defaultZoom={17}  onGoogleApiLoaded={({map, maps}) => {let marker = new maps.Marker({ position: location, map, title: 'Address'})}}/>
              </div>

          	</div>

          	<div className="space40"></div>
          </div>
      );
  }
}