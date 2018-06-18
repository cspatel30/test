// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import VirtualizedSelect from 'react-virtualized-select';

import TermsPage from './TermsPage.jsx';

const styles = {
  tabs: {
    width: 350,
    background: '#fff'
  },
  tabButton: {
    padding: 10,
    background: '#fff',
    color: '#000',
    width: 150,
    borderBottom: '2px solid #cecece'
  },
  tabButtonSelected: {
    padding: 10,
    background: '#fff',
    color: '#000',
    width: 150,
    borderBottom: '2px solid rgb(255, 64, 129)'
  }
};

export default class RegisterPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      termsOpen: false,
      signUpSuccess: false,
      signUpErrorMsg: "",
      userType: "customer",
      termsAgreed: false,
      registerForm: {
      	name: "",
        email: "",
        password: "",
        confirmpassword: "",
        company: "",
        phone: "",
        position: "",
        qualification: "",
        building: "",
        street: "",
        seaport: "",
        city: "",
        countryCode: ""
      },
      registerFormError: {
      	name: "",
        email: "",
        password: "",
        confirmpassword: "",
        company: "",
        phone: "",
        position: "",
        qualification: "",
        seaport: "",
        city: "",
        countryCode: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.getTabButtonClassName = this.getTabButtonClassName.bind(this);
    this.toggleAgreementCheckBox = this.toggleAgreementCheckBox.bind(this);
    this.handleAgreementPopupOpen = this.handleAgreementPopupOpen.bind(this);
    this.handleAgreementPopupClose = this.handleAgreementPopupClose.bind(this);
    this.portOptionRenderer = this.portOptionRenderer.bind(this);
  } 

  componentWillReceiveProps(props) {
    if(props.signUpSuccess) {
      this.setState((state) => { state.signUpSuccess = props.signUpSuccess; });
    }
    if(props.error) {
      this.setState((state) => { state.signUpErrorMsg = props.error; });
    }
  }

  handleAgreementPopupOpen () {
    this.setState((state) => { state.termsOpen = true});
  }

  handleAgreementPopupClose () {
    this.setState((state) => { state.termsOpen = false, state.termsAgreed = true});
  }

  getTabButtonClassName (sectionname) {
    if(this.state.userType == sectionname) {
      return styles.tabButtonSelected;
    } else 
      return styles.tabButton;
  }

  handleActive (tab) {
    this.setState((state) => { 
      state.userType = tab.props['data-person']; 
      state.registerForm = {
        name: "", email: "", password: "", confirmpassword: "", company: "", phone: "", position: "", qualification: "",
        building: "", street: "", seaport: "", city: "", country: "" };
      state.registerFormError = {  name: "", email: "", password: "", confirmpassword: "", company: "", position: "", 
                                qualification: "", seaport: "", city: "", countryCode: "" };
      state.signUpSuccess = false;
      state.signUpErrorMsg = null;
    }); 
  }

  validate() {
    if (!this.state.registerForm.email.includes("@")) {
      this.setState((state) => state.registerFormError.email = 'Invalid Email');
    } else {
      this.setState((state) => state.registerFormError.email = '');
    }
  }

  handleInputChange (event) {
    event.persist();
    this.setState((state) => { state.registerForm[event.target.name] = event.target.value });
  }

  handleLocationInputChange (event) {
    event.persist();
    this.setState((state) => { state.registerForm.location[event.target.name] = event.target.value });
  }

  toggleAgreementCheckBox (event) {
    event.persist();
    this.setState((state) => { state.termsAgreed = event.target.checked});
  }

  handleSubmit(event) {

    event.preventDefault();

    var error = false;
    console.log(this.state);

    var registerFormError = {  name: "", email: "", password: "", confirmpassword: "", company: "",
        position: "", phone: "", qualification: "", location: {seaport: "", city: "", country: ""} };

    if(this.state.registerForm.name == "") {
      error = true;
      registerFormError.name = "This field is mandatory";
    }

    if(this.state.registerForm.email == "") {
      error = true;
      registerFormError.email = "This field is mandatory";
    }

    if(this.state.registerForm.company == "") {
      error = true;
      registerFormError.company = "This field is mandatory";
    }

    if(this.state.registerForm.password == "") {
      registerFormError.password = "This field is mandatory";
      error = true;
    }

    if(this.state.registerForm.confirmpassword == "") {
      registerFormError.confirmpassword = "This field is mandatory";
      error = true;
    }
    //check if 2 passwords match
    if(this.state.registerForm.password != "" && this.state.registerForm.confirmpassword != "" && 
      this.state.registerForm.password !== this.state.registerForm.confirmpassword) {
      error = true;
      registerFormError.confirmpassword = "Both passwords do not match";
    }

    if(this.state.registerForm.phone == "") {
      registerFormError.phone = "This field is mandatory";
      error = true;
    }

    if(this.state.userType == 'inspector') {
      if(this.state.registerForm.phone == "") {
        registerFormError.phone = "This field is mandatory";
        error = true;
      }

      if(this.state.registerForm.position == "") {
        registerFormError.position = "This field is mandatory";
        error = true;
      }

      if(this.state.registerForm.qualification == "") {
        registerFormError.qualification = "This field is mandatory";
        error = true;
      }

      if(this.state.registerForm.seaport == "") {
        registerFormError.seaport = "This field is mandatory";
        error = true;
      }

      if(this.state.registerForm.city == "") {
        registerFormError.city = "This field is mandatory";
        error = true;
      }

      if(this.state.registerForm.countryCode == "") {
        registerFormError.countryCode = "This field is mandatory";
        error = true;
      }
    }
    
    if(error) { 
      this.setState( (state) => { state.registerFormError = registerFormError; state.signUpSuccess = false;});
      return;
    }

    this.setState((state) => { state.signUpSuccess = false; state.signUpErrorMsg = "", state.registerFormError = registerFormError; });

    if(!this.state.termsAgreed) {
      alert("Please agree to terms and conditions");
      return;
    }

    var registerForm = this.state.registerForm;
    registerForm.seaport = parseInt(registerForm.seaport);
    registerForm.country = parseInt(registerForm.country);

    this.setState((state) => { state.signUpErrorMsg = "";});

    this.props.register(this.state.userType, registerForm);

  }

  renderSelectBox = (datasource, placeholder, keyField='id', textField='name') => {
      var options = [];
      var prefix = "";
      datasource = _.sortBy(datasource, ['name']);    
      options.push(<option key="" value="">{"Select " + placeholder }</option>);
      datasource.map( (ds) => {
        options.push(<option key={ds[keyField]} value={ds[keyField]}>{prefix + ds[textField]}</option>);
      });
      return  options;             
  }

  phoneOptionRenderer = ({ focusedOption, focusedOptionIndex, focusOption, key, labelKey, option, options, selectValue, style, valueArray, valueKey }) => {
    const flagImageUrl = `https://cdn.rawgit.com/hjnilsson/country-flags/9e827754/svg/${option.code.toLowerCase()}.svg`;

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
          + {option.phoneCode}
        </label>
      </div>
    )           
  }

  countryOptionRenderer = ({ focusedOption, focusedOptionIndex, focusOption, key, labelKey, option, options, selectValue, style, valueArray, valueKey }) => {
    
    const flagImageUrl = `https://cdn.rawgit.com/hjnilsson/country-flags/9e827754/svg/${option.code.toLowerCase()}.svg`;

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
          {option.name}
        </label>
      </div>
    );
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

  renderActionMessage = () =>  {
    if(this.state.signUpSuccess) {
      return (
        <div className="success d-flex flex-column">
          <span className="my-1">You account has been created successfully!!</span>
          <span className="my-1">Please login to your email account to verify your email. You will be able to login post email verification.</span>
        </div>
      )
    } else if(this.state.signUpErrorMsg && this.state.signUpErrorMsg.trim() !== "") {
      return (<div className="error">{this.state.signUpErrorMsg}</div>)
    } else {
      return null;
    }
  }

  renderForm() {
    const actions = [
      <FlatButton label="I Agree" primary={true} onClick={this.handleAgreementPopupClose}/>];
      
    if(!this.state.signUpSuccess) {
      return (
        <div className="section bg-gray">
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-12 SignUpFormSec p-5 position-relative">
                {/* Material form login */}
                <form className="mb-5 pb-5">
                  <p className="h4 text-blue mb-4 SignUpTitleMain pl-3">Register on ShipInspectors.com</p>
                  <p className="h4 text-blue mb-4 loginTitle pl-3">Select Client or Inspector</p>
                  <div className="position-relative mDivider">
                    <div className="divider" />
                    <div className="triangle-down" />
                  </div>
                  <div className="d-flex loginType pt-3">
                    <div>
                      <input className="with-gap" type="radio" name="gender" id="client" defaultChecked />
                      <label htmlFor="client">Client</label>
                    </div>
                    <div className="pl-4">
                      <input className="with-gap" type="radio" name="gender" id="inspector" />
                      <label htmlFor="inspector">Inspector</label>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/user.png" alt />
                        <input id="firstName" type="tel" />
                        <label htmlFor="firstName">First Name
                          <span className="required">*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/user.png" alt />
                        <input id="lastName" type="tel" />
                        <label htmlFor="lastName">Last Name
                          <span className="required">*</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/at.png" alt />
                        <input id="email" type="tel" />
                        <label htmlFor="email">Email Address
                          <span className="required">*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/key.png" alt />
                        <input id="password" type="tel" />
                        <label htmlFor="password">Password
                          <span className="required">*</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex col-md-6">
                    <div className="col-md-6 pl-0">
                      <select>
                        <option value disabled selected required>Code</option>
                        <option value={1}>Option 1</option>
                        <option value={2}>Option 2</option>
                        <option value={3}>Option 3</option>
                      </select>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/phone.png" alt />
                        <input id="phone" type="tel" />
                        <label htmlFor="phone">Phone
                          <span className="required">*</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <p className="officeAddress my-3 col-md-12 text-gray">
                    Office Address
                  </p>
                  <div className="d-flex mb-5">
                    <div className="col-md-6">
                      <div className="input-field">
                        <input id="companyName" type="tel" />
                        <label htmlFor="companyName">Company Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <select>
                        <option value disabled selected required>Building</option>
                        <option value={1}>Option 1</option>
                        <option value={2}>Option 2</option>
                        <option value={3}>Option 3</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6">
                      <select>
                        <option value disabled selected required>Street</option>
                        <option value={1}>Option 1</option>
                        <option value={2}>Option 2</option>
                        <option value={3}>Option 3</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <select>
                        <option value disabled selected required>Code</option>
                        <option value={1}>Option 1</option>
                        <option value={2}>Option 2</option>
                        <option value={3}>Option 3</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6">
                      <select>
                        <option value disabled selected required>City</option>
                        <option value={1}>Option 1</option>
                        <option value={2}>Option 2</option>
                        <option value={3}>Option 3</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <div className="input-field">
                        <input id="postalCode" type="tel" />
                        <label htmlFor="postalCode">Postal Code</label>
                      </div>
                    </div>
                  </div>
                  <div className="signUpsmText col-md-12 text-gray py-4">
                    By clicking sign up button, I confirm I have read and accept Sinotech Marine
                    <a href>Privacy Policy</a> and
                    <a href>Terms and Conditions</a>.
                  </div>
                </form>
                <div className="position-absolute signUpBtm w-100 col-md-12 py-3">
                  <div className="daj signUpBtmBg py-3">
                    <div className="text-center">
                      <button type="button" className="btn btn-outline-pink loginBtn">SIGN UP</button>
                      <button type="button" className="btn btn-outline-gray loginBtn">RESET</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { userToken , userProfile } = this.props;

  	if(userToken && userProfile) {
  		this.props.history.push('/');
  	}

    return (
          <div className="page">
          	<h1 style={{ marginLeft: '15%' }}>Register on ShipInspectors.com</h1>
          	{this.renderActionMessage()}
            {this.renderForm()}
          </div>
      );
  }
}