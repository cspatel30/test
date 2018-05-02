// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import { Rating } from 'material-ui-rating';
import { NavLink } from 'react-router-dom';

export default class OrdersPage extends Component {

  constructor(props) {
  	super(props);

  	this.state = {
  		orders: [],
      errorMsg: null,
      dailog: false,
      review: '',
      feedback: {
        availability: 0,
        quality: 0,
        skill: 0,
        deadline: 0,
      }
  	}
  }

  onChange(value, field) {
    // console.log('v...', field, value);
    this.setState((state) => { state.feedback[field] = value });
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

  renderModal() {
    const { dailog, feedback } = this.state;
    const criteria = [
      { key: 'availability', label: 'Inspector\'s Availability' },
      { key: 'quality', label: 'Inspector\'s Reporting Quality' },
      { key: 'skill', label: 'Inspector\'s Skills and Experience' },
      { key: 'deadline', label: 'Stick to Deadline' },
    ];
    return (
      <Dialog
        title="Client's Feedback for Inspector"
        modal={false}
        open={dailog}
        autoScrollBodyContent={true}
      >
        
        <div className="py-2" style={{color: '#000000'}}>
          <div className="d-flex mb-3">
            <div className="col-6">
              <div className="mb-2" style={{fontSize:'15px'}}><b>Order No. : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>Inspection Type : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>Port : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>From : </b><span>{`value`}</span></div>
            </div>
            <div className="col-6">
              <div className="mb-2" style={{fontSize:'15px'}}><b>Vessel : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>IMO : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>To : </b><span>{`value`}</span></div>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="mb-2">Rating Scale</h3>
            <div className="d-flex">
              <div className="col-6">
                <div style={{fontSize:'14px'}}><span className="mr-3">1</span><span>Poor</span></div>
                <div style={{fontSize:'14px'}}><span className="mr-3">3</span><span>Good</span></div>
                <div style={{fontSize:'14px'}}><span className="mr-3">5</span><span>Excellent</span></div>
              </div>
              <div className="col-6">
                <div style={{fontSize:'14px'}}><span className="mr-3">2</span><span>Average</span></div>
                <div style={{fontSize:'14px'}}><span className="mr-3">4</span><span>Very Good</span></div> 
              </div>
            </div>
          </div>
          <div>
            <div className="text-center mb-2" style={{fontWeight: 'bold', fontSize: '20px'}}>Your feedback is important to us</div>
            <div className="mb-2" style={{paddingLeft: '15px', fontWeight: 'bold'}}>Rate Inspector on 1-5 scale</div>
            <div className="mb-2">
              {
                criteria.map((c, index) => (
                  <div className="d-flex mb-2" key={index}>
                    <div className="col-3">{index}</div>
                    <div className="col-6 d-flex flex-column">
                      <span className="mb-3">{c.label}</span>
                      <div className="profile-rating"><Rating value={feedback[c.key]} max={5} onChange={v => this.onChange(v, c.key)} /></div>
                    </div>
                    <div className="col-3" style={{fontSize: 'larger', fontWeight: 'bold'}}>{feedback[c.key]}</div>
                  </div>
                ))
              }
            </div>
            <textarea className="px-3 py-2 mb-2" onChange={(e) => this.setState({review: e.target.value})} rows="4" cols="50" placeholder="Write Feedback" maxLength={200}></textarea>
          </div>
          <div className="text-right">
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary mr-3" onClick={() => this.setState({dailog: false})}>Cancel</button>
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Submit</button>
          </div>
        </div>  
      </Dialog>
            
    )
  }

  renderClientButtons() {
    return (
      <div className="col-4 d-flex flex-column justify-content-around">
        <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Cancel</button>
        <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => this.setState({dailog: true})}>Submit Feedback</button>
        <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Download Report</button>
      </div>
    )
  }
  renderInspectorButtons() {
    return (
      <div className="col-4 d-flex flex-column justify-content-around">
        <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Order Acceptance</button>
        <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Decline Job Order</button>
        <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Upload Report</button>
      </div>
    )
  }

  renderUserOrders(user, orders) {
    return (
      (orders || []).map((x, key) => (
        <div className="d-flex mb-4 p-3 order-row" key={key}>
          <div className="col-4">
            { user.type === 'inspector' && <div className="mb-2" style={{fontSize:'15px'}}><b style={{fontSize:'20px'}}>Job Order : </b><span>{`value`}</span></div>}
            <div className="mb-2" style={{fontSize:'15px'}}><b style={{fontSize:'20px'}}>Enquiry No. : </b><span>{`value`}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Inspection Type : </b><span>{x.inspectionTypeDisplayName}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Vessel Name : </b><span>{x.vesselName}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>IMO Number : </b><span>{x.imo}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Vessel Type : </b><span>{x.vesselTypeDisplayName}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Port : </b><span>{x.portData.name}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Payment Status : </b><span>{`value`}</span></div>
          </div>
          <div className="col-4">
            <div className="mb-2" style={{fontSize:'15px'}}><b>Start Date : </b><span>{this.formatDate(x.startTimeFmt)}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>End Date : </b><span>{this.formatDate(x.endTimeFmt)}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Assigned Inspector : </b><span>{x.inspector.name}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Current Status : </b><span>{x.status}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Order Amount : </b><span>{x.customerQuote}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Amount Paid: </b><span>{`value`}</span></div>  
          </div>
          {user.type === 'inspector' ? this.renderInspectorButtons() : this.renderClientButtons()}
        </div>
      ))
    )
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
  const { userProfile } = this.props;
  const { orders, dailog } = this.state;
  console.log('..orders', this.state.orders, this.props.userProfile);  
	if(this.props.userProfile) {
      if(this.state.orders && this.state.orders.length > 0) {
		return (
          <div className="page d-flex flex-column">
          	<h1>Your Orders</h1>
          	<div className="orders"> 
          		<div className="error">{this.state.errorMsg}</div>
              {this.renderUserOrders(userProfile, orders)}
              {this.renderModal()}
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