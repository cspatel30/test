import React, { Component } from "react";

class ProfileEdit extends React.Component {
  state = {
    userProfile: {
      id: "",
      name: "",
      Phone: "",
      email: "",
      work_phone: ""
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
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log("inside handle change " ,event.target, value, name);

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
          <div className="form-group informationText">
            <label htmlFor="id" >Customer Id</label>
            <input
              id="id"
              className="form-control"
              type="text"
              name="id"
              readOnly
              value={this.state.userProfile.id}
              onChange={e => {
                this.handleChange(e);
              }}
              required
            />
          </div>
          <div className="form-group informationText">
            <label htmlFor="name" >Person in charge (PIC)</label>
            <input
              id="name"
              name="name"
              className="form-control"
              type="text"
              value={this.state.userProfile.name}
              onChange={e => {
                this.handleChange(e);
              }}
              required
            />
          </div>
          <div className="form-group informationText">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              className="form-control"
              type="text"
              name="phone"
              value={this.state.userProfile.phone}
              onChange={e => {
                this.handleChange(e);
              }}
              required
            />
          </div>
          <div className="form-group informationText">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form-control"
              type="text"
              name="email"
              readOnly
              value={this.state.userProfile.email}
              onChange={e => {
                this.handleChange(e);
              }}
              required
            />
          </div>
          <div className="form-group informationText">
            <label htmlFor="work_phone">Fax</label>
            <input
              id="work_phone"
              className="form-control"
              type="text"
              name="work_phone"
              value={this.state.userProfile.work_phone}
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </div>
          <div className="form-group informationText">
            <label htmlFor="company">Website</label>
            <input
              id="company"
              className="form-control"
              type="text"
              name="company"
              value={this.state.userProfile.company}
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

export default ProfileEdit;
