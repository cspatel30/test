
import React, { Component } from 'react';
import moment from 'moment';
import Banner from './Banner.jsx';
import ProposalContent from './ProposalContent.jsx';
import './proposal.scss';

export default class ProposalPage extends Component {

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
    return moment(dateTime).format('D MMM YYYY');
  }

  render() {
    
    if (this.props.userProfile) {     
      
        return (
         <div>   
          <div>            
              <Banner />                      
          </div>
          <div>            
              <ProposalContent formatDate={this.formatDate}/>                   
          </div>
        </div>
        );
      }else {
        return (              
          <div>You need to login to see your proposals</div>
        );
      } 

    } 
}