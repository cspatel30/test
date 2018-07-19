import React, { Component } from 'react';

class Documents extends Component {
  render() {
    return (
      <div className="profile-card Documents">
        <h1>Documents</h1>
        <div className="row form">
          <div className="col-md-6">
            <div className="field primary">
              <button className="primary">Choose File</button>
              <span>Passport</span>
            </div>
            <div className="field secondary">
              <button className="secondary">Choose File</button>
              <span>Medical Fitness Certificate ILO</span>
            </div>
            <div className="field primary">
              <button className="primary">Choose File</button>
              <span>Professional Indemnity Certificate</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="field secondary">
              <button className="secondary">Choose File</button>
              <span>Medical Insurance</span>
            </div>
            <div className="field secondary">
              <button className="secondary">Choose File</button>
              <span>SeaMan Book Document</span>
            </div>
            <div className="field primary">
              <button className="primary">Choose File</button>
              <span>Qualification Cert(competency license)</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Documents;