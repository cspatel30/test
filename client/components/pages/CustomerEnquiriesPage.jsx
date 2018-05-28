// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import BootstrapTable from 'react-bootstrap-table-next';

var moment = require('moment');

const styles = {
  card: {
    marginBottom: 20
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    background: '#ecf0f1'
  },
  column: {
    overflow: 'auto',
    textOverflow: 'initial'
  }
};

const columns = [{
  dataField: 'name',
  text: 'Name',
  align: 'center',
  style: styles.column
}, {
  dataField: 'company',
  text: 'Company',
  align: 'center',
  style: styles.column
}, {
  dataField: 'email',
  text: 'Email',
  align: 'center',
  style: styles.column
}, {
  dataField: 'positionDisplayName',
  text: 'Position',
  align: 'center',
  style: styles.column
}, {
  dataField: 'qualificationDisplayName',
  text: 'Qualificiation',
  align: 'center',
  style: styles.column
}, {
  dataField: 'experienceYears',
  text: 'Experience (Yrs)',
  align: 'center',
  style: styles.column
}, {
  dataField: 'highestRankAshore',
  text: 'Highest Rank Ashore',
  align: 'center',
  style: styles.column
}, {
  dataField: 'highestRankOnboard',
  text: 'Highest Rank Onboard',
  align: 'center',
  style: styles.column
}, {
  dataField: 'totalInspections',
  text: 'Total Inspections',
  align: 'center',
  style: styles.column
}, {
  dataField: 'userId',
  text: 'View',
  formatter: profileViewButtonRenderer,
  align: 'center',
  style: styles.column
}];

function profileViewButtonRenderer(cell, row) {
  return (<a href={"/inspector/profile/"+row.userId} target="_blank">
    <div className="btn">
      <button onClick={(e) => e.stopPropagation()}>View Profile</button>
    </div>
    </a>
  );
}

