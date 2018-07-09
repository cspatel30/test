
import React, { Component } from 'react';
import Navigation from './Navigation.jsx';
import './dashboard.scss';

var moment = require('moment');

export default class DashboardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: null
    }

  }

  componentWillMount() {
    if (this.props.userProfile) {
      this.props.getCustomerEnquiries(this.props.userProfile.type);
    }
  }

  componentWillReceiveProps(props) {
    if (!this.props.userProfile && props.userProfile) {
      this.props.getCustomerEnquiries(props.userProfile.type);
    }

    this.setState((state) => { state.errorMsg = props.error; })
  }

  formatDate(dateTime) {
    return moment(dateTime).format("YYYY-MM-DD");
  }

  formatMonth(dateTime) {
    return moment(dateTime).format("MM YY");
    console.log('=---',moment(dateTime).format("MM YY"));
  }

  render() {
    
    if (this.props.userProfile) {     
      
        return (
          <div>            
              <Navigation renderEnquiries={this.props.enquiries} profileType={this.props.userProfile.type} formatDate={this.formatDate} formatMonth={this.formatMonth} pageLength ={this.props.enquiries.length}/>
                      
          </div>
        );
      }else {
        return (              
          <div>You need to login to see your enquiries</div>
        );
      } 

    } 
}