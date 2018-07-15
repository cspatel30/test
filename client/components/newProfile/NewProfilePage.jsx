// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import ReactStars from 'react-stars';
import UserProfileDashboardPage from './UserProfileDashboardPage.jsx';
import UserProfileDetailsPage from './UserProfileDetailsPage.jsx';
import './newProfile.scss';

export default class NewProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state={
      profileDetails:''
    }
    };
  
    componentWillMount(){
     var response=this.props.getMyProfileInfo()
    }
    componentWillReceiveProps(props){
      if(props){
        this.setState({
          profileDetails:props
        })
      }
    }
    

  render() {
    return (
        <div className="bg-white">
          <UserProfileDetailsPage {...this.state}/>
          <UserProfileDashboardPage {...this.state}/>
        </div>
    );
  }
}