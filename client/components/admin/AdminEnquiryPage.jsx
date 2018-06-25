// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { DropdownButton, MenuItem } from 'react-bootstrap';
var moment = require('moment');
import { NavLink } from 'react-router-dom';
import './admin.scss';

export default class AdminEnquiryPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      quoteUpdateForEnquiryId : null,
      enquiryQuoteUpdated : false,
      updateQuoteForm: {
        customerQuote: "",
        inspectorQuote: ""
      },
      updateQuoteFormError: {
        customerQuote: "",
        inspectorQuote: ""
      }
    };

    this.cancelEnquiry = this.cancelEnquiry.bind(this);
    
    this.openUpdateQuoteDialog = this.openUpdateQuoteDialog.bind(this);
    this.closeUpdateQuoteDialog = this.closeUpdateQuoteDialog.bind(this);
    this.renderUpdateQuoteDialog = this.renderUpdateQuoteDialog.bind(this);
    this.updateQuote = this.updateQuote.bind(this);
    this.handleQuoteFormFieldChange = this.handleQuoteFormFieldChange.bind(this);

  }

  componentWillMount() {
    if(this.props.userProfile) {
      this.props.getCustomerEnquiries();
    }
  }

  componentWillReceiveProps(props) {
  	if(!this.props.userProfile && props.userProfile) {
  		this.props.getCustomerEnquiries();
  	}
    if(!this.props.enquiryQuoteUpdated && props.enquiryQuoteUpdated)
      this.state.enquiryQuoteUpdated = true;
  }

  cancelEnquiry(enquiryId) {
    console.log("cancel enquiry = "+ enquiryId);
    this.props.cancelEnquiry(enquiryId);
  }

  formatDate(dateTime) {
    return moment(dateTime).format("YYYY-MM-DD");
  }

  openUpdateQuoteDialog(enquiryId) {
    this.setState((state) => {
      state.updateQuoteForm = { customerQuote: "", inspectorQuote: "" };
      state.quoteUpdateForEnquiryId = enquiryId;
      state.enquiryQuoteUpdated = false;
    });
  }

  closeUpdateQuoteDialog() {
    this.setState((state) => {
      state.quoteUpdateForEnquiryId = null;
    });
  }

  renderUpdateQuoteDialog() {
    if(this.state.quoteUpdateForEnquiryId && this.state.quoteUpdateForEnquiryId > 0) {
      if(this.state.enquiryQuoteUpdated) {
        const updateQuoteDialogActions = [
          <FlatButton label="Close" primary={true} onClick={() => {this.closeUpdateQuoteDialog(true)}}/>
        ];

        return (<Dialog
          title="Update Enquiry Quote Details"
          actions={updateQuoteDialogActions}
          modal={true}
          open={true}>
            <div className="success">
              Update Quote for enquiry successfully
            </div>  
          </Dialog>);
      } else {
        const updateQuoteDialogActions = [
          <FlatButton label="Update" primary={true} onClick={() => {this.updateQuote(this.state.quoteUpdateForEnquiryId)}}/>,
          <FlatButton label="Cancel" primary={true} onClick={() => {this.closeUpdateQuoteDialog(false)}}/>
        ];

        return (<Dialog
          title="Update Enquiry Quote Details"
          actions={updateQuoteDialogActions}
          modal={true}
          open={true}>
            <div className="contact-form leftHalf">
              <div className="label">Customer Quote</div>
              <div className="field">
                <input className="inputField" type="text" name="customerQuote" value={this.state.updateQuoteForm.customerQuote} 
                  onChange={this.handleQuoteFormFieldChange} />
                <div className="errorField">{this.state.updateQuoteFormError.customerQuote}</div>
              </div>
            </div>
            <div className="contact-form leftHalf">
              <div className="label">Inspector Quote</div>
              <div className="field">
                <input className="inputField" type="text"  name="inspectorQuote" value={this.state.updateQuoteForm.inspectorQuote} 
                  onChange={this.handleQuoteFormFieldChange} />
                <div className="errorField">{this.state.updateQuoteFormError.inspectorQuote}</div>
              </div>
            </div>
            <div className="clear"></div>  
          </Dialog>);
      }
    } else 
      return null;
  }

  handleQuoteFormFieldChange(event) {
    event.persist();
    this.setState((state) => { state.updateQuoteForm[event.target.name] = event.target.value});
  }

  updateQuote(enquiryId) {
    
    var updateQuoteFormError =  { customerQuote: "", inspectorQuote: ""};
    var error = false;
    if(this.state.updateQuoteForm.customerQuote == "") {
      error = true;
      updateQuoteFormError.customerQuote = "This field is mandatory";
    }
    if(this.state.updateQuoteForm.inspectorQuote == "") {
      error = true;
      updateQuoteFormError.inspectorQuote = "This field is mandatory";
    }
    if(error) {
      this.setState((state) => {state.updateQuoteFormError = updateQuoteFormError});
      return;
    }

    this.props.updateEnquiryQuote(enquiryId, this.state.updateQuoteForm);
  }

  renderActions(enquiry) {
    var actions = [];
    if(enquiry.status !== 'CANCELLED' && enquiry.status !== 'COMPLETED') {
      actions.push(<li role="presentation" key={"enquiry_action_cancel_"+enquiry.id}>
        <span onClick={ () => this.cancelEnquiry(enquiry.id)}>Delete</span>
        </li>);
    }
    
    if(enquiry.status == 'CREATED') {
      actions.push(<li role="presentation" key={"enquiry_action_updatequote_"+enquiry.id}>
        <span onClick={ () => this.openUpdateQuoteDialog(enquiry.id)}>Update Quote</span>
      </li>);
      actions.push(<li role="presentation" key={"enquiry_action_assign_si_"+enquiry.id}>
        <NavLink to={`${this.props.match.url}/enquiry/${enquiry.id}/inspectors/`}>Assign Inspectors</NavLink>    
          </li>);
    }

    if(enquiry.status !== 'SENT_TO_INSPECTORS') {
      actions.push(<li role="presentation" key={"enquiry_action_sendtoinspectors_"+enquiry.id}>
        <span onClick={ () => this.sendToInspectors(enquiry.id)}>Send To Inspectors</span>
      </li>);
    }

    if(enquiry.status !== 'SENT_TO_CLIENT') {
      actions.push(<li role="presentation" key={"enquiry_action_sendtoclient_"+enquiry.id}>
        <span onClick={ () => this.sendToClient(enquiry.id)}>Send To Client</span>
      </li>);
    }

            
    return  <div className="dropdown-right"><DropdownButton
              title={
                  <span><i className="fa fa-ellipsis-v"></i></span>
              }
              className={'custom-dropdown '+ enquiry.id}
              id={enquiry.id}>
              {actions}
            </DropdownButton></div>;
  }

  renderEnquiries(enquiries) {
  	var items = [];
  	
    for(var i=0; i < enquiries.length; i++) {
  		var enquiryId = enquiries[i].id;
      items.push(
        <div className="enquiry-row" key={"enquiry_" + i}>
          <div className="enquiry-details-box">
            <div className="details">
              <h2>Enquiry Number : <span className="value">{enquiries[i].id}</span></h2>
              <h4>Inspection Type: <span className="value">{enquiries[i].inspectionTypeDisplayName}</span></h4>
              <h4>Vessel Name: <span className="value">{enquiries[i].vesselName}</span></h4>
              <h4>IMO Number: <span className="value">{enquiries[i].imo}</span></h4>
              <h4>Vessel Type: <span className="value">{enquiries[i].vesselTypeDisplayName}</span></h4>
              <h4>Port: <span className="value">{enquiries[i].portData.name}, {enquiries[i].portData.countryName}</span></h4>
              <h4>From: <span className="value">{this.formatDate(enquiries[i].startTime)} - {this.formatDate(enquiries[i].endTime)}</span></h4>
            </div>
          </div>
          <div className="enquiry-details-box">
            <div className="details">
              <h4>Client Name : <span className="value">
                <NavLink to="">{enquiries[i].clientName?enquiries[i].clientName: "Client Name"} </NavLink>
              </span>
              </h4>
              <h4>Max. Bidding Price : <span className="value">{enquiries[i].maxBiddingPrice?enquiries[i].maxBiddingPrice:""}</span></h4>
              <h4>Quotation Methos : <span className="value">{enquiries[i].quoteMethods?enquiries[i].quoteMethods:"Quotation Methos"}</span></h4>
              <h4>Total Inspection fee : <span className="value">{enquiries[i].quoteMethods?enquiries[i].quoteMethods:"Total Inspection fee "}</span></h4>
              <h4>Total Expense : <span className="value">{enquiries[i].maxBiddingPrice?enquiries[i].maxBiddingPrice:"Total Expense"}</span></h4>
              <h4>Total lump sum ( Client) : <span className="value">{enquiries[i].quoteMethods?enquiries[i].quoteMethods:"Total lump sum"}</span></h4>
              <h4>Availability : <span className="value">{enquiries[i].Availability?enquiries[i].Availability:"Availability"}</span></h4>
              <h4>Status : <span className="value" style={{color: '#d50608'}}>{enquiries[i].status}</span></h4>
            </div>
          </div>
          <div className="enquiry-actions-box">
          
            {this.renderActions(enquiries[i])}
          </div>
          <div className="clear"></div>
        </div>
      );
  	}
  	return items;
  }

  render() {
    if(this.props.enquiries && this.props.enquiries.length > 0) {
      return(<div>
        <h1 className="page-container-h1-heading">Enquiries</h1>
        <div className="enquiries"> 
          {this.renderEnquiries(this.props.enquiries)}
          {this.renderUpdateQuoteDialog()}
        </div>
      </div>);
    } else {
      return(<div className="enquiries"> 
        Fetching enquiries
      </div>);
    }
    
  }
}