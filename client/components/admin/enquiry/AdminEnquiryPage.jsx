import React, { Component } from 'react';
import _ from 'lodash';
import {WAIT} from '../../../constants/ActionsTypes.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import ReactTable from "react-table";
import { NavLink } from 'react-router-dom';
import { _getDeafultColumnsWidth, _selectNewRecordsIfAllSelected, toggleSelectAll,
 toggleRow, _removeColumnsIfNotNeeded, _createFiltersQueryString, _createSortedDataString } 
 from '../reactTableCustomFunctions';

import Confirm from 'react-confirm-bootstrap';
import moment from 'moment';
import PageBase from '../PageBase';
import AdminSetMarkupPercentage from './AdminSetMarkupPercentage';
import '../admin.scss';

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
            apiCallRecords : {callOccurance:0, noRecordExist: false},
            previewImage: {imagePreviewOpen: false, selectedImage: "", title: "" },
            selected: {}, selectAll: 0,
        } ,
      subComponentTableData: {
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
            apiCallRecords : {callOccurance:0, noRecordExist: false},
            selected: {}, selectAll: 0,
          },
          markupFieldsDeduction: {
              inspector: 15,
              client: 15
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
    this._setColumnsListSubComponent = this._setColumnsListSubComponent.bind(this);
    this._loadSubcomponentData = this._loadSubcomponentData.bind(this);
    this._loadApiDatapageLoadFilter =  _.debounce(this._loadApiDatapageLoadFilter.bind(this), WAIT);
    this._loadSubcomponentDataFilter =  _.debounce(this._loadSubcomponentDataFilter.bind(this), WAIT);
    this.onChange = this.onChange.bind(this);
    this._getApiCall = this._getApiCall.bind(this);
  }

  componentWillMount() {
    if(this.props.userProfile) {
      this._getApiCall();
    }
  }

  _getApiCall(){
        let { tableStates } = this.state;
        let tableStatesCustom = tableStates;
        this.props.getAdminEnquiries({page: tableStates.page, pageSize: tableStates.pageSize});
        if(this.props.adminEnquiryList){
          tableStatesCustom.rows = this.props.adminEnquiryList;
          this.setState((state) => { state.tableStates = tableStatesCustom});
        }
  }
  componentWillReceiveProps(props) {
    if(!this.props.userProfile && props.userProfile) {
       this._getApiCall();
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

    setSelectedRecordsInState = (rowResponse) => {
        const { setSelectedRecordList } =  this.props;
        if(setSelectedRecordList){
            if(this.props.selectOneRecordOnly) {
                const data = Object.assign({}, rowResponse.selectedUserData);
                setSelectedRecordList({
                    selected: rowResponse.selected,
                    selectAll: rowResponse.selectAll,
                    selectedSingleData: data
                });
            }
            else{
                setSelectedRecordList({
                    selected: rowResponse.selected,
                    selectAll: rowResponse.selectAll
                });

            }
        }
        this.setState({
            selected: rowResponse.selected,
            selectAll: rowResponse.selectAll
        });
    }


  _setColumnsList = () => {
        let columnsList = [];
        const { removeColumnsFromGrid, _updateUserActiveStatus,
            isListOpenInModal, showInlineDetailInfo } = this.props;
        const { markupFieldsDeduction } = this.state;    
        columnsList =  [
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                    return (
                        <label className="label-checkbox">
                            {
                                removeColumnsFromGrid && removeColumnsFromGrid.indexOf("select")>-1
                                    ?"":
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={this.state.tableStates.selected[original.id] === true}
                                            onChange={() => {
                                                // let rowResponse = toggleRow(original.id, this.state.tableStates.selected, this.props.selectOneRecordOnly? this.props.getAdminEnquiries():false);
                                                // this.setSelectedRecordsInState(rowResponse);
                                            }}
                                        />
                                        <span className="custom-checkbox"></span>
                                    </div>
                            }

                        </label>

                    );
                },
                Header: x => {
                    return (
                        <label className="label-checkbox">
                            {
                                removeColumnsFromGrid && removeColumnsFromGrid.indexOf("selectAll")>-1
                                    ?"":
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={this.state.selectAll === 1}
                                            ref={input => {
                                                if (input) {
                                                    input.indeterminate = this.state.selectAll === 2;
                                                }
                                            }}
                                            onChange={() => {
                                                let rowResponse = toggleSelectAll(this.state.selectAll, this.state.rows);
                                                this.setSelectedRecordsInState(rowResponse);
                                            }}
                                        />
                                        <span className="custom-checkbox"></span>
                                    </div>
                            }

                        </label>
                    );
                },
                sortable: false,
                filterable: false,
                width: 45,
                style: _getDeafultColumnsWidth({minWidth:45}),
                headerStyle:  _getDeafultColumnsWidth({minWidth:45})
              },
             {
                id: "id",
                Header: 'Ref No.',
                accessor: "id",
                Cell: ({ original }) => {
                    return (
                        <div  className="columns-lower-Case-text">
                          {original.id}
                          <div>
                            {moment(original.createdOn).format("DD/MM/YYYY")}
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
                        <div>
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
                      <div>
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
                      <div>
                          {markupFieldsDeduction.inspector}%
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
                      <div>                         
                          {markupFieldsDeduction.client}%
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
                      <div>
                       
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
                      <div>
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
              id: "status",
              Header: 'Current Status',
              accessor: "status",
              Cell: ({ original }) => {
                  return (
                      <div>
                        {original.status}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
          {
                id: "actions",
                accessor: "",
                Cell: ({ original }) => {
                    let oppositeStatus = (original.status=="1")?"inactive":"active";
                    let userStatus  = (original.status!="1")?"inactive":"active";
                    return (
                        <div className="action-tab-datables">
                            <div  className="dropdown-right">
                                <DropdownButton
                                    title={
                                        <span><i className="fa fa-ellipsis-v"></i></span>
                                    }
                                    id={original.id}
                                >
                                    <li role="presentation">
                                        <a role="main" tabIndex="-1">Edit</a>
                                    </li>
                                    
                                     <li>
                                        <a role="main" tabIndex="-1">
                                            <Confirm
                                                onConfirm={()=>{}}
                                                body={"Are you sure you want to delete this order?"}
                                                onfirmText={"Ok"}
                                                title={"Delete Order"}>
                                                <div>
                                                    Delete Order
                                                </div>
                                            </Confirm>
                                        </a>
                                    </li>
                                    <li role="presentation">
                                        <a role="main" tabIndex="-1">Attach File</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="main" tabIndex="-1">Send to inspector</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="main" tabIndex="-1">Go to enquiry</a>
                                    </li>
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

   /* Show List as SubComponent */
    _setColumnsListSubComponent = () => {
        let columnsList = [];
        const { removeColumnsFromGrid } = this.props;
        const { subComponentTableData, markupFieldsDeduction } = this.state;
        columnsList =  [
           {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                    return (
                       <label className="label-checkbox">
                            {
                                removeColumnsFromGrid && removeColumnsFromGrid.indexOf("selectAll")>-1
                                    ?"":
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={this.state.selectAll === 1}
                                            ref={input => {
                                                if (input) {
                                                    input.indeterminate = this.state.selectAll === 2;
                                                }
                                            }}
                                            onChange={() => {
                                                let rowResponse = toggleSelectAll(this.state.selectAll, this.state.rows);
                                                this.setSelectedRecordsInState(rowResponse);
                                            }}
                                        />
                                        <span className="custom-checkbox"></span>
                                    </div>
                            }

                        </label>
                        
                    );
                },
                Header: x => {
                    return (
                        
                        <div>Select </div>
                    );
                },
                sortable: false,
                filterable: false,
                width: 100,
                style: _getDeafultColumnsWidth({minWidth:100}),
                headerStyle:  _getDeafultColumnsWidth({minWidth:100})
              },
               {
                id: "checkbox2",
                accessor: "",
                Cell: ({ original }) => {
                    return (
                        <label className="label-checkbox">
                            {
                                removeColumnsFromGrid && removeColumnsFromGrid.indexOf("selectAll")>-1
                                    ?"":
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={this.state.selectAll === 1}
                                            ref={input => {
                                                if (input) {
                                                    input.indeterminate = this.state.selectAll === 2;
                                                }
                                            }}
                                            onChange={() => {
                                                let rowResponse = toggleSelectAll(this.state.selectAll, this.state.rows);
                                                this.setSelectedRecordsInState(rowResponse);
                                            }}
                                        />
                                        <span className="custom-checkbox"></span>
                                    </div>
                            }

                        </label>

                    );
                },
                Header: x => {
                    return (
                        <div>
                            Recommended
                        </div>
                        
                    );
                },
                sortable: false,
                filterable: false,
                width: 100,
                style: _getDeafultColumnsWidth({minWidth:100}),
                headerStyle:  _getDeafultColumnsWidth({minWidth:100})
              },
               {
                  id: "id",
                  Header: 'Inspector.',
                  accessor: "id",
                  Cell: ({ original }) => {
                      return (
                          <div  className="columns-lower-Case-text">
                            <span>{original.name}</span> &nbsp;
                            <span>{original.id}</span> &nbsp;
                            <span>{original.no}</span> &nbsp;
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
              {
                  id: "location",
                  Header: 'Location',
                  accessor: "location",
                  Cell: ({ original }) => {
                      return (
                          <div  className="columns-lower-Case-text">
                            <span>{original.location}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
              {
                  id: "inspectorQuotationFp",
                  Header: 'Inspector  Quotation Fixed Price (US$)  .',
                  accessor: "inspectorQuotationFp",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{original.inspectorQuotationFp}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
              {
                  id: "inspectorOrderAmountAfterDeduction",
                  Header: 'Inspector Order Amount (US$) After Deduction',
                  accessor: "inspectorOrderAmountAfterDeduction",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{original.inspectorQuotationFp -  (original.inspectorQuotationFp*markupFieldsDeduction.inspector)/100}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
               {
                  id: "clientMarkup",
                  Header: 'Client Mark up',
                  accessor: "clientMarkup",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{markupFieldsDeduction.client}%</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
               {
                  id: "clientQuotation",
                  Header: 'Client Quotation (US$) ( E+G)',
                  accessor: "clientQuotation",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span><span>{original.inspectorQuotationFp +  (original.inspectorQuotationFp*markupFieldsDeduction.inspector)/100}</span></span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
               {
                  id: "fee",
                  Header: 'Rate (Per Hour or Per Day)',
                  accessor: "fee",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{original.fee}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
               {
                  id: "inspectionFee",
                  Header: 'Inspection Fee US$',
                  accessor: "inspectionFee",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{original.inspectionFee}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
              {
                  id: "travelingFee",
                  Header: 'Traveling/Waiting Fee US$',
                  accessor: "travelingFee",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{original.travelingFee}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
              {
                  id: "inspectionDuration",
                  Header: 'Duration (Inspection)',
                  accessor: "inspectionDuration",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{original.inspectionDuration}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
              {
                  id: "travelingDuration",
                  Header: 'Duration (Traveling/Waiting)',
                  accessor: "travelingDuration",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{original.travelingDuration}</span>
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
                  Header: 'Inspector - Total Estimated  Quotation US$',
                  accessor: "totalInspectionFees",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{original.totalInspectionFees}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
              {
                  id: "inspectorOrderAmount",
                  Header: 'Inspector Order Amount',
                  accessor: "inspectorOrderAmount",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{original.inspectorOrderAmount}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
              {
                  id: "inspectorClientMarkup",
                  Header: 'Client Mark up',
                  accessor: "inspectorClientMarkup",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{original.inspectorClientMarkup}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
              {
                  id: "clientQuotation",
                  Header: 'Client Quotation (US$) (N+P)',
                  accessor: "clientQuotation",
                  Cell: ({ original }) => {
                      return (
                          <div>
                            <span>{original.clientQuotation}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
              {
                  id: "status",
                  Header: 'Status',
                  accessor: "status",
                  Cell: ({ original }) => {
                      return (
                          <div  className="columns-lower-Case-text">
                            <span>{original.status}</span>
                          </div>

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
              },
              {
                  id: "action",
                  Header: 'Action',
                  accessor: "action",
                  Cell: ({ original }) => {
                      return (
                         <div className="action-tab-datables">
                            <div  className="dropdown-right">
                                 <DropdownButton
                                    title={
                                        <span><i className="fa fa-ellipsis-v"></i></span>
                                    }
                                    id={original.id}
                                >
                                    <li role="presentation">
                                        <a role="main" tabIndex="-1">Attach File</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="main" tabIndex="-1">View Attachment</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="main" tabIndex="-1">Edit Quotations</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="main" tabIndex="-1">View Message</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="main" tabIndex="-1">Edit Message</a>
                                    </li>
                                </DropdownButton>
                          </div>
                        </div> 

                      );
                  },
                  sortable:false,
                  filterable: false,
                  style: _getDeafultColumnsWidth(),
                  headerStyle:  _getDeafultColumnsWidth()
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

    _loadSubcomponentData(requestData) {
        const {subComponentTableData} = this.state;
        let subComponentTableDataCustom = subComponentTableData;
        subComponentTableDataCustom.rows =  [
                        {
                          "id": 11,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 12,
                          "no": 5,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 11,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 13,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 14,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 15,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        }

                      ];

                      console.log("subComponentTableDataCustom>>>", subComponentTableDataCustom);
        this.setState({
          subComponentTableData: subComponentTableDataCustom
        })
    }

   _loadSubcomponentDataFilter(){

  }
  _loadApiDatapageLoadFilter(){

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
    return (
        <div className="global_grid_menu_insidetabs no-padding col-xs-12 col-sm-12">
            <div className="dropdown-right clear custom-dropdown">
                <DropdownButton
                    title={
                        <span><i className="fa fa-ellipsis-v"></i></span>
                    }
                    id="global_grid_menu_insidetabs"
                >
                    <MenuItem>Edit Enquiry</MenuItem>
                    <MenuItem>Add to Inspectors</MenuItem>
                    <MenuItem>Send to Inspectors</MenuItem>
                    <MenuItem>Send to Clients</MenuItem>
                    <MenuItem>Create Order</MenuItem>
                    <MenuItem>Delete</MenuItem>                   
                </DropdownButton>
            </div>
        </div>
      );
}

  renderEnquiries(enquiries) {
    var items = [];
     const { subComponentTableData } = this.state;
     console.log("subComponentTableData?>>", subComponentTableData);
    
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
                    this._loadApiDatapageLoadFilter(state);
                } else {
                      this._getApiCall();
                }
            }}
            className={ "-striped -highlight apply-action-column-datatabl"}

            SubComponent={(row) => {
                let rows1 = Object.assign({}, row.original);
                return (
                    <div className="react-table-remove-headers react-table-subcomponent-main">
                           <em>
                             Fixed Price Quotations 
                            </em>
                            <br />
                            <br />
                             
                            <ReactTable
                              data={rows1.enquiryQuotation}
                              columns={this._setColumnsListSubComponent()}
                              defaultPageSize={3}
                              showPagination={false}
                              onFetchData={(state, instance) => {
                                  
                              }}
                             />
                    </div>
                )
            }}

            >
            </ReactTable>
                                  
      )

  }
  onChange(value, field){
      this.setState((state) => { state.markupFieldsDeduction[field] = value});
  }
  
  saveEnquiryMarkups(){
      this.props.enquiryMarkupSaveSettings(
          {
              customerServiceCharge: this.state.markupFieldsDeduction.client,
              inspectorServiceCharge: this.state.markupFieldsDeduction.inspector
          });
  }

  renderMarkupFields(){
      return (
            <AdminSetMarkupPercentage 
              markupFieldsDeduction = {this.state.markupFieldsDeduction}
              onChange = {this.onChange.bind(this)}    
              saveEnquiryMarkups = {this.saveEnquiryMarkups.bind(this)}
            />
      )
  }

  render() {

    const { tableStates } = this.state;
    console.log(tableStates.rows);
    if(tableStates.rows && tableStates.rows.length > 0) {
      return(
          <PageBase title={"Enquiries"}>
            <div>
                {this.renderMarkupFields()}
                {this.renderEnquiries(tableStates.rows)}
                {this.renderUpdateQuoteDialog()}
            </div>
      </PageBase>);
    } else {
      return(<div className="enquiries"> 
        Fetching enquiries
      </div>);
    }
    
  }
}