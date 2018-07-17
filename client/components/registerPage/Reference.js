<div className="section bg-gray registerSec">
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-12 SignUpFormSec p-5 position-relative">
                {/* Material form login */}
                <form className="mb-5 pb-5"  onSubmit={this.handleSubmit} action="/" method="post">
                  <p className="h4 text-blue mb-4 SignUpTitleMain pl-0">Register on ShipInspectors.com</p>
                  <p className="h4 text-blue mb-4 loginTitle pl-0">Select Client or Inspector</p>
                  <div className="position-relative mDivider">
                    <div className="divider" />
                    <div className="triangle-down" />
                  </div>
                  <div className="d-flex loginType pt-3 pl-0" onChange={this.selectTypeOfRegistration.bind(this)}>
                    <div>
                      <input className="with-gap" type="radio" name="usertype" value="client" id="client" defaultChecked />
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
                        <input id="firstName" type="text" name="fname" value={this.state.registerForm.fname} onChange={this.handleInputChange}/>
                        <label htmlFor="firstName">First Name
                          <span className="required">*</span>
                        </label>
                        <div className="errorField">{this.state.registerFormError.fname}</div>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/user.png" alt />
                        <input id="lastName" type="text" name="lname" value={this.state.registerForm.lname} onChange={this.handleInputChange} />
                        <label htmlFor="lastName">Last Name
                          <span className="required">*</span>
                        </label>
                        <div className="errorField">{this.state.registerFormError.lname}</div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                      <div className="input-field">
                        <img className="prefix grey-text" src="/public/img/at.png" alt />
                        <input id="email" type="text"  name="email" value={this.state.registerForm.email} onChange={this.handleInputChange} />
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
                    <div className="col-md-6 pl-0">
                      <select id="countryCode" name="countryCode"  onChange={this.handleInputChange} >
                        <option value="Code" disabled selected required>Code</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
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
                        <input id="clientCompanyName" name="clientCompanyName" type="text" value={this.state.registerForm.company} onChange={this.handleInputChange}/>
                        <label htmlFor="clientCompanyName">Company Name</label>
                        <div className="errorField">{this.state.registerFormError.company}</div> 
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
                        <input id="country" name="country" type="text" value={this.state.registerForm.country} onChange={this.handleInputChange}/>
                        <label htmlFor="country">Country</label>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="input-field">
                        <input id="clientPostalCode" name="clientPostalCode" type="text" value={this.state.registerForm.postalcode} onChange={this.handleInputChange}/>
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
                        <input id="inspectorCompanyName"  name="inspectorCompanyName" type="text" value={this.state.registerForm.company} onChange={this.handleInputChange}/>
                        <label htmlFor="inspectorCompanyName">Company Name</label>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <select   name="empoymentType" defaultValue={this.state.registerForm.employmentType} onChange={this.handleInputChange}>
                        <option value disabled selected required>Employment Type</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
                      <div className="errorField mt-18">{this.state.registerFormError.employmentType}</div> 
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                      <select  name="qualification" defaultValue={this.state.registerForm.qualification} onChange={this.handleInputChange}>
                        <option value disabled selected required>Qualification</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
                      <div className="errorField mt-18">{this.state.registerFormError.qualification}</div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <select name="title" defaultValue={this.state.registerForm.title} onChange={this.handleInputChange}>
                        <option value disabled selected required>Title</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
                      <div className="errorField mt-18">{this.state.registerFormError.title}</div>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
                      <select name="inspectorCity" defaultValue={this.state.registerForm.city} onChange={this.handleInputChange}>
                        <option value disabled selected required>City</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
                    </div>
                    <div className="col-md-6 pr-0">
                      <select name="inspectorCountry" defaultValue={this.state.registerForm.country} onChange={this.handleInputChange}>
                        <option value disabled selected required>Country</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="col-md-6 pl-0">
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
                      <input type="submit" className="btn btn-outline-pink loginBtn" defaultValue="SIGN UP"/>
                      <input type="button" defaultValue="RESET" className="btn btn-outline-gray loginBtn ml-5"/>
                    </div>
                  </div>
                </div>

                </form>
              </div>
            </div>
          </div>
        </div>