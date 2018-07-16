import React, { Component } from 'react';
import ReactStars from 'react-stars';
import Cookie from 'js-cookie';
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
      const token = Cookie.get('token')
      token?this.props.getMyProfileInfo():this.props.history.push('/')
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