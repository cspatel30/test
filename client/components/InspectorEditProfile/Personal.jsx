import React, { Component } from 'react';
import Calendar from '../../resources/static/img/calendar.png';

class Personal extends Component {
  render() {
    return (
      <div className="profile-card Personal">
        <h1>Personal</h1>
        <div className="row form">
          <div className="col-md-6">
            <div className="field">
              <input placeholder="Name as on Passport" />
            </div>
            <div className="field">
              <input placeholder="Date of Birth" />
              <img src={Calendar} />
            </div>
            <div className="field">
              <input placeholder="Residence address" />
            </div>
            <div className="field">
              <input placeholder="Nearest Airport" />
            </div>
            <div className="field">
              <input placeholder="Valid professional Indemnity" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="field">
              <input placeholder="Passport Number" />
            </div>
            <div className="field">
              <input placeholder="Nationality" />
            </div>
            <div className="field">
              <input placeholder="Nearest Seaport" />
            </div>
            <div className="field">
              <input placeholder="Valid Medical Insurance" />
            </div>
            <div className="field">
              <input placeholder="Valid Employement Medical Certificate" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Personal;