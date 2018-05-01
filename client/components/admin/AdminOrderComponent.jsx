// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import {FormattedMessage} from 'react-intl';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

export default class AdminOrderComponent extends Component {

  constructor(props) {
  	super(props);

  	this.state = {
  		orders: [],
  		errorMsg: null
  	}
  }

  componentWillMount() {
    if(this.props.userProfile) {
      this.props.getAdminOrders();
    }
  }

  componentWillReceiveProps(props) {
  	if(!this.props.userProfile && props.userProfile) {
  		this.props.getAdminOrders();
  	}

  	if(!this.props.orders && props.orders) {
  		this.setState((state) => { state.orders = props.orders});
  	}

  	this.setState((state) => { state.errorMsg = props.error; })
  }

//   displayQuoteAmount(userType, enquiry) {
//     if(userType == 'customer') {
//       return enquiry.customerQuote;
//     } else {
//       return enquiry.inspectorQuote;
//     }
//   }

  formatDate(dateTime) {
    return moment(dateTime).format("YYYY-MM-DD");
  }
  
  renderAdminOrders(admin, orders) {
    return (
      (orders || []).map((x, key) => (
        <div className="d-flex mb-4 p-3 order-row" key={key}>
          <div className="col-4">
            <div className="mb-2" style={{fontSize:'15px'}}><b>Enquiry No. : </b><span>{`value`}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Inspection Type : </b><span>{x.inspectionTypeDisplayName}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Company : </b><span>{`value`}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Email : </b><span>{`value`}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Phone : </b><span>{`value`}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>PIC Name : </b><span>{`value`}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Vessel Name : </b><span>{x.vesselName}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>IMO Number : </b><span>{x.imo}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Vessel Type : </b><span>{x.vesselTypeDisplayName}</span></div>
          </div>
          <div className="col-4">
            <div className="mb-2" style={{fontSize:'15px'}}><b>Port : </b><span>{x.portData.name}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Start Date : </b><span>{this.formatDate(x.startTimeFmt)}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>End Date : </b><span>{this.formatDate(x.endTimeFmt)}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Assigned Inspector : </b><span>{x.inspector.name}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Current Status : </b><span>{x.status}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Order Amount (Client) : </b><span>{`value`}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Order Amount (Inspector) : </b><span>{`value`}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Paid Status : </b><span>{`value`}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Amount Paid: </b><span>{`value`}</span></div>  
          </div>
          <div className="col-4 d-flex flex-column justify-content-around">
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Cancel</button>
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Update Quotation</button>
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Update Feedback</button>
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Request Feedback</button>
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Upload Report</button>
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Change Inspector</button>
          </div>
        </div>
      ))
    )
  }

  render() {
  const { userProfile } = this.props;
  const { orders } = this.state;
  console.log('..orders', this.state.orders, this.props.userProfile);  
	if(this.props.userProfile) {
      if(this.state.orders && this.state.orders.length > 0) {
		return (
          <div className="page d-flex flex-column">
          	<h1>Your Orders</h1>
          	<div className="orders"> 
          		<div className="error">{this.state.errorMsg}</div>
              {this.renderAdminOrders(userProfile, orders)}
          	</div>
          </div>
      	);
	  } else {
  		return (
          <div className="page">
          	<h1>Your Orders</h1>
            <div className="orders">
          	   <p>You have no pending orders</p>
            </div>
          </div>
    	);
      }
    } else {
      return (<div className="page">
          <div>You need to login to see your orders</div>
      </div>);
	  }
  }
  
}