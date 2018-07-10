import React, { Component } from 'react';
import _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import VirtualizedSelect from 'react-virtualized-select';
import Select from 'react-select';
import './RegisterPage.scss';

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
      userType: "Customer",
      termsAgreed: false,
      registerForm: {

       //common for cient and inspector registration
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: "",
        countryCode:"",
        phone: "",

        // client registration
        clientCompanyName: "",
        building: "",
        street: "",
        clientCity: "",
        clientCountry:"",
        clientPostalCode:"",

        // inspector registration
        inspectorCompanyName:"",
        employmentType:"",
        qualification: "",
        title:"",
        clientCity: "",
        clientCountry:"",
        clientPostalCode:"",
        position: "",
        registraiontype:""
      },
      registerFormError: {

       //common for cient and inspector
        firstName: "",
      	lastName: "",
        email: "",
        password: "",
        confirmpassword: "",
        countryCode: "",
        phone: "",

        // client registration
        clientCompanyName: "",
        
        // inspector registration
        employmentType:"",
        qualification: "",
        title:""

      },
      selectedOption: '',
      countryCode: "",
      employmentType: "",
      qualification: "",
      inspectorCountry: "",
      title:""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTabButtonClassName = this.getTabButtonClassName.bind(this);
    this.toggleAgreementCheckBox = this.toggleAgreementCheckBox.bind(this);
    this.handleAgreementPopupOpen = this.handleAgreementPopupOpen.bind(this);
    this.handleAgreementPopupClose = this.handleAgreementPopupClose.bind(this);
    this.portOptionRenderer = this.portOptionRenderer.bind(this);
    this.selectTypeOfRegistration = this.selectTypeOfRegistration.bind(this);
    //this.getDropdownConstants = this.getDropdownConstants.bind(this);
  } 

  selectTypeOfRegistration(event) {
    this.setState({
      registraiontype: event.target.value
    }, () => {
      if (this.state.registraiontype !== "inspector") {
    
     this.setState({
          registerForm: {firstName:"",lastName:"",email:"",password:"",confirmpassword:"",countryCode:"",phone:"",inspectorCompanyName:"",employmentType: "",qualification: "",title:""},
          registerFormError: {firstName:"",lastName:"",email:"",password: "",confirmpassword:"",countryCode:"",phone:"",employmentType:"",qualification:"",title:""}
        })
  
        document.getElementById('client-register').style.display = "block";
        document.getElementById('inspector-register').style.display = "none";
      }
      else {
     this.setState({
          registerForm: {firstName:"",lastName:"",email:"",password:"",confirmpassword:"",countryCode:"",phone:"",inspectorCompanyName:"",employmentType: "",qualification: "",title:"",
                        clientCity:"",clientCountry:"",clientPostalCode:"",registraiontype:""},
          registerFormError: {firstName:"",lastName:"",email:"",password: "",confirmpassword:"",countryCode:"",phone:"", clientCompanyName: ""}
        })  
        document.getElementById('inspector-register').style.display = "block";
        document.getElementById('client-register').style.display = "none";
      }
    })
  }
  
  handleInputChange (event) {
    event.persist();
    this.setState((state) => { state.registerForm[event.target.name] = event.target.value });
    console.log("Name"+JSON.stringify(event.target.name)+"value"+JSON.stringify(event.target.value))
  }

  handleCountryChange = (countryCode) => {
    console.log(JSON.stringify(countryCode))
    this.setState({ countryCode });
    console.log(`Selected Option: ${countryCode.value}`);
  
  }

  handleEmploymentTypeChange = (employmentType) => {
    console.log(JSON.stringify(employmentType))
    this.setState({ employmentType });
    console.log(`Selected Option: ${employmentType.value}`);
  
  }

  handleQualificationChange = (qualification) => {
    console.log(JSON.stringify(qualification))
    this.setState({ qualification });
    console.log(`Selected Option: ${qualification.value}`);
  
  }

  handleInspectorCountryChange = (inspectorCountry) => {
    console.log(JSON.stringify(inspectorCountry))
    this.setState({ inspectorCountry });
    console.log(`Selected Option: ${inspectorCountry.value}`);
  
  }

  handleTitleChange = (title) => {
    console.log(JSON.stringify(title))
    this.setState({ title });
    console.log(`Selected Option: ${title.value}`);
  
  }

  handleChange = (selectedOption) => {
    console.log(JSON.stringify(selectedOption))
    this.setState({ selectedOption });
    console.log(`Selected Option: ${selectedOption.value}`);
  
  }
  componentWillMount(){
    // this.getDropdownConstants();
  }
   // getDropdownConstants() {
  //   fetch("http://sis-beta.us-east-1.elasticbeanstalk.com/init/getDropdownConstants",{
  //     method:'GET',
  //     headers : {
  //         "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxd2VydHlAZ21haWwuY29tIiwiZXhwIjoxNTMyMDc3MTQ4fQ.D_WvIwv2E891YW_GMwwK6OfJifZDmtTLexaWhOUnpDUjn9C2ZRGVejbTVOwnu1tr0Il7ofcOZeiJsbeScsyAug"
  //     }
  //     }).then((response) => response.json()).then((res) => {
  //         console.log("getData...."+JSON.stringify(res))
  //         //return res;
  //     })
  //     .catch((error)=>{
  //         console.log("getData.error..."+JSON.stringify(error))
  //         //return error;
  //     })
  // }
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

  validate() {
    if (!this.state.registerForm.email.includes("@")) {
      this.setState((state) => state.registerFormError.email = 'Invalid Email');
    } else {
      this.setState((state) => state.registerFormError.email = '');
    }
  }

  
  handleLocationInputChange (event) {
    event.persist();
    this.setState((state) => { state.registerForm.location[event.target.name] = event.target.value });
    console.log("Name"+JSON.stringify(event.target.name)+"value"+JSON.stringify(event.target.value))
  }

  toggleAgreementCheckBox (event) {
    event.persist();
    this.setState((state) => { state.termsAgreed = event.target.checked});
  }

  handleSubmit(event) {
    event.preventDefault();
    var error = false;
    console.log(this.state);

    var registerFormError = {  firstName: "",lastName: "", email: "", password: "",confirmpassword: "",countryCode:"",phone: "",  clientCompanyName: "",employmentType:"",qualification: "" };

    if(this.state.registerForm.firstName == "") {
      error = true;
      registerFormError.firstName = "This field is mandatory";
    }
    if(this.state.registerForm.lastName == "") {
      error = true;
      registerFormError.lastName = "This field is mandatory";
    }
    
    if(this.state.registerForm.email == "") {
      error = true;
      registerFormError.email = "This field is mandatory";
    }

    if(this.state.registerForm.password == "") {
      registerFormError.password = "This field is mandatory";
      error = true;
    }

    // if(this.state.registerForm.confirmpassword == "") {
    //   registerFormError.confirmpassword = "This field is mandatory";
    //   error = true;
    // }
    //check if 2 passwords match
    // if(this.state.registerForm.password != "" && this.state.registerForm.confirmpassword != "" && 
    //   this.state.registerForm.password !== this.state.registerForm.confirmpassword) {
    //   error = true;
    //   registerFormError.confirmpassword = "Both passwords do not match";
    // }
    if(this.state.registerForm.countryCode == "") {
      registerFormError.countryCode = "This field is mandatory";
      error = true;
    }

    if(this.state.registerForm.phone == "") {
      registerFormError.phone = "This field is mandatory";
      error = true;
    }

    if(this.state.registerForm.clientCompanyName == "") {
      error = true;
      registerFormError.clientCompanyName = "This field is mandatory";
    }

    if(this.state.userType=="client")
    {
      if(this.state.registerForm.employmentType == "") {
        registerFormError.employmentType = "This field is mandatory";
        error = true;
      }
  
      if(this.state.registerForm.qualification == "") {
        registerFormError.qualification = "This field is mandatory";
        error = true;
      }
  
      if(this.state.registerForm.title == "") {
        registerFormError.title = "This field is mandatory";
        error = true;
      }
    }
   
    
    if(this.state.registerForm.firstName!='' &&this.state.registerForm.lastName!='' && this.state.registerForm.email != "" && this.state.registerForm.password != ""&&this.state.countryCode != ""&&this.state.registerForm.clientCompanyName != ""&&this.state.registerForm.phone != ""){
         error = false;
    }

    // dynamic data
    var data={
       email : this.state.registerForm.email,
       password : this.state.registerForm.password,
       firstName  : this.state.registerForm.firstName,
       lastName : this.state.registerForm.lastName,
       type:this.state.userType,
       company:this.state.registerForm.clientCompanyName,
       phone:this.state.registerForm.phone,
       code:this.state.countryCode.value

    }

    if(error) {
      //alert("error")
      this.setState( (state) => { state.registerFormError = registerFormError; state.signUpSuccess = false;});
      return;
    }else{
    //alert("user type "+this.state.userType)
    console.log("data "+JSON.stringify(data))
    this.props.registerMe(data);
   }
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
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    
    const { countryCode } = this.state;
    const country = countryCode && countryCode.value;

    const { employmentType } = this.state;
    const employment = employmentType && employmentType.value;

    const { qualification } = this.state;
    const selectedQualification = qualification && qualification.value;

    const { inspectorCountry } = this.state;
    const selectedInspectorCountry = inspectorCountry && inspectorCountry.value;

    const { title } = this.state;
    const selectedTitle = title && title.value;
    
    if(!this.state.signUpSuccess) {
      return (
        <div className="section bg-gray registerSec">
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-12 SignUpFormSec p-5 position-relative">
                {/* Material form login */}
                <form id="RegistrationForm" className="mb-5 pb-5"  onSubmit={this.handleSubmit} action="/" method="post">
                  <p className="h4 text-blue mb-4 SignUpTitleMain pl-0">Register on ShipInspectors.com</p>
                  <p className="h4 text-blue mb-4 loginTitle pl-0">Select Client or Inspector</p>
                  <div className="position-relative mDivider">
                    <div className="divider" />
                    <div className="triangle-down" />
                  </div>
                  <div className="d-flex loginType pt-3 pl-0" onChange={this.selectTypeOfRegistration.bind(this)}>
                    <div>
                      <input className="with-gap" type="radio" name="usertype" value="Customer" id="client" defaultChecked />
                      <label htmlFor="client">Client</label>
                    </div>
                    <div className="pl-4">
                      <input className="with-gap" type="radio" value="inspector" name="usertype" id="inspector" />
                      <label htmlFor="inspector">Inspector</label>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/user.png" alt />
                        <input id="firstName" type="text" name="firstName" value={this.state.registerForm.firstName} onChange={this.handleInputChange}/>
                        <label htmlFor="firstName">First Name
                          <span className="required">*</span>
                        </label>
                        <div className="errorField">{this.state.registerFormError.firstName}</div>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/user.png" alt />
                        <input id="lastName" type="text" name="lastName" value={this.state.registerForm.lastName} onChange={this.handleInputChange} />
                        <label htmlFor="lastName">Last Name
                          <span className="required">*</span>
                        </label>
                        <div className="errorField">{this.state.registerFormError.lastName}</div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/at.png" alt />
                        <input id="email" type="text" name="email" value={this.state.registerForm.email} onChange={this.handleInputChange} />
                        <label htmlFor="email">Email Address
                          <span className="required">*</span>
                        </label>
                        <div className="errorField">{this.state.registerFormError.email}</div> 
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                      <img className="prefix grey-text" src="/public/img/key.png" alt=""/>
                        <input id="password" name="password" type="password" value={this.state.registerForm.password} onChange={this.handleInputChange}/>
                        <label htmlFor="password">Password
                          <span className="required">*</span>
                        </label>
                        <div className="errorField">{this.state.registerFormError.password}</div> 
                      </div>
                    </div>
                  </div>
                  <div className="d-flex col-md-6 pl-0">
                    <div className="col-md-6 pl-0" id="containerCountryCode">
                    <Select
                      name="form-field-name"
                      placeholder="Code"
                      value={country}
                      onChange={this.handleCountryChange}
                      options={[
                        { value: '+91', label: '+91' },
                        { value: '+1', label: '+1' },
                      ]}/>
                      <div className="errorField mt-18">{this.state.registerFormError.countryCode}</div> 
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <input id="phone" name="phone" type="text" value={this.state.registerForm.phone} onChange={this.handleInputChange}/>
                        <label htmlFor="phone">Phone
                          <span className="required">*</span>
                        </label>
                        <div className="errorField">{this.state.registerFormError.phone}</div> 
                      </div>
                    </div>
                  </div>
                  <div id="client-register">
                  <p className="officeAddress my-3 col-md-12 text-gray fs-16 pl-0">
                    Office Address
                  </p>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <input id="clientCompanyName" name="clientCompanyName" type="text" value={this.state.registerForm.clientCompanyName} onChange={this.handleInputChange}/>
                        <label htmlFor="clientCompanyName">Company Name</label>
                        <div className="errorField">{this.state.registerFormError.clientCompanyName}</div> 
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <input id="building" name="building" type="text" value={this.state.registerForm.building} onChange={this.handleInputChange}/>
                        <label htmlFor="building">Building</label>
                      </div>
                      </div>
                  </div>
                  <div className="d-flex mb-5">
                  <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <input id="street" name="street" type="text" value={this.state.registerForm.street} onChange={this.handleInputChange}/>
                        <label htmlFor="street">Street</label>
                      </div>
                   </div>
                   <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <input id="clientCity" name="clientCity" type="text" value={this.state.registerForm.clientCity} onChange={this.handleInputChange}/>
                        <label htmlFor="clientCity">City</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                  <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <input id="clientCountry" name="clientCountry" type="text" value={this.state.registerForm.clientCountry} onChange={this.handleInputChange}/>
                        <label htmlFor="country">Country</label>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <input id="clientPostalCode" name="clientPostalCode" type="text" value={this.state.registerForm.clientPostalCode} onChange={this.handleInputChange}/>
                        <label htmlFor="clientPostalCode">Postal Code</label>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="dnone" id="inspector-register">
                  <p className="officeAddress my-3 col-md-12 text-gray pl-0 fs-16">
                    Your Other Details
                  </p>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <input id="inspectorCompanyName"  name="inspectorCompanyName" type="text" value={this.state.registerForm.inspectorCompanyName} onChange={this.handleInputChange}/>
                        <label htmlFor="inspectorCompanyName">Company Name</label>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0" id="employmentTypeContainer">
                    <Select
                      name="form-field-name"
                      value={employment}
                      placeholder="Employment Type"
                      onChange={this.handleEmploymentTypeChange}
                      options={[
                        { value: 'one', label: 'One' },
                        { value: 'two', label: 'Two' },
                      ]}
                    />
                      <div className="errorField mt-18">{this.state.registerFormError.employmentType}</div> 
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0" id="qualificationContainer">
                    <Select
                      name="form-field-name"
                      placeholder="Qualification"
                      value={selectedQualification}
                      onChange={this.handleQualificationChange}
                      options={[
                        { value: 'MCA', label: 'MCA' },
                        { value: 'B.tech', label: 'B.tech' },
                      ]}/>
                      <div className="errorField mt-18">{this.state.registerFormError.qualification}</div>
                    </div>
                    <div className="col-md-6 pr-0" id="titleContainer">
                    <Select
                      name="form-field-name"
                      placeholder="Title"
                      value={selectedTitle}
                      onChange={this.handleTitleChange}
                      options={[
                        { value: 'title1', label: 'title1' },
                        { value: 'title2', label: 'title2' },
                      ]}/>
                      <div className="errorField mt-18">{this.state.registerFormError.title}</div>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0" id="inspectorCityContainer">
                    <Select
                      name="form-field-name"
                      placeholder="Country"
                      value={selectedInspectorCountry}
                      onChange={this.handleInspectorCountryChange}
                      options={[
                        { value: 'US', label: 'USA' },
                        { value: 'UK', label: 'UK' },
                      ]}/>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <input id="inspectorPostalCode" name="inspectorPostalCode" type="text" value={this.state.registerForm.postalcode} onChange={this.handleInputChange}/>
                        <label htmlFor="inspectorPostalCode">Postal Code</label>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="signUpsmText col-md-12 text-gray py-4 pl-0 fs-14">
                    By clicking sign up button, I confirm I have read and accept Sinotech Marine
                    <a className="rcolor"> Privacy Policy </a> and
                    <a className="rcolor"> Terms and Conditions </a>.
                  </div>
                  <div className="position-absolute signUpBtm w-100 col-md-12 py-3">
                  <div className="daj signUpBtmBg py-3">
                    <div className="text-center">
                      <input type="submit" className="btn btn-outline-pink loginBtn mr-20" defaultValue="SIGN UP"/>
                      <input type="button" defaultValue="RESET" className="btn btn-outline-gray loginBtn"/>
                    </div>
                  </div>
                </div>
                </form>
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