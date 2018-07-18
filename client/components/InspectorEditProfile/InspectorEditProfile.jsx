import React, { Component } from 'react';
import ProfileDetails from './ProfileDetails';
import Skills from './Skills';
import Qualifications from './Qualifications';
import Personal from './Personal';
import Documents from './Documents';
import EHistory from './EHistory';
import './InspectorEditProfile.scss';

class InspectorEditProfile extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="InspectorEditProfile">
        <div className="banner">
          <img className="bg" src="/public/img/banner.png" />
          <h1>Edit My Profile</h1>
        </div>
        <ProfileDetails />
        <Skills />
        <Qualifications />
        <Personal />
        <Documents />
        <EHistory />
      </div>
    )
  }
}
export default InspectorEditProfile;