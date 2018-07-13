
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import {FormattedMessage} from 'react-intl';
import moment from 'moment';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import ReactTable from "react-table";
import { NavLink } from 'react-router-dom';
import { _getDeafultColumnsWidth, _selectNewRecordsIfAllSelected, toggleSelectAll,
 toggleRow, _removeColumnsIfNotNeeded, _createFiltersQueryString, _createSortedDataString } 
 from '../reactTableCustomFunctions';
import PageBase from '../PageBase';
import Confirm from 'react-confirm-bootstrap';
import '../admin.scss';

export default class AdminOrderComponent extends Component {

  constructor(props) {
  	super(props);

  	this.state = {
  		orders: [],
      errorMsg: null,
      uploadReportModal: false,
      report1: '',
      report2: '',
      report3: '',
       tableStates:  {
            rows: [],
            columns: [],
            page: 1,
            pageSize: 20,
            totalRecords: 1,
            totalPagesWithRecords: 1,
            sorted: "",
            dataTableLoading: false,
            filtered: [],  selected: {}, selectAll: 0, setDefaultSelectedRecords:false,
            imagePath : "",
            apiCallRecords : {callOccurance:0, noRecordExist: false},
            previewImage: {imagePreviewOpen: false, selectedImage: "", title: "" }
        } 
  	}
    this._setColumnsList = this._setColumnsList.bind(this);
    this.setSelectedRecordsInState = this.setSelectedRecordsInState.bind(this);
     this._getApiCall = this._getApiCall.bind(this);
  }

  componentWillMount() {

    if(this.props.adminAuthToken) {      
      this._getApiCall();
    }
  }

   _getApiCall(){
        let { tableStates } = this.state;
        let tableStatesCustom = tableStates;
        this.props.getAdminOrders({page: tableStates.page, pageSize: tableStates.pageSize});
        if(this.props.adminOrderList){
          tableStatesCustom.rows = this.props.adminOrderList;
          this.setState((state) => { state.tableStates = tableStatesCustom});
        }
  }

  componentWillReceiveProps(props) {
  	if(!this.props.adminAuthToken && props.adminAuthToken) {
  		this._getApiCall();
  	}


  	this.setState((state) => { state.errorMsg = props.error; })
  }

  handleFileUploadInputChange(event) {
  	console.log('upload...', event.target.name, event.target.files[0]);
  	// this.props.handleFileUpload(this.props.inspectorProfile.userId, 'sinotechmarineassets', event.target.name, event.target.files[0]);
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

  renderUploadReport() {
    const { uploadReportModal } = this.state;
    const arr = ['Part A', 'Part B', 'Part C'];
    return (
      <Dialog
        title="Upload Reports"
        modal={false}
        open={uploadReportModal}
        autoScrollBodyContent={true}
      >
        <div className="py-2 pr-2" style={{color: '#000000'}}>
          <div className="mb-3">Please upload Reports of Inspection</div>
          {
            arr.map((x, key) => (
              <div className="d-flex mb-3" key={key}>
                <div className="col-2"><b>{x}</b></div>
                <div className="col-6">files ( .doc, .pdf,.jpg), max size 500 MB</div>
                <div className="col-4"><input type="file" value="" name={`inspector/report${key+1}`} onChange={(e) => this.handleFileUploadInputChange(e, `report${key+1}`)} /></div>
              </div>
            ))
          }
          <button type="button" style={{width: 'fit-content', float: 'right'}} className="btn btn-primary" onClick={() => this.setState({uploadReportModal: false})}>Close</button>
        </div>  
      </Dialog>
    )
  }

  renderAdminOrders(admin, orders) {
      console.log("orders???", orders);
      return (
           <ReactTable
            data={orders}
            filterable
            columns={this._setColumnsList()}
            minRows={0}
            showPagination={false}
            manual
            freezeWhenExpanded={true}
            className={ "-striped -highlight apply-action-column-datatabl"}
            />
      )
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
                                                // let rowResponse = toggleRow(original.id, this.state.tableStates.selected, this.props.selectOneRecordOnly? this.props.getCustomerEnquiries():false);
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
                id: "createdOn",
                Header: 'PO No.',
                accessor: "createdOn",
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
              id: "client>name",
              Header: 'Client Name',
              accessor: "client>name",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.clientName?
                            <span>
                              {original.client.name}
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
              id: "clientMessage",
              Header: 'Client Message',
              accessor: "clientMessage",
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
              id: "assignedInspector",
              Header: 'Assigned Inspector',
              accessor: "assignedInspector",
              Cell: ({ original }) => {
                  return (
                      <div>
                         {original.assignedInspector?
                             <span>
                                {original.assignedInspector.name}
                                {original.assignedInspector.id}
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
              id: "adminMessage",
              Header: 'Admin Message',
              accessor: "adminMessage",
              Cell: ({ original }) => {
                  return (
                      <div>
                         {original.adminMessage}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
          {
              id: "clientOrderAmount",
              Header: 'Client Order Amount',
              accessor: "clientOrderAmount",
              Cell: ({ original }) => {
                  return (
                      <div>
                        {original.clientOrderAmount}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },

          {
              id: "inspectorQuotationAmount",
              Header: 'Inspector Quotation Amount',
              accessor: "inspectorQuotationAmount",
              Cell: ({ original }) => {
                  return (
                      <div>
                        {original.inspectorQuotationAmount}
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
                        {original.inspectorOrderAmount}
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

  render() {
  const { adminAuthToken } = this.props;
  const { orders, tableStates} = this.state;
  let returnHtml = '';
  console.log("tableStates>>", tableStates);
 	if(adminAuthToken) {
      if(this.state.tableStates.rows && this.state.tableStates.rows.length > 0) {
		returnHtml =  (
            <div className="orders"> 
          		<div className="error">{this.state.errorMsg}</div>
                {this.renderAdminOrders(adminAuthToken, this.state.tableStates.rows)}
            </div>
      	);
	  } else {
  		returnHtml =  (
          <div className="page">
            <div className="orders">
          	   <p>You have no pending orders</p>
            </div>
          </div>
    	);
      }
    } else {
      returnHtml =  (<div className="page">
          <div>You need to login to see your orders</div>
      </div>);
	  }

      return (
           <PageBase title={"Manage Orders"}>
                <div>
                    {returnHtml}
                </div>
            </PageBase>
      )

  }
  
}