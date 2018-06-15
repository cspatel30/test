import React, { Component } from 'react';
import ReactStars from 'react-stars';
import Skills from './SkillsPage.jsx';
import EmployeeHistory from './EmployeeHistoryPage.jsx';
import PersonalDetails from './PersonalDetailsPage.jsx';
import WorkHistory from './WorkHistoryPage.jsx';
import EducationQualification from './EducationQualificationPage.jsx';
import AreasCovered from './AreasCovered.jsx';
import Documents from './DocumentsPage.jsx';

export default class UserProfileDashboard extends Component {

  constructor(props) {
    super(props);
  } 

  render() {
        return (
          <div className="row mt-15">
            <div className="col-md-4 pr-0">
                <Skills/>
                <EmployeeHistory/>
                <PersonalDetails/>
            </div>
            <div className="col-md-8 pl-0">
                <WorkHistory/>
                <EducationQualification/>
                <AreasCovered/>
                <Documents/>
            </div>
          </div>
        );
  }
}