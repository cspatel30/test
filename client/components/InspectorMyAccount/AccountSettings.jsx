import React, { Component } from 'react';
import Calendar from '../../resources/static/img/calendar.png';

class Settings extends Component {
  render() {
    const email = "abc@hkohlr.us";
    return (
      <div className="InspectorMyAccount-Settings">
        <div className="row">
          <div className="col-sm-1 col-2">
              <i className="fa fa-envelope" />
            </div>
            <div className="col-sm-11 col-10">
              <p><span>Email:</span> {email}</p>
            </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-12 field">
            <label>Old Password</label>
            <input type="password" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 field">
            <label>New Password</label>
            <input type="password" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 field">
            <label>Confirm Password</label>
            <input type="password" />
          </div>
        </div>
        <br />
        <div style={{ paddingLeft: 0 }} className="col-md-12">
          <button className="secondary">CHANGE PASSWORD</button>
        </div>
      </div>
    )
  }
}
export default Settings;