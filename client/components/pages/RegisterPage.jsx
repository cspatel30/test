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
        <div className="login-page">
          <form className="contact-form"  onSubmit={this.handleSubmit} action="/" method="post">
            <div className="" style={{ color: '#1475af', marginBottom: '15px', fontSize: '18px' }}>Select Client or Inspector</div>
            <Tabs className="tabs" tabItemContainerStyle={styles.tabs}>
              
              <Tab label="Client" buttonStyle={this.getTabButtonClassName('customer')} className="tab" data-person="customer" onActive={this.handleActive}>
                <div className="label">Full Name</div>
                <div className="field">  
                  <input className="inputField" type="text" placeholder="name" name="name" value={this.state.registerForm.name} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.registerFormError.name}</div>
                </div>  
                <div className="label">Email</div>
                <div className="field">  
                  <input className="inputField" type="text" placeholder="email" name="email" value={this.state.registerForm.email} onChange={this.handleInputChange} onBlur={() => this.validate()}/>
                  <div className="errorField">{this.state.registerFormError.email}</div>
                </div> 
                <div className="label">Password</div>
                <div className="field">  
                  <input className="inputField" type="password" placeholder="password" name="password" value={this.state.registerForm.password} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.registerFormError.password}</div>
                </div>
                <div className="label">Re-Enter Password</div>
                <div className="field">  
                  <input className="inputField" type="password" placeholder="Confirm Password" name="confirmpassword" value={this.state.registerForm.confirmpassword} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.registerFormError.confirmpassword}</div>
                </div> 
                <div className="label">Company</div>
                <div className="field">  
                  <input className="inputField" type="text" placeholder="company name" name="company" value={this.state.registerForm.company} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.registerFormError.company}</div>
                </div>   

                <div className="label">Office Address</div>
                <div className="field">  
                  <input className="inputField" type="building" placeholder="building" name="building" value={this.state.registerForm.building} onChange={this.handleInputChange}/>
                  
                </div>
                <div className="field">  
                  <input className="inputField" type="street" placeholder="street" name="street" value={this.state.registerForm.street} onChange={this.handleInputChange}/>
                  
                </div>
                <div className="field">  
                  <input className="inputField" type="city" placeholder="city" name="city" value={this.state.registerForm.city} onChange={this.handleInputChange}/>
                  
                </div>
                <div className="field">  
                  <VirtualizedSelect placeholder="Country" labelKey='name' multi={false} onChange={(selectedValue) => this.setState((state) => { console.log(selectedValue); state.registerForm.countryCode = selectedValue; })}
                    options={this.props.countries} searchable={true} simpleValue value={this.state.registerForm.countryCode} valueKey='code'
                    optionRenderer={this.countryOptionRenderer}  clearable={false}/>
                </div>

                <div className="label">Phone Number</div>
                <div className="field">
                  <div className="phone-country">
                    <VirtualizedSelect labelKey='phoneCode' multi={false} onChange={(selectedValue) => this.setState((state) => { console.log(selectedValue); state.registerForm.countryCode = selectedValue; })}
                    options={this.props.countries} searchable={true} simpleValue value={this.state.registerForm.countryCode} valueKey='code'
                    optionRenderer={this.phoneOptionRenderer}  clearable={false}/>
                  </div>
                  <div className="phone-value">
                    <input type="text" placeholder="phone" name="phone" value={this.state.registerForm.phone} onChange={this.handleInputChange}/>
                    <div className="errorField">{this.state.registerFormError.phone}</div>
                  </div>
                  <div className="clear"></div>
                </div>
              </Tab>

              <Tab label="Inspector" buttonStyle={this.getTabButtonClassName('inspector')} className="tab" data-person="inspector" onActive={this.handleActive}>
                <div className="label">Full Name</div>
                <div className="field">  
                  <input className="inputField" type="text" placeholder="name" name="name" value={this.state.registerForm.name} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.registerFormError.name}</div>
                </div>  
                <div className="label">Email</div>
                <div className="field">  
                  <input className="inputField" type="text" placeholder="email" name="email" value={this.state.registerForm.email} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.registerFormError.email}</div>
                </div>  
                <div className="label">Password</div>
                <div className="field">  
                  <input className="inputField" type="password" placeholder="password" name="password" value={this.state.registerForm.password} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.registerFormError.password}</div>
                </div>
                <div className="label">Re-Enter Password</div>
                <div className="field">  
                  <input className="inputField" type="password" placeholder="re-enter password" name="confirmpassword" value={this.state.registerForm.confirmpassword} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.registerFormError.confirmpassword}</div>
                </div>
                <div className="label">Company</div>
                <div className="field">  
                  <div className="selectField"> 
                    <select name="company" value={this.state.registerForm.company} onChange={this.handleInputChange}>
                      {this.renderSelectBox(this.props.inspectorCompany, 'company')}
                    </select>
                  </div>
                  <div className="errorField">{this.state.registerFormError.company}</div>
                </div>
  
                <div className="label">Title</div>
                <div className="field">  
                  <div className="selectField"> 
                    <select name="position" value={this.state.registerForm.position} onChange={this.handleInputChange}>
                      {this.renderSelectBox(this.props.inspectorPositions, ' - How would you like to Title yourself')}
                    </select>
                  </div>
                  <div className="errorField">{this.state.registerFormError.position}</div>
                </div>  
                <div className="label">Qualification</div>
                <div className="field">  
                  <div className="selectField">                        
                    <select name="qualification" value={this.state.registerForm.qualification} onChange={this.handleInputChange}>
                      {this.renderSelectBox(this.props.inspectorQualifications, 'Qualification')}
                    </select>
                  </div>
                  <div className="errorField">{this.state.registerFormError.qualification}</div>
                </div>  
                
                <div className="label">Your Location Details</div>
                <div className="sublabel">Nearest Seaport:</div>
                <div className="field">   
                  <VirtualizedSelect labelKey='name' multi={false} onChange={(selectedValue) => this.setState((state) => { console.log(selectedValue); state.registerForm.seaport = selectedValue[0]; })}
                    options={this.props.ports} searchable={true} simpleValue value={this.state.registerForm.seaport} valueKey='id'
                    optionRenderer={this.portOptionRenderer}  clearable={false}/>
                    <div className="errorField">{this.state.registerFormError.seaport}</div>
                </div>
                
                <div className="sublabel">City:</div>
                <div className="field">  
                  <input className="inputField" type="text" placeholder="city" name="city" value={this.state.registerForm.city} onChange={this.handleInputChange}/>
                  <div className="errorField">{this.state.registerFormError.city}</div>
                </div>  
                
                <div className="sublabel">Country:</div>
                <div className="field"> 
                    <VirtualizedSelect labelKey='name' multi={false} onChange={(selectedValue) => this.setState((state) => { console.log(selectedValue); state.registerForm.countryCode = selectedValue; })}
                    options={this.props.countries} searchable={true} simpleValue value={this.state.registerForm.countryCode} valueKey='code'
                    optionRenderer={this.countryOptionRenderer}  clearable={false}/>
                  <div className="errorField">{this.state.registerFormError.countryCode}</div>
                </div>
                <div className="label">Phone Number</div>
                <div className="field"> 
                  <div className="phone-country">
                    <VirtualizedSelect labelKey='phoneCode' multi={false} onChange={(selectedValue) => this.setState((state) => { console.log(selectedValue); state.registerForm.countryCode = selectedValue; })}
                    options={this.props.countries} searchable={true} simpleValue value={this.state.registerForm.countryCode} valueKey='code'
                    optionRenderer={this.phoneOptionRenderer}  clearable={false}/>
                  </div>
                  <div className="phone-value">
                    <input type="text" placeholder="phone" name="phone" value={this.state.registerForm.phone} onChange={this.handleInputChange}/>
                    <div className="errorField">{this.state.registerFormError.phone}</div>
                  </div>
                  <div className="clear"></div>
                </div>  
              </Tab>
            </Tabs>
            <div className="label">
              <input className="checkbox" type="checkbox" checked={this.state.termsAgreed} onChange={this.toggleAgreementCheckBox}/>
                &nbsp; &nbsp;I have read and agreed with all <a className="link" onClick={this.handleAgreementPopupOpen}>terms and conditions and Privacy Policy of Sinotech Marine</a> as given on this website.
            </div>
            <div className="btn"><button>Sign Up</button></div>
            <div className="clear"></div>
          </form>
          <Dialog title="" modal={true} open={this.state.termsOpen} actions={actions} autoScrollBodyContent={true}>
            <div className="register-terms">
                <TermsPage/>
            </div>
          </Dialog>
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