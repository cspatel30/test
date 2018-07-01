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
            filtered: "",
            dataTableLoading: false,
            filtered: [],  selected: {}, selectAll: 0, setDefaultSelectedRecords:false,
            imagePath : "",
            apiCallRecords : {callOccurance:0, noRecordExist: false},
            previewImage: {imagePreviewOpen: false, selectedImage: "", title: "" },
            selected: {}, selectAll: 0,
        } 
  	}
    this._setColumnsList = this._setColumnsList.bind(this);
    this.setSelectedRecordsInState = this.setSelectedRecordsInState.bind(this);
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
      const { tableStates } = this.state;
      let tableStatesCustom = tableStates;
      tableStatesCustom.rows = props.orders;
  		this.setState((state) => { state.orders = props.orders; state.tableStates = tableStatesCustom;});
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
    if(1){
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
    else{
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
            <div className="mb-2" style={{fontSize:'15px'}}><b>Order Amount (Client) : </b><span>{x.customerQuote}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Order Amount (Inspector) : </b><span>{x.inspectorQuote}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Paid Status : </b><span>{`value`}</span></div>
            <div className="mb-2" style={{fontSize:'15px'}}><b>Amount Paid: </b><span>{`value`}</span></div>  
          </div>
          <div className="col-4 d-flex flex-column justify-content-around">
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Cancel</button>
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Update Quotation</button>
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Update Feedback</button>
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Request Feedback</button>
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => this.setState({uploadReportModal: true})}>Upload Report</button>
            <button type="button" style={{width: 'fit-content'}} className="btn btn-primary" onClick={() => {}}>Change Inspector</button>
          </div>
        </div>
      ))
    )
    }
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