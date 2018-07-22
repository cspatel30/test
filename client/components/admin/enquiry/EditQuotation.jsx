import React, { Component } from 'react';
import _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import '../admin.scss';

export default class EditQuotation extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    let {quotation, updateQuote, closeUpdateQuoteDialog, onChange} = this.props;
    console.log("quotation>>>>", quotation);
    const updateQuoteDialogActions = [
        <FlatButton label="Update" primary={true} onClick={() => {updateQuote()}}/>,
        <FlatButton label="Cancel" primary={true} onClick={() => {closeUpdateQuoteDialog(false)}}/>
    ];
    return (
            <Dialog
            title="Update Enquiry Quote Details"
            actions={updateQuoteDialogActions}
            modal={true}
            open={true}
            >                    
                <form className="row form-inside-dialog enqueries-form">
                    <div className="col-md-12 clear no-padding">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="formGroupExampleInput2">Active from</label>
                                <input type="text" name="availableFrom" className="form-control" id="formGroupExampleInput2"
                                value = {quotation.availableFrom}
                                onChange={(e)=>{onChange(e)}}
                                />
                            </div>
                        </div>   
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="formGroupExampleInput">Active to</label>
                                <input type="text" name="availableTo" className="form-control" id="formGroupExampleInput"
                                value={quotation.availableTo}
                                onChange={(e)=>{onChange(e)}}
                                />
                            </div>
                        </div>
                    </div> 
                    <div className="col-md-12 clear no-padding">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="formGroupExampleInput2">Customer Invoice Amount</label>
                                <input type="text" name="customerInvoiceAmount" className="form-control" id="formGroupExampleInput2"
                                value = {quotation.customerInvoiceAmount}
                                onChange={(e)=>{onChange(e)}}
                                />
                            </div>
                        </div>   
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="formGroupExampleInput">Customer Invoice Per</label>
                                <input type="text" name="customerInvoicePer" className="form-control" id="formGroupExampleInput"
                                value={quotation.customerInvoicePer}
                                onChange={(e)=>{onChange(e)}}
                                />
                            </div>
                        </div>
                    </div> 
                    <div className="col-md-12 clear no-padding">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="formGroupExampleInput2">Inspector Message</label>
                                <input type="textarea" name="inspectorMessage" className="form-control" id="formGroupExampleInput2"
                                value = {quotation.inspectorMessage}
                                onChange={(e)=>{onChange(e)}}
                                />
                            </div>
                        </div>   
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="formGroupExampleInput">Inspector Paid Amount</label>
                                <input type="text" name="inspectorPaidAmount" className="form-control" id="formGroupExampleInput"
                                value={quotation.inspectorPaidAmount}
                                onChange={(e)=>{onChange(e)}}
                                />
                            </div>
                        </div>
                    </div> 
                    
                    <div className="col-md-12 clear no-padding">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="formGroupExampleInput2">Inspector Paid Per</label>
                                <input type="textarea" name="inspectorPaidPer" className="form-control" id="formGroupExampleInput2"
                                value = {quotation.inspectorPaidPer}
                                onChange={(e)=>{onChange(e)}}
                                />
                            </div>
                        </div>   
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="formGroupExampleInput">Quotation Amount</label>
                                <input type="text" name="quotationAmount" className="form-control" id="formGroupExampleInput"
                                value={quotation.quotationAmount}
                                onChange={(e)=>{onChange(e)}}
                                />
                            </div>
                        </div>
                    </div> 
                </form>
                <div className="clear"></div>  
            </Dialog>
      )
    
  }
}