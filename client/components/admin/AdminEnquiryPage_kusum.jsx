// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import ReactTable from "react-table";
var moment = require('moment');
import { NavLink } from 'react-router-dom';
import { _getDeafultColumnsWidth, _selectNewRecordsIfAllSelected, toggleSelectAll,
 toggleRow, _removeColumnsIfNotNeeded, _createFiltersQueryString, _createSortedDataString } 
 from '../reactTableCustomFunctions';

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
      },

      tableStates:  {
            rows: [],
            columns: [],
            page: 1,
            pageSize: 20,
            totalRecords: 1,
            totalPagesWithRecords: 1,
            sorted: "",
            filtered: "",
            dataTableLoading: false,
            filtered: [],  selected: {}, selectAll: 0, setDefaultSelectedRecords:false,
            imagePath : "",
            familyPageTitle: "",
            apiCallRecords : {callOccurance:0, noRecordExist: false},
            previewImage: {imagePreviewOpen: false, selectedImage: "", title: "" },
            selected: {}, selectAll: 0,
        }      

    };

    this.cancelEnquiry = this.cancelEnquiry.bind(this);
    
    this.openUpdateQuoteDialog = this.openUpdateQuoteDialog.bind(this);
    this.closeUpdateQuoteDialog = this.closeUpdateQuoteDialog.bind(this);
    this.renderUpdateQuoteDialog = this.renderUpdateQuoteDialog.bind(this);
    this.updateQuote = this.updateQuote.bind(this);
    this.handleQuoteFormFieldChange = this.handleQuoteFormFieldChange.bind(this);
    this._setColumnsList = this._setColumnsList.bind(this);
    this.setSelectedRecordsInState = this.setSelectedRecordsInState.bind(this);

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


  setSelectedRecordsInState = (rowResponse) => {
        const { setSelectedUsersList } =  this.props;
        let { tableStates } = this.state;
        if(setSelectedUsersList){
            if(this.props.selectOneRecordOnly) {
                const data = Object.assign({}, rowResponse.selectedUserData);
                if(rowResponse.selectedUserData && rowResponse.selectedUserData.picture){
                    data.picture = this.state.imagePath + data.picture;
                }
                setSelectedUsersList({
                    selected: rowResponse.selected,
                    selectAll: rowResponse.selectAll,
                    selectedUserData: data
                });
            }
            else{
                setSelectedUsersList({
                    selected: rowResponse.selected,
                    selectAll: rowResponse.selectAll
                });

            }
        }
        tableStates.selected = rowResponse.selected;
        tableStates.selectAll = rowResponse.selectAll;
        this.setState({tableStates: tableStates});
    }

  _setColumnsList = () => {
        let columnsList = [];
        const { removeColumnsFromGrid, _updateUserActiveStatus,
            isListOpenInModal, showInlineDetailInfo } = this.props;



        columnsList =  [

             {
                id: "id",
                Header: 'Ref No.',
                accessor: "id",
                Cell: ({ original }) => {
                    return (
                        <div  className="columns-lower-Case-text">
                          {original.id}
                          <div>
                            {momnent(original.createdOn).format("DD/MM/YYYY")} Date Created
                          </div>
                        </div>

                    );
                },
                sortable:false,
                filterable: false,
                style: _getDeafultColumnsWidth(),
                headerStyle:  _getDeafultColumnsWidth()
            },
            {
                id: "vesselName",
                Header: 'Vessel Name',
                accessor: "vesselName",
                Cell: ({ original }) => {
                    return (
                        <div  className="columns-lower-Case-text">
                          {original.vesselName}
                        </div>

                    );
                },
                sortable:false,
                filterable: false,
                style: _getDeafultColumnsWidth(),
                headerStyle:  _getDeafultColumnsWidth()
            },
             {
                id: "imo",
                Header: 'IMO No.#',
                accessor: "imo",
                Cell: ({ original }) => {
                    return (
                        <div  className="columns-lower-Case-text">
                          {original.imo}
                        </div>

                    );
                },
                sortable:false,
                filterable: false,
                style: _getDeafultColumnsWidth(),
                headerStyle:  _getDeafultColumnsWidth()
            },
             {
                id: "vesselTypeDisplayName",
                Header: 'Vessel Type',
                accessor: "vesselTypeDisplayName",
                Cell: ({ original }) => {
                    return (
                        <div  className="columns-lower-Case-text">
                          {original.vesselTypeDisplayName}
                        </div>

                    );
                },
                sortable:false,
                filterable: false,
                style: _getDeafultColumnsWidth(),
                headerStyle:  _getDeafultColumnsWidth()
            },
             {
              id: "message",
              Header: 'Client Message',
              accessor: "message",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.message}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
           {
              id: "inspectionType",
              Header: 'Inspection Type',
              accessor: "inspectionType",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.inspectionType?original.inspectionType:""}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
            {
                id: "portData>name",
                Header: 'Port',
                accessor: "portData>name",
                Cell: ({ original }) => {
                    return (
                        <div  className="columns-lower-Case-text">
                          {original.portData?original.portData.name:""} <b> {original.portData.countryName}</b>
                        </div>

                    );
                },
                sortable:false,
                filterable: false,
                style: _getDeafultColumnsWidth(),
                headerStyle:  _getDeafultColumnsWidth()
            },
            
            {
              id: "email",
              Header: 'Email',
              accessor: "email",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.email}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
           {
              id: "startTime",
              Header: 'Period',
              accessor: "startTime",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        From {this.formatDate(original.startTime)} to {this.formatDate(original.endTime)}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
           {
              id: "clientName",
              Header: 'Client Name',
              accessor: "clientName",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.clientName?
                            <span>
                              {original.clientName}
                              <br />
                              <NavLink to={""}> View Profile</NavLink>
                            </span>
                          :""}

                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
          {
              id: "maxBiddingPrice",
              Header: 'Max. Bidding Price',
              accessor: "maxBiddingPrice",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.maxBiddingPrice?original.maxBiddingPrice:""}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
          
           {
              id: "inspectorQuote",
              Header: 'Inspector Deduction',
              accessor: "inspectorQuote",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                          15%
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
          
          {
              id: "customerQuote",
              Header: 'Client Mark Up',
              accessor: "customerQuote",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                         15%
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
          {
              id: "quotationMethos",
              Header: 'Additional Charges',
              accessor: "quotationMethos",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                       Lump Sum
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
           {
              id: "totalInspectionFees",
              Header: 'Admin Message',
              accessor: "totalInspectionFees",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.totalInspectionFees?original.totalInspectionFees:""}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
           {
              id: "totalexpense",
              Header: 'Recommended Quotation',
              accessor: "totalexpense",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.totalexpense?original.totalexpense:""}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
            {
           {
              id: "status",
              Header: 'Current Status',
              accessor: "status",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.status}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
          {     id: "actions",
                accessor: "",
                Cell: ({ original }) => {
                    return (
                        <div className="action-tab-datables">
                            <div  className="dropdown-right" id={"custom-dropdown"+original.id}>
                                <DropdownButton
                                    title={
                                        <span><i className="fa fa-ellipsis-v"></i></span>
                                    }
                                    className={'custom-dropdown '+ original.id}
                                    id={original.id}
                                >
                                  {this.renderActions(original)}
                                      
                                </DropdownButton>
                            </div>
                        </div>
                    );
                },
                Header: x => {
                    return (
                        <span></span>
                    );
                },
                sortable: false,
                filterable: false,
                resizable: false,
                width: 60,
                style: _getDeafultColumnsWidth({minWidth:60}),
                headerStyle:  _getDeafultColumnsWidth({minWidth:60})
            }

        ];

        columnsList = _removeColumnsIfNotNeeded(columnsList, removeColumnsFromGrid);

        columnsList = [
            {
                columns:columnsList
            }
        ];
        return columnsList;
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
      actions.push(<div className="btn" key={"enquiry_action_cancel_"+enquiry.id}>
        <button onClick={ () => this.cancelEnquiry(enquiry.id)}>Cancel</button>
        </div>);
    }
    
    if(enquiry.status == 'CREATED') {
      actions.push(<div className="btn" key={"enquiry_action_updatequote_"+enquiry.id}>
        <button onClick={ () => this.openUpdateQuoteDialog(enquiry.id)}>Edit  Quote</button>
      </div>);
      actions.push(<div className="btn" key={"enquiry_action_assign_si_"+enquiry.id}>
        <NavLink to={`${this.props.match.url}/enquiry/${enquiry.id}/inspectors/`}><button>Assign Inspectors</button></NavLink>
      </div>);
    }

    return actions;
  }

  renderEnquiries(enquiries) {
  	var items = [];
  	
   return (
         <ReactTable
            data={enquiries}
            filterable
            columns={this._setColumnsList()}
            minRows={0}
            showPagination={false}
            manual
            freezeWhenExpanded={true}
            onFetchData={(state, instance) => {
                if(state.filtered && state.filtered.length > 0) {
                    this.props.getCustomerEnquiries();
                } else {
                     this.props.getCustomerEnquiries();
                }
            }}
            className={ "-striped -highlight apply-action-column-datatabl"}

            >
            </ReactTable>
                                  
      )


    
  }

  render() {
    if(this.props.enquiries && this.props.enquiries.length > 0) {
      return(<div className="enquiries"> 
            <h1>Enquiries</h1>
            {this.renderEnquiries(this.props.enquiries)}
            {this.renderUpdateQuoteDialog()}
      </div>);
    } else {
      return(<div className="enquiries"> 
        Fetching enquiries
      </div>);
    }
    
  }
}