import React, { Component } from 'react';

class Skills extends Component {
  render() {
    return (
      <div className="profile-card Skills">
        <h1>Skill Details</h1>
        <div className="row form">
          <div className="col-md-6">
            <div className="field">
              <input placeholder="Highest Rank Onboard" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="field">
              <input placeholder="Highest Rank Ashore" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="field">
              <label>Skills</label>
              <input placeholder="Skills" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Skills;