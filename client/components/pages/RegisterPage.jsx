import React, { Component } from 'react';

export default class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registraiontype: "",
      option:""
    }
    this.selectTypeOfRegistration = this.selectTypeOfRegistration.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }

  selectTypeOfRegistration(event) {
    this.setState({
      registraiontype: event.target.value
    }, () => {
      if (this.state.registraiontype === "client") {
        $('#client-register').show();
        $('#inspector-register').hide();
      }
      else {
        $('#inspector-register').show();
        $('#client-register').hide();
      }
    })
  }
  selectOption(event) {
    this.setState({
      option: event.target.value
    }, () => {
      alert(JSON.stringify(this.state.option))
    })
  }
  render() {

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
                <div className="d-flex loginType pt-3 pl-3" onChange={this.selectTypeOfRegistration.bind(this)} >
                  <div>
                    <input type="radio" id="client" name="radio-group" value="client" defaultChecked />
                    <label className="lablePlaceholder" htmlFor="client">Client</label>
                  </div>
                  <div className="pl-4">
                    <input type="radio" id="inspector" name="radio-group" value="inspector" />
                    <label className="lablePlaceholder" htmlFor="inspector">Inspector</label>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col-md-6">
                    <div className="md-form required">
                      <img className="prefix grey-text" src="/public/img/user.png" alt />
                      <input type="email" id="materialFormSignUpFirstName" className="form-control" />
                      <label htmlFor="materialFormLoginFirstName required">First Name <span className="required">*</span></label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form">
                      <img className="prefix grey-text" src="/public/img/user.png" alt />
                      <input type="password" id="materialFormSignUpLastName" className="form-control" />
                      <label htmlFor="materialFormSignUpLastName">Last Name <span className="required">*</span></label>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col-md-6">
                    <div className="md-form">
                      <img className="prefix grey-text" src="/public/img/at.png" alt />
                      <input type="email" id="materialFormSignUpEmail" className="form-control" />
                      <label htmlFor="materialFormSignUpEmail">Email Address <span className="required">*</span></label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form">
                      <img className="prefix grey-text" src="/public/img/key.png" alt />
                      <input type="password" id="materialFormSignUpPassword" className="form-control" />
                      <label htmlFor="materialFormSignUpPassword">Password <span className="required">*</span></label>
                    </div>
                  </div>
                </div>
                <div className="d-flex col-md-6">
                  <div className="col-md-6 pl-0">
                    <div className="md-form">
                      <img className="prefix grey-text" src="/public/img/phone.png" alt />
                      <select className="custom-dropdown">
                        <option>Code</option>
                        <option>+1</option>
                        <option>+91</option>
                        <option>0891</option>
                        <option>08937</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 pr-0">
                    <div className="md-form">
                      <input type="password" id="materialFormSignUpPhone" className="form-control" />
                      <label htmlFor="materialFormSignUpPhone">Phone <span className="required">*</span></label>
                    </div>
                  </div>
                </div>
                <div id="client-register">
                  <p className="officeAddress text-left my-3 col-md-12 text-gray">
                    Office Address
                </p>
                  <div className="d-flex">
                    <div className="col-md-6">
                      <div className="md-form">
                        <input type="email" id="materialFormSignUpCompany" className="form-control" />
                        <label htmlFor="materialFormSignUpCompany">Company <span className="required">*</span></label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="md-form">
                        <input type="password" id="materialFormSignUpBuilding" className="form-control" />
                        <label htmlFor="materialFormSignUpBuilding">Building</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-md-6">
                      <div className="md-form">
                        <input type="email" id="materialFormSignUpStreet" className="form-control" />
                        <label htmlFor="materialFormSignUpStreet">Street</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="md-form">
                        <input type="password" id="materialFormSignUpCity" className="form-control" />
                        <label htmlFor="materialFormSignUpCity">City</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-md-6">
                      <div className="md-form">
                        <input type="email" id="materialFormSignUpCountry" className="form-control" />
                        <label htmlFor="materialFormSignUpCountry">Country</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="md-form">
                        <input type="password" id="materialFormSignUpPostalCode" className="form-control" />
                        <label htmlFor="materialFormSignUpPostalCode">Postal Code</label>
                      </div>
                    </div>
                  </div>
                  <div className="signUpsmText text-left col-md-12 text-gray py-4">
                    By clicking sign up button, I confirm I have read and accept Sinotech Marine
                  <a href>Privacy Policy</a> and
                  <a href>Terms and Conditions</a>.
                </div>
                  <div className="row align-items-center mx-0">
                  </div>
                </div>
                <div id="inspector-register" style={{ display: "none" }}>
                  <p className="officeAddress text-left my-3 col-md-12 text-gray">
                    Your Other Details
                </p>
                  <div className="d-flex">
                    <div className="col-md-6">
                      <div className="md-form">
                        <input type="email" id="materialFormSignUpCompany" className="form-control" />
                        <label htmlFor="materialFormSignUpCompany">Company <span className="required">*</span></label>
                      </div>
                    </div>
                    <div className="col-md-6">
                    <div className="md-form">
                      <select className="custom-dropdown-norm">
                        <option>Employment Type</option>
                        <option>Option1</option>
                        <option>Option2</option>
                        <option>Option3</option>
                        <option>Option4</option>
                      </select>
                    </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-md-6">
                      <div className="md-form">
                        <select className="custom-dropdown-norm">
                        <option>Qualification</option>
                        <option>Option1</option>
                        <option>Option2</option>
                        <option>Option3</option>
                        <option>Option4</option>
                      </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                    <div className="md-form">
                        <select className="custom-dropdown-norm">
                          <option>Title</option>
                          <option>Option1</option>
                          <option>Option2</option>
                          <option>Option3</option>
                          <option>Option4</option>
                      </select>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-md-6">
                    <div className="md-form">
                        <select className="custom-dropdown-norm">
                          <option>City</option>
                          <option>Option1</option>
                          <option>Option2</option>
                          <option>Option3</option>
                          <option>Option4</option>
                      </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                    <div className="md-form">
                        <select className="custom-dropdown-norm">
                          <option>Country</option>
                          <option>Option1</option>
                          <option>Option2</option>
                          <option>Option3</option>
                          <option>Option4</option>
                      </select>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-md-6">
                      <div className="md-form">
                        <input type="password" id="materialFormSignUpPostalCode" className="form-control" />
                        <label htmlFor="materialFormSignUpPostalCode">Postal Code</label>
                      </div>
                    </div>
                  </div>
                  <div className="signUpsmText text-left col-md-12 text-gray py-4">
                    By clicking sign up button, I confirm I have read and accept Sinotech Marine
                  <a href>Privacy Policy</a> and
                  <a href>Terms and Conditions</a>.
                </div>
                  <div className="row align-items-center mx-0">
                  </div>
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
  }
}