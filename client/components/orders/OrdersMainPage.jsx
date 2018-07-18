import React, { Component } from 'react';
import BannerPage from './BannerPage.jsx'
import ListOfEnquiries from './ListOfEnquires'
import OrdersPage from './OrdersPage'

export default class QuotaionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
          gotJobOrders:'',
          accceptRequestState:''
        }
        this.acceptRequestReceived = this.acceptRequestReceived.bind(this)
        this.acceptDeclineReceived = this.acceptDeclineReceived.bind(this)
    }
    componentWillMount() {
      this.props.allListJobOrders()
      //this.props.acceptRequest()
      //der this.props.declinedRequest()
      
  }
  componentWillReceiveProps(props){
    if(props){
      this.setState({
          gotJobOrders: props.authReducer.gotAllJobOrders,
          accceptRequestState:props.authReducer.acceptedRequest,
          declineRequestState:props.authReducer.declinedRequest
      })
    }
  }
  
  acceptRequestReceived(id){
    this.props.acceptRequest(id) 
  }
  
  acceptRequestReceived(id){
    this.props.acceptRequest(id) 
  }

  acceptDeclineReceived(id){
    this.props.declinedRequest(id) 
  }

  render() {
    
    return (
      <div className="i-dashboard">
          <BannerPage />
          <ListOfEnquiries/>
          <OrdersPage {...this.state} orderDeclineRequest={this.acceptDeclineReceived} orderAcceptRequest = {this.acceptRequestReceived}/>
       </div>
    );
  }
}