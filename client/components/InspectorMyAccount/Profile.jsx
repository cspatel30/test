import React, { Component } from 'react';
import Calendar from '../../resources/static/img/calendar.png';

class Profile extends Component {
  render() {
    const profile = {
      img: '/public/img/companyLogo.png',
      title: 'MAERSK SINGAPORE PTE LTD',
      inspectorId: '2341XS',
      companyName: 'Swissmalaybr',
      email: 'creamin@maersk.com',
      phone1: '417-799-7107',
      phone2: '068-342-5346',
      website: 'www.maerskline.com',
    };
    return (
      <div className="InspectorMyAccount-Profile">
        <h4>{profile.title}</h4>
        <div className="imageWrapper">
          <img src={profile.img} />
        </div>
        <div className="InspectorMyAccount-Profile-Form">
          <div className="row">
            <div className="col-sm-1 col-2">
              <i className="fa fa-id-card" />
            </div>
            <div className="col-sm-11 col-10">
              <p><span>Inspector ID:</span> #{profile.inspectorId}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-1 col-2">
              <i className="fa fa-building" />
            </div>
            <div className="col-sm-11 col-10">
              <p><span>Company Name:</span> {profile.companyName}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-1 col-2">
              <i className="fa fa-envelope" />
            </div>
            <div className="col-sm-11 col-10">
              <p><span>Email:</span> {profile.email}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-1 col-2">
              <i className="fa fa-phone" />
            </div>
            <div className="col-sm-11 col-10">
              <p><span>Phone 1:</span> {profile.phone1}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-1 col-2">
              <i className="fa fa-mobile" />
            </div>
            <div className="col-sm-11 col-10">
              <p><span>Phone 2:</span> {profile.phone2}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-1 col-2">
              <i className="fa fa-globe" />
            </div>
            <div className="col-sm-11 col-10">
              <p><span>Website ID:</span> {profile.website}</p>
            </div>
          </div>
          <br />
          <div style={{ paddingLeft: 0 }} className="col-md-12">
            <button className="secondary">UPDATE</button>
          </div>
        </div>
      </div>
    )
  }
}
export default Profile;