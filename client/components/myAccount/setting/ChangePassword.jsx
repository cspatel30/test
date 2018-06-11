import React, { Component } from "react";

class ChangePassword extends React.Component {

  state = {
    userProfile: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted successfully ", this.state.userProfile);
    if(this.state.newPassword !== this.state.confirmPassword) {
      alert('your password does not match');
      this.resetForm();
      return;
    }
    this.props.onSubmit(this.state);
    this.resetForm();
  }

  resetForm() {
    this.setState({newPassword: '', currentPassword:'', confirmPassword: ''});
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log("inside handle change ", event.target, value, name);

    this.setState({
       [name]: value 
    });
  }


  render() {
    return (
      <div className="col-12">
        <span className="subHeadlineText" >Change Password</span>
        <form
          style={{ padding: '20px 0'}}
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <div className="form-row align-items-center">
            <div className="form-group col">
              <label className="sr-only" htmlFor="id">Current Password</label>
              <input
                id="current password"
                className="form-control"
                type="text"
                name="currentPassword"
                placeholder="Current Password"
                value={this.state.currentPassword}
                onChange={e => {
                  this.handleChange(e);
                }}
                required
              />
            </div>
            <div className="form-group col">
              <label htmlFor="newPassword" className="sr-only">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                className="form-control"
                type="text"
                placeholder="New Password"
                value={this.state.newPassword}
                onChange={e => {
                  this.handleChange(e);
                }}
                required
              />
            </div>
            <div className="form-group col">
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                className="form-control"
                type="text"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={e => {
                  this.handleChange(e);
                }}
                required
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-outline-danger mb-3">CHANGE PASSWORD</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default ChangePassword;