import React, { Component } from "react";

class AddressEdit extends React.Component {
  state = {
    userProfile: {
      building: "",
      street: "",
      city: "",
      countryCode: "",
      postal_code: "",
      emailId: ""
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      userProfile: this.props.userProfile
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted successfully ", this.state.userProfile);
    this.props.onSubmit(this.state.userProfile);
    alert("Address updated successfully");
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      userProfile: {...this.state.userProfile, [name]: value}
    });
  }

  render() {
    return (
      <div className="col-sm-9">
        <form
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <div className="form-group">
            <label htmlFor="building">Building</label>
            <input
              id="building"
              className="form-control"
              type="text"
              name="building"
              value={this.state.userProfile.building}
              onChange={e => {
                this.handleChange(e);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              id="street"
              name="street"
              className="form-control"
              type="text"
              value={this.state.userProfile.street}
              onChange={e => {
                this.handleChange(e);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              className="form-control"
              type="text"
              name="city"
              value={this.state.userProfile.city}
              onChange={e => {
                this.handleChange(e);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="countryCode">Country</label>
            <input
              id="countryCode"
              className="form-control"
              type="text"
              name="countryCode"
              value={this.state.userProfile.countryCode}
              onChange={e => {
                this.handleChange(e);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="postal_code">Postal Code</label>
            <input
              id="postal_code"
              className="form-control"
              type="text"
              name="postal_code"
              value={this.state.userProfile.postal_code}
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Id</label>
            <input
              id="email"
              className="form-control"
              type="text"
              name="email"
              value={this.state.userProfile.email}
              readOnly
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">SUBMIT</button>
          <button className="btn btn-outline-danger m-2" onClick={() => {this.props.cancelEdit()}}>CANCEL</button>
        </form>
      </div>
    );
  }
}

export default AddressEdit;
