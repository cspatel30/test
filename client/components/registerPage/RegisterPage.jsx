import React, { Component } from 'react';
import _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import VirtualizedSelect from 'react-virtualized-select';
import Select from 'react-select-plus';
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
      userType: "CUSTOMER",
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
        inspectorPostalCode:"",
        position: "",
        userType:""
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
      title:"",
      code:[],
      country:[],
      Qualifications:[],
      topTitles:[],
      titles:[],
      employmentTypes:[]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTabButtonClassName = this.getTabButtonClassName.bind(this);
    this.toggleAgreementCheckBox = this.toggleAgreementCheckBox.bind(this);
    this.handleAgreementPopupOpen = this.handleAgreementPopupOpen.bind(this);
    this.handleAgreementPopupClose = this.handleAgreementPopupClose.bind(this);
    this.portOptionRenderer = this.portOptionRenderer.bind(this);
    this.selectTypeOfRegistration = this.selectTypeOfRegistration.bind(this);
  } 

  selectTypeOfRegistration(event) {
    this.setState({
      userType: event.target.value
    }, () => {
    if (this.state.userType !== "INSPECTOR") {
    
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
                        clientCity:"",clientCountry:"",clientPostalCode:"",userType:""},
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
    console.log(title)
    this.setState({ title });
    console.log(`Selected Option: ${title.value}`);
  
  }

  handleChange = (selectedOption) => {
    console.log(JSON.stringify(selectedOption))
    this.setState({ selectedOption });
    console.log(`Selected Option: ${selectedOption.value}`);
  
  }
  componentDidMount() {
    var countries = localStorage.getItem('countries')?JSON.parse(localStorage.getItem('countries')):""

    var Qualifications = localStorage.getItem('Qualification')?JSON.parse(localStorage.getItem('Qualification')):""

    var employmentTypes = localStorage.getItem('employmentType')?JSON.parse(localStorage.getItem('employmentType')):""

    var titles = localStorage.getItem('titles')?JSON.parse(localStorage.getItem('titles')):""
    
    if(countries!="") {
      var A = []
      var X = []
      if(countries.length>0) {
        countries.map((country, key)=>{
          if(country){
            var C = country
            var B = {}
            var Y = {}
            B.value=C.phoneCode,
            B.label="+"+C.phoneCode
            Y.value=C.id,
            Y.label=C.name
            A.push(B)
            X.push(Y)
          }
        })
        this.setState({
          code:A,
          country:X
          })
      }
    }
    if(titles!="") {
      var topTitlesArr = []
      var titlesArr = []
      var secObj = {}
      Object.keys(titles).map((title, index) =>{
        if(index<=5){
          var topTitlesObj={}
          var label = titles[title]
          topTitlesObj.label=label
          topTitlesObj.value=title
          topTitlesArr.push(topTitlesObj)
        }else {
          var titlesObj={}
          var label = titles[title]
          titlesObj.label=label
          titlesObj.value=title
          titlesArr.push(titlesObj)
        }
      })
      secObj.label = "────────────────"
      secObj.options = titlesArr;
      topTitlesArr.push(secObj)
      this.setState({
        topTitles:topTitlesArr,
        titles:titlesArr
      })
    }
    if(Qualifications!="") {
      var Qualify = []
      Object.keys(Qualifications).map((title, index) =>{
          var qualificationObj={}
          var label = Qualifications[title]
          qualificationObj.label=label
          qualificationObj.value=title
          Qualify.push(qualificationObj)
      })
      this.setState({
        Qualifications:Qualify
      })
    }
    if(employmentTypes!="") {
      var empTypes = []
      Object.keys(employmentTypes).map((title, index) =>{
          var empTypesObj={}
          var label = employmentTypes[title]
          empTypesObj.label=label
          empTypesObj.value=title
          empTypes.push(empTypesObj)
      })
      this.setState({
        employmentTypes:empTypes
      })
    }
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
  resetform(){ 
    if (this.state.userType !== "INSPECTOR") {
      this.setState({countryCode:"",code:"",
      registerForm: {firstName:"",lastName:"",email:"",password:"",confirmpassword:"",countryCode:"",phone:"",inspectorCompanyName:"",employmentType: "",qualification: "",title:"",clientCity:"",clientCountry:"",clientPostalCode:"",userType:"",building:"",street:"",clientCompanyName:""                
      }})
    }
    else{
    this.setState({countryCode:"", cod:"",employmentType:"",qualification:"",title:"",inspectorCountry:"",registerForm: { firstName:"", lastName:"", email:"", password:"", phone:"",  inspectorPostalCode:"",inspectorCompanyName:""}})
    }
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

    if(this.state.userType=="INSPECTOR")
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
    if (this.state.userType !== "INSPECTOR") {
      var data={
        type:this.state.userType,
        firstName  : this.state.registerForm.firstName,
        lastName : this.state.registerForm.lastName,
        email : this.state.registerForm.email,
        password : this.state.registerForm.password,
        code:this.state.countryCode.value,
        phone:this.state.registerForm.phone,
        company:this.state.registerForm.clientCompanyName,
        building:this.state.registerForm.building,
        street:this.state.registerForm.street,
        city:this.state.registerForm.clientCity,
        country:this.state.inspectorCountry.value,
        postalCode:this.state.registerForm.clientPostalCode
        
     }
    }else {
      var data={
        type:this.state.userType,
        firstName  : this.state.registerForm.firstName,
        lastName : this.state.registerForm.lastName,
        email : this.state.registerForm.email,
        password : this.state.registerForm.password,
        code:this.state.countryCode.value,
        phone:this.state.registerForm.phone,
        company:this.state.registerForm.inspectorCompanyName,
        employmentType:this.state.employmentType.value,
        qualification:this.state.qualification.value,
        title:this.state.title.value,
        country:this.state.inspectorCountry.value,
        postalCode:this.state.registerForm.inspectorPostalCode
     }
    }

    if(error) {
      //alert("error")
      this.setState( (state) => { state.registerFormError = registerFormError; state.signUpSuccess = false;});
      return;
    }else{
      //console.log("$!GN UP: "+JSON.stringify(data))
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

    const { title,topTitles } = this.state;
    const selectedTitle = title && title.value;
    if(topTitles.length>0){
      var Titles = topTitles
    }
    if(!this.state.signUpSuccess) {
      return (
        <div className="section bg-gray registerSec">
          <div className="container">
            <div className="row col-md-10 mx-auto mt-5">
              <div className="col-md-12 SignUpFormSec p-5 position-relative">
           
                <form id="RegistrationForm" className="mb-5 pb-5"  onSubmit={this.handleSubmit} action="/" method="post">
                  <p className="h4 text-blue mb-4 SignUpTitleMain pl-0">Register on ShipInspectors.com</p>
                  <p className="h4 text-blue mb-4 loginTitle pl-0">Select Client or Inspector</p>
                  <div className="position-relative mDivider">
                    <div className="divider" />
                    <div className="triangle-down" />
                  </div>
                  <div className="d-flex loginType pt-3 pl-0" onChange={this.selectTypeOfRegistration.bind(this)} style={{paddingBottom:"35px"}}>
                    <div>
                      <input className="with-gap" type="radio" name="usertype" value="CUSTOMER" id="client" defaultChecked />
                      <label htmlFor="client">Client</label>
                    </div>
                    <div className="pl-4">
                      <input className="with-gap" type="radio" value="INSPECTOR" name="usertype" id="inspector" />
                      <label htmlFor="inspector">Inspector</label>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/user.png" alt />
                        <input id="firstName" type="text" name="firstName" value={this.state.registerForm.firstName} onChange={this.handleInputChange} placeholder="First Name"/>
                        {/* <label htmlFor="firstName">First Name
                          <span className="required">*</span>
                        </label> */}
                        <div className="errorField">{this.state.registerFormError.firstName}</div>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/user.png" alt />
                        <input id="lastName" type="text" name="lastName" value={this.state.registerForm.lastName} onChange={this.handleInputChange}  placeholder="Last Name" />
                        {/* <label htmlFor="lastName">Last Name
                          <span className="required">*</span>
                        </label> */}
                        <div className="errorField">{this.state.registerFormError.lastName}</div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/at.png" alt />
                        <input id="email" type="text" name="email" value={this.state.registerForm.email} onChange={this.handleInputChange}  placeholder="Email Address" />
                        {/* <label htmlFor="email">Email Address
                          <span className="required">*</span>
                        </label> */}
                        <div className="errorField">{this.state.registerFormError.email}</div> 
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                      <img className="prefix grey-text" src="/public/img/key.png" alt=""/>
                        <input id="password" name="password" type="password" value={this.state.registerForm.password} onChange={this.handleInputChange} placeholder="Password"/>
                        {/* <label htmlFor="password">Password
                          <span className="required">*</span>
                        </label> */}
                        <div className="errorField">{this.state.registerFormError.password}</div> 
                      </div>
                    </div>
                  </div>
                  <div className="d-flex col-md-6 pl-0">
                    <div className="col-md-6 pl-0" id="containerCountryCode">
                    <Select
                      name="form-field-name"
                      placeholder="Code"
                      openOnFocus={true}
                      value={country}
                      onChange={this.handleCountryChange}
                      options={this.state.code}/>
                      <div className="errorField mt-18">{this.state.registerFormError.countryCode}</div> 
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <input id="phone" name="phone" type="number" value={this.state.registerForm.phone} onChange={this.handleInputChange} placeholder="Phone" maxLength={10}/>
                        {/* <label htmlFor="phone">Phone
                          <span className="required">*</span>
                        </label> */}
                        <div className="errorField">{this.state.registerFormError.phone}</div> 
                      </div>
                    </div>
                  </div>
                  <div id="client-register">
                  <p className="officeAddress my-3 col-md-12 text-left fs-16 pl-0">
                    Office Address
                  </p>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <input id="clientCompanyName" name="clientCompanyName" type="text" value={this.state.registerForm.clientCompanyName} onChange={this.handleInputChange} placeholder="Company Name"/>
                        {/* <label htmlFor="clientCompanyName">Company Name</label> */}
                        <div className="errorField">{this.state.registerFormError.clientCompanyName}</div> 
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <input id="building" name="building" type="text" value={this.state.registerForm.building} onChange={this.handleInputChange} placeholder="Building"/>
                        {/* <label htmlFor="building">Building</label> */}
                      </div>
                      </div>
                  </div>
                  <div className="d-flex mb-5">
                  <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <input id="street" name="street" type="text" value={this.state.registerForm.street} onChange={this.handleInputChange} placeholder="Street"/>
                        {/* <label htmlFor="street">Street</label> */}
                      </div>
                   </div>
                   <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <input id="clientCity" name="clientCity" type="text" value={this.state.registerForm.clientCity} onChange={this.handleInputChange} placeholder="City"/>
                        {/* <label htmlFor="clientCity">City</label> */}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                        <Select
                          name="form-field-name"
                          placeholder="Country"
                          openOnFocus={true}
                          value={selectedInspectorCountry}
                          onChange={this.handleInspectorCountryChange}
                          options={this.state.country}/>
                      {/* <div className="input-field">
                        <input id="clientCountry" name="clientCountry" type="text" value={this.state.registerForm.clientCountry} onChange={this.handleInputChange} placeholder="Country"/>
                      </div> */}
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <input id="clientPostalCode" name="clientPostalCode" type="number" value={this.state.registerForm.clientPostalCode} onChange={this.handleInputChange} placeholder="Postal Code"/>
                        {/* <label htmlFor="clientPostalCode">Postal Code</label> */}
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="dnone" id="inspector-register">
                  <p className="officeAddress my-3 col-md-12 text-left fs-16 pl-0">
                    Your Other Details
                  </p>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <input id="inspectorCompanyName"  name="inspectorCompanyName" type="text" value={this.state.registerForm.inspectorCompanyName} onChange={this.handleInputChange} placeholder="Company Name"/>
                        {/* <label htmlFor="inspectorCompanyName">Company Name</label> */}
                      </div>
                    </div>
                    <div className="col-md-6 pr-0" id="employmentTypeContainer">
                    <Select
                      name="form-field-name"
                      openOnFocus={true}
                      value={employment}
                      placeholder="Employment Type"
                      onChange={this.handleEmploymentTypeChange}
                      options={this.state.employmentTypes}
                    />
                      <div className="errorField mt-18">{this.state.registerFormError.employmentType}</div> 
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0" id="qualificationContainer">
                    <Select
                      name="form-field-name"
                      placeholder="Qualification"
                      openOnFocus={true}
                      value={selectedQualification}
                      onChange={this.handleQualificationChange}
                      options={this.state.Qualifications}/>
                      <div className="errorField mt-18">{this.state.registerFormError.qualification}</div>
                    </div>
                    <div className="col-md-6 pr-0" id="titleContainer">
                    <Select
                      name="form-field-name"
                      placeholder="Title"
                      openOnFocus={true}
                      value={selectedTitle}
                      onChange={this.handleTitleChange}
                      options={Titles}/>
                      <div className="errorField mt-18">{this.state.registerFormError.title}</div>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0" id="inspectorCityContainer">
                    <Select
                      name="form-field-name"
                      placeholder="Country"
                      openOnFocus={true}
                      value={selectedInspectorCountry}
                      onChange={this.handleInspectorCountryChange}
                      options={this.state.country}/>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <input id="inspectorPostalCode" name="inspectorPostalCode" type="number" value={this.state.registerForm.inspectorPostalcode} onChange={this.handleInputChange} placeholder="Postal Code"/>
                        {/* <label htmlFor="inspectorPostalCode">Postal Code</label> */}
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="signUpsmText col-md-12 text-gray py-4 pl-0 fs-14">
                    By clicking sign up button, I confirm I have read and accept Sinotech Marine
                    <a className="rcolor pointer" onClick={()=> this.props.history.push('/policy/')}> Privacy Policy </a> and
                    <a className="rcolor pointer" onClick={()=> this.props.history.push('/terms/')}> Terms and Conditions </a>.
                  </div>
                  <div className="position-absolute signUpBtm w-100 col-md-12 py-3">
                  <div className="daj signUpBtmBg py-3">
                    <div className="text-center d-flex">
                      <input type="submit" className="btn btn-outline-pink loginBtn mr-20" defaultValue="SIGN UP"/>
                      <input type="button" defaultValue="RESET" className="btn btn-outline-gray loginBtn" onClick ={this.resetform.bind(this)}/>
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
          	{this.renderActionMessage()}
            {this.renderForm()}
          </div>
      );
  }
}