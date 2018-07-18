import React, { Component } from 'react';

class ProfileDetails extends Component {
  render() {
    return (
      <div className="profile-card Details">
        <div className="image-holder">
          <div className="user">
            <img src="/public/img/user_img.png" />
            <button>
              <i className="fa fa-camera" />
              <span>&nbsp;&nbsp;EDIT</span>
            </button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="row form">
          <div className="col-md-6">
            <div className="field">
              <label>Name</label>
              <input placeholder="Raghav" />
            </div>
            <div className="field">
              <label>Email</label>
              <input placeholder="example@gmail.com" />
            </div>
            <div className="field">
              <label>Company</label>
              <input placeholder="Self Employed" />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="field">
                  <input placeholder="Code" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="field">
                  <input placeholder="Phone" />
                </div>
              </div>
            </div>
            <div className="field">
              <input placeholder="Position" />
            </div>
            <div className="field">
              <input placeholder="Qualification" />
            </div>
            <div className="field">
              <input placeholder="City" />
            </div>
            <div className="field">
              <input placeholder="Country" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="field">
              <label>No. of Years</label>
              <input placeholder="15" />
            </div>
            <div className="field">
              <label>Total Inspections</label>
              <input placeholder="5" />
            </div>
            <div className="field">
              <input placeholder="Covered Regions" />
            </div>
            <div className="field">
              <textarea rows="10" placeholder="Career Summary" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ProfileDetails;
