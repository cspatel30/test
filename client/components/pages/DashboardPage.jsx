
import React, { Component } from 'react';
import Navigation from './Navigation.jsx';


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

  render() {
    
    if (this.props.userProfile) {     
      
        return (
          <div>            
              <Navigation renderEnquiries={this.props.enquiries} pageLength = {this.props.enquiries.length} profileType={this.props.userProfile.type} formatDate={this.formatDate}/>
                      
          </div>
        );
      }else {
        return (              
          <div>You need to login to see your enquiries</div>
        );
      } 

    } 
}