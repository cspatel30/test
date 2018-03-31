// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
var moment = require('moment');
import { NavLink } from 'react-router-dom';

export default class OrdersPage extends Component {

  constructor(props) {
  	super(props);

  	this.state = {
  		orders: [],
  		errorMsg: null
  	}
  }

  componentWillMount() {
    if(this.props.userProfile) {
      this.props.getUserOrders();
    }
  }

  componentWillReceiveProps(props) {
  	if(!this.props.userProfile && props.userProfile) {
  		this.props.getUserOrders();
  	}

  	if(!this.props.orders && props.orders) {
  		this.setState((state) => { state.orders = props.orders});
  	}

  	this.setState((state) => { state.errorMsg = props.error; })
  }

  displayQuoteAmount(userType, enquiry) {
    if(userType == 'customer') {
      return enquiry.customerQuote;
    } else {
      return enquiry.inspectorQuote;
    }
  }

  formatDate(dateTime) {
    return moment(dateTime).format("YYYY-MM-DD");
  }
  
  renderOrders(userType, orders) {

  	var items = [];
  	for(var i=0; i < orders.length; i++) {
  		items.push(
        <div className="enquiry-row" key={"order_" + i}>
          <div className="enquiry-details-box">
            <div className="picBox">
              
            </div>
          </div>
          <div className="enquiry-details-box">
            <div className="details">
              <h2>Order Number : <span className="value">{orders[i].id}</span></h2>
              <h4>Inspection Type: <span className="value">{orders[i].inspectionTypeDisplayName}</span></h4>
              <h4>Vessel Name: <span className="value">{orders[i].vesselName}</span></h4>
              <h4>IMO Number: <span className="value">{orders[i].imo}</span></h4>
              <h4>Vessel Type: <span className="value">{orders[i].vesselTypeDisplayName}</span></h4>
              <h4>Port: <span className="value">{orders[i].portData.name}, {orders[i].portData.countryName}</span></h4>
            </div>
          </div>
          <div className="enquiry-details-box">
            <div className="details">
              <h4>Email : <span className="value">{orders[i].email}</span></h4>
              <h4>Start Date : <span className="value">{this.formatDate(orders[i].startTimeFmt)}</span></h4>
              <h4>End Date : <span className="value">{this.formatDate(orders[i].endTimeFmt)}</span></h4>
              <h4>Quote Amount : <span className="value">{this.displayQuoteAmount(userType, orders[i])}</span></h4>
              <h4>Current Status : <span className="value" style={{color: '#d50608'}}>{orders[i].status}</span></h4>
              <h4>Assigned To : <span className="value" style={{color: 'green'}}><NavLink key={"link_inspector_"+i} to={"/inspector/profile/"+orders[i].inspector.user_id}>{orders[i].inspector.name} ({orders[i].inspector.positionDisplayName})</NavLink></span></h4>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      );
  	}
  	return items;
  }


  render() {

	if(this.props.userProfile) {
      if(this.state.orders && this.state.orders.length > 0) {
		return (
          <div className="page">
          	<h1>Your Orders</h1>
          	<div className="orders"> 
          		<div className="error">{this.state.errorMsg}</div>
          		{this.renderOrders(this.props.userProfile.type, this.state.orders)}
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