export default class CustomerEnquiriesPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMsg : null,
      createOrderSuccess: false,
      selectedInspector: {},
      selectedEnquiryId: null
    }

    this.cancelEnquiry = this.cancelEnquiry.bind(this);
    this.acceptEnquiryQuote = this.acceptEnquiryQuote.bind(this);
    this.rejectEnquiryQuote = this.rejectEnquiryQuote.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }

  componentWillMount() {
    if(this.props.userProfile) {
      this.props.getCustomerEnquiries(this.props.userProfile.type);
    }
  }

  componentWillReceiveProps(props) {
  	if(!this.props.userProfile && props.userProfile) {
  		this.props.getCustomerEnquiries(props.userProfile.type);
  	}
    
    if(!this.props.createOrderSuccess && props.createOrderSuccess) {
      this.setState((state) => { state.createOrderSuccess = true; });
    }

    this.setState((state) => { state.errorMsg = props.error; })
  }

  onRowSelect(row, isSelect, rowIndex) { 
    console.log("Inspector selected = ", row);
    if(isSelect) {
      this.setState((state) => { state.selectedEnquiryId = row.enquiry_id; state.selectedInspector[row.enquiry_id] = row.userId;});
    } else {
      this.setState((state) => { state.selectedEnquiryId = null; delete state.selectedInspector[row.enquiry_id]});
    }
  } 

  cancelEnquiry(enquiryId) {
    this.props.cancelEnquiry(enquiryId);
  }

  acceptEnquiryQuote(enquiryId) {
    this.props.updateEnquiryQuoteRequest(enquiryId, true);
  }

  rejectEnquiryQuote(enquiryId) {
    this.props.updateEnquiryQuoteRequest(enquiryId, false);
  }

  createOrder(enquiryId) {
    if(!this.state.selectedEnquiryId) {
      this.setState((state) => { state.selectedEnquiryId = enquiryId; state.errorMsg = "Please select inspector" } );
      return;
    }

    var selectedInspectorId = this.state.selectedInspector[this.state.selectedEnquiryId];
    if(selectedInspectorId) {
      this.props.createOrder(enquiryId, selectedInspectorId);
    } else {
      this.setState((state) => { state.errorMsg = "Please select inspector" } );
    }
  }

  getViewInspectorsDialogOpenState(enquiryId) {
    if(this.state.selectedEnquiryId == enquiryId)
      return true;
    else
      return false;
  }

  formatDate(dateTime) {
    return moment(dateTime).format("YYYY-MM-DD");
  }

  renderActions(userType, enquiry) {
    var actions = [];
    if(userType == 'customer' ) {
      if(enquiry.status !== 'CANCELLED' && enquiry.status !== 'COMPLETED') {
        actions.push(<div className="btn" key={"enquiry_action_cancel_"+enquiry.id}>
          <button onClick={ () => this.cancelEnquiry(enquiry.id)}>Cancel</button>
          </div>);
      }
    } else {
      actions.push(<div className="btn" key={"enquiry_action_accept_"+enquiry.id}>
        <button onClick={ () => this.acceptEnquiryQuote(enquiry.id)}>Accept Quote</button>
        </div>);
      actions.push(<div className="btn" key={"enquiry_action_decline_"+enquiry.id}>
        <button onClick={ () => this.declineEnquiryQuote(enquiry.id)}>Decline Quote</button>
        </div>);
    }
    return actions;
  }

  renderInspectorsSection(userType, enquiry) {
    const { selectedInspector } = this.state;
    if(userType == 'customer' && enquiry.status == 'SENT_TO_INSPECTORS' && enquiry.inspectors && enquiry.inspectors.length > 0) {
      const selectRow = 
      { mode: 'radio', clickToSelect: true, bgColor: '#f7f7f7', 
        onSelect: this.onRowSelect,
        selected: Object.values(selectedInspector).map(x => parseInt(x)),
      };
      return(
        <Card style={styles.card}>
          <CardHeader style={styles.cardTitle} title="View Inspectors" actAsExpander={true} showExpandableButton={true}/>
          <CardText expandable={true}>
            
            <div style={{marginTop: 10, marginBottom: 10, textAlign: 'right'}}><button onClick={ () => this.createOrder(enquiry.id) }>Place Order</button></div>
            
            <BootstrapTable keyField='userId' data={ enquiry.inspectors } columns={ columns } striped condensed bordered={false}
            noDataIndication="No matches found" selectRow={selectRow}/>

          </CardText>
        </Card>
      );
    }
  }

  displayQuoteAmount(userType, enquiry) {
    if(userType == 'customer') {
      return enquiry.customerQuote;
    } else {
      return enquiry.inspectorQuote;
    }
  }

  renderEnquiryErrorMsg(enquiryId) {
    if(this.state.errorMsg && this.state.errorMsg != "" && this.state.selectedEnquiryId == enquiryId) {
      return(<div className="error" style={{marginBottom: 20}}>{this.state.errorMsg}</div>);
    }
  }

  renderEnquiries(userType, enquiries) {
  	var items = [];
  	for(var i=0; i < enquiries.length; i++) {
      if(this.state.createOrderSuccess && this.state.selectedEnquiryId == enquiries[i].id) {
        return(
          <div className="enquiry-row" key={"enquiry_" + i}>
            <div className="success">Your order #{this.props.createdOrder.id} is received successfully.</div>
          </div>
        );
      } else {
        items.push(
          <div className="enquiry-row" key={"enquiry_" + i}>
            {this.renderEnquiryErrorMsg(enquiries[i].id)}
            <div className="enquiry-details-box">
              <div className="picBox">
                
              </div>
            </div>
            <div className="enquiry-details-box">
              <div className="details">
                <h2>Enquiry Number : <span className="value">{enquiries[i].id}</span></h2>
                <h4>Inspection Type: <span className="value">{enquiries[i].inspectionTypeDisplayName}</span></h4>
                <h4>Vessel Name: <span className="value">{enquiries[i].vesselName}</span></h4>
                <h4>IMO Number: <span className="value">{enquiries[i].imo}</span></h4>
                <h4>Vessel Type: <span className="value">{enquiries[i].vesselTypeDisplayName}</span></h4>
                <h4>Port: <span className="value">{enquiries[i].portData.name}, {enquiries[i].portData.countryName}</span></h4>
              </div>
            </div>
            <div className="enquiry-details-box">
              <div className="details">
                <h4>Email : <span className="value">{enquiries[i].email}</span></h4>
                <h4>Start Date : <span className="value">{this.formatDate(enquiries[i].startTime)}</span></h4>
                <h4>End Date : <span className="value">{this.formatDate(enquiries[i].endTime)}</span></h4>
                <h4>Quote Amount : <span className="value">{this.displayQuoteAmount(userType, enquiries[i])}</span></h4>
                <h4>Current Status : <span className="value" style={{color: '#d50608'}}>{enquiries[i].status}</span></h4>
              </div>
            </div>
            <div className="enquiry-actions-box">
              {this.renderActions(userType, enquiries[i])}
            </div>
            <div className="clear"></div>
            {this.renderInspectorsSection(userType, enquiries[i])}
          </div>
        );
      }
  	}
  	return items;
  }

  render() {

  	if(this.props.userProfile) {
      
      if(this.props.enquiries && this.props.enquiries.length > 0) {
		    return (
          <div className="page">
          	<h1>Your Enquiries</h1>
          	<div className="enquiries"> 
          		{this.renderEnquiries(this.props.userProfile.type, this.props.enquiries)}
          	</div>
          </div>
      	);
	    } else {
  		  return (
          <div className="page">
          	<h1>Your Enquiries</h1>
            <div className="enquiries">
          	   <p>You have no open enquiries</p>
            </div>
          </div>
    	  );
      }
      
    } else {
      return (<div className="page">
          <div>You need to login to see your enquiries</div>
      </div>);
	  }
  }
}