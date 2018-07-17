import React, { Component } from 'react';
import ReactStars from 'react-stars';
import Skills from './SkillsPage.jsx';
import EmployeeHistory from './EmployeeHistoryPage.jsx';
import PersonalDetails from './PersonalDetailsPage.jsx';
import WorkHistory from './WorkHistoryPage.jsx';
import EducationQualification from './EducationQualificationPage.jsx';
import AreasCovered from './AreasCovered.jsx';
import Documents from './DocumentsPage.jsx';
import './newProfile.scss';

export default class UserProfileDashboard extends Component {

  constructor(props) {
    super(props);
    this.state={
      userDashboard:''
    }
  } 

  componentWillReceiveProps(props){
    if(props){
        this.setState({
          userDashboard:props.profileDetails
        })
    }  
  }


  render() {
        return (
          <div className="row mt-60 bg-white">
            <div className="col-md-4 pr-0">
                <Skills {...this.state}/>
                <EmployeeHistory {...this.state}/>
                <PersonalDetails {...this.state} />
            </div>
            <div className="col-md-8 pl-0">
                <WorkHistory/>
                <EducationQualification {...this.state} />
                <AreasCovered {...this.state} />
                <Documents {...this.state}/>
            </div>
          </div>
        );
  }
}