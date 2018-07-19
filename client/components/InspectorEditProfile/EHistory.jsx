import React, { Component } from 'react';
import Calendar from '../../resources/static/img/calendar.png';

class EHistory extends Component {
  render() {
    return (
      <div className="profile-card Qualifications">
        <div className="Qualifications-header">
          <h1>Employement History</h1>
          <button>ADD NEW</button>
        </div>
        <div className="row form">
          <div className="col-md-6">
            <div className="field">
              <input placeholder="Position" />
            </div>
            <div className="field">
              <input placeholder="Ship Type" />
            </div>
            <div className="field">
              <input placeholder="City" />
            </div>
            <div className="field">
              <input placeholder="Start Date" />
              <img src={Calendar} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="field">
              <input placeholder="Company Name" />
            </div>
            <div className="field">
              <input placeholder="Country" />
            </div>
            <div className="field">
              <input placeholder="Department" />
            </div>
            <div className="field">
              <input placeholder="End Date" />
              <img src={Calendar} />
            </div>
          </div>
          <div style={{ textAlign: 'right' }} className="col-md-12">
            <button className="secondary">DELETE</button>
          </div>
        </div>
      </div>
    )
  }
}
export default EHistory;