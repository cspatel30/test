import React, { Component } from 'react';
import _ from 'lodash';
import {WAIT} from '../../../constants/ActionsTypes.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import ReactTable from "react-table";
import { NavLink } from 'react-router-dom';
import { _getDeafultColumnsWidth, _selectNewRecordsIfAllSelected, toggleSelectAll,
 toggleRow, _removeColumnsIfNotNeeded, _createFiltersQueryString, _createSortedDataString,
 _setTableStateWithPagination, _getSelectedRecordsKeyArray  } 
 from '../reactTableCustomFunctions.js';
import { isEmptyObject } from '../../../common/global.jsx';
import Confirm from 'react-confirm-bootstrap';
import moment from 'moment';
import PageBase from '../PageBase';
import '../admin.scss';

export default class AdminAssignInspectorPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
    selectedEnquiryId: this.props.match.params.enquiryId,  
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
    };
    this._setColumnsList = this._setColumnsList.bind(this);
    this.setSelectedRecordsInState = this.setSelectedRecordsInState.bind(this);
    this._loadApiDatapageLoad =  this._loadApiDatapageLoad.bind(this);
    this._loadApiDatapageLoadFilter =  _.debounce(this._loadApiDatapageLoadFilter.bind(this), WAIT);
    this._getApiCall = this._getApiCall.bind(this);
    this.assignInspectors = this.assignInspectors.bind(this);
  }

  componentWillMount() {
    if(this.props.adminAuthToken) {
      this._getApiCall();
    }
  }

  _getApiCall(){
        let { tableStates } = this.state;
        
        let queryData = {
            startIndex: parseInt(tableStates.page-1),
            pageSize: tableStates.pageSize,
            // sorted: tableStates.sorted,
            // filtered: tableStates.filtered
        };

        // const { conditionalRequiredFilter } = this.props;
        // if(conditionalRequiredFilter){
        //     if(queryData.filtered){
        //         queryData.filtered = queryData.filtered+'&'+conditionalRequiredFilter;
        //     }
        //     else {
        //         queryData.filtered = conditionalRequiredFilter;
        //     }

        // }      
        this.props.searchInspectorsForEnquiry(queryData);  
  }
  componentWillReceiveProps(props) {
    if(!this.props.adminAuthToken && props.adminAuthToken && (!this.props.adminRefreshApiList || props.adminRefreshApiList!=this.props.adminRefreshApiList )) {
       this._getApiCall();
    }
    if((isEmptyObject(this.props.adminInspectorsList) || isEmptyObject(this.state.tableStates.rows)) && !isEmptyObject(props.adminInspectorsList)){
        let { tableStates } = this.state;
        let tableStatesCustom = _setTableStateWithPagination(tableStates,  props.adminInspectorsList.data);
        this.setState((state) => { state.tableStates = tableStatesCustom});        
    }

    /*Check if assign inspector successful */
    if(!this.assignInspectorStatus && props.assignInspectorStatus){
        this.props.changeAssignInspectorStatus(false);
        this.props.history.push('/admin/enquiries');
    }
  }

  
  assignInspectors() {
    const { tableStates } = this.state;
    if(Object.keys(tableStates.selected).length == 0) {
        alert("Please select atleast 1 inspector");
    } else {
        this.props.assignInspectorsForEnquiry(
          {
            enquiryId:  [parseInt( this.state.selectedEnquiryId)],
            inspectorId:  _getSelectedRecordsKeyArray(tableStates.selected)
          }
        );
    }
  }

  setSelectedRecordsInState = (rowResponse) => {
        let { tableStates } = this.state;
        tableStates.selected = rowResponse.selected;
        tableStates.selectAll = rowResponse.selectAll;
        this.setState({
            tableStates
        });
    }


  _setColumnsList = () => {
        let columnsList = [];
        const { removeColumnsFromGrid, _updateUserActiveStatus,
            isListOpenInModal, showInlineDetailInfo } = this.props;
        const { markupFieldsDeduction, tableStates } = this.state;
        columnsList =  [
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                    return (
                        <label className="label-checkbox">
                        {tableStates.selected[original.id]}-
                            {
                                removeColumnsFromGrid && removeColumnsFromGrid.indexOf("select")>-1
                                    ?"":
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={tableStates.selected[original.id] === true}
                                            onChange={() => {
                                                 let rowResponse = toggleRow(original.id, tableStates.selected, this.props.selectOneRecordOnly? tableStates.rows:false);
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
                        <label className="label-checkbox">
                            {
                                removeColumnsFromGrid && removeColumnsFromGrid.indexOf("selectAll")>-1
                                    ?"":
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={tableStates.selectAll === 1}
                                            ref={input => {
                                                if (input) {
                                                    input.indeterminate = tableStates.selectAll === 2;
                                                }
                                            }}
                                            onChange={() => {
                                                let rowResponse = toggleSelectAll(tableStates.selectAll, tableStates.rows);
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
                id: "firstName",
                Header: 'Name',
                accessor: "firstName",
                Cell: ({ original }) => {
                    return (
                        <div  className="columns-lower-Case-text">
                          {original.firstName + ' '+ original.lastName}
                        </div>

                    );
                },
                sortable:false,
                filterable: false,
                style: _getDeafultColumnsWidth(),
                headerStyle:  _getDeafultColumnsWidth()
            },
            {
                id: "company",
                Header: 'Company',
                accessor: "company",
                Cell: ({ original }) => {
                    return (
                        <div  className="columns-lower-Case-text">
                          {original.company}
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
                        <div>
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
                id: "position",
                Header: 'Position',
                accessor: "position",
                Cell: ({ original }) => {
                    return (
                        <div  className="columns-lower-Case-text">
                          {original.position}
                        </div>

                    );
                },
                sortable:false,
                filterable: false,
                style: _getDeafultColumnsWidth(),
                headerStyle:  _getDeafultColumnsWidth()
            },
             {
              id: "qualification",
              Header: 'Qualification',
              accessor: "qualification",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.qualification}
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
                id: "experienceYears",
                Header: 'Experience in years',
                accessor: "experienceYears",
                Cell: ({ original }) => {
                    return (
                        <div  className="columns-lower-Case-text">
                          {original.experienceYears}
                        </div>

                    );
                },
                sortable:false,
                filterable: false,
                style: _getDeafultColumnsWidth(),
                headerStyle:  _getDeafultColumnsWidth()
            },
            
            {
              id: "highestRankAshore",
              Header: 'Highest Rank Ashore',
              accessor: "highestRankAshore",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.highestRankAshore}
                      </div>

                  );
              },
              sortable:false,
              filterable: false,
              style: _getDeafultColumnsWidth(),
              headerStyle:  _getDeafultColumnsWidth()
          },
           {
              id: "totalInspectionDone",
              Header: 'Total inspections',
              accessor: "totalInspectionDone",
              Cell: ({ original }) => {
                  return (
                      <div  className="columns-lower-Case-text">
                        {original.totalInspectionDone}
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
                                        <NavLink to={'/inspector/profile/'+original.id}>View profile</NavLink>
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

  _loadApiDatapageLoadFilter(requestData){
      this._loadApiDatapageLoad(requestData);
  }

_loadApiDatapageLoad(requestData){
    const { tableStates } = this.state;
    let pageNumber = requestData.page + 1;

    if (requestData.pageSize !== tableStates.pageSize) {
        pageNumber = 1;
    }

    let filteredData = "";
    if (requestData.filtered && requestData.filtered.length > 0) {
        filteredData = _createFiltersQueryString(requestData.filtered);
    }

    let sortedData = '';
    if (requestData.sorted && requestData.sorted.length > 0) {
        let id = requestData.sorted[0].id;
        sortedData = _createSortedDataString(id, requestData.sorted[0].desc);
    }

    this.setState({
        page: pageNumber,
        pageSize: requestData.pageSize,
        sorted: sortedData,
        filtered: filteredData,
        dataTableLoading: true

    }, function stateUpdateComplete() {
        this._getApiCall();
    }.bind(this));
      
    }

   renderTableList(list) {
    const { subComponentTableData, tableStates } = this.state;
    return (
         <ReactTable
            data={list}
            filterable
            columns={this._setColumnsList()}
            defaultPageSize={tableStates.pageSize}
            minRows={0}
            showPagination={tableStates.totalRecords > tableStates.pageSize ? true : false}
            pageSizeOptions={[20]}
            pages={tableStates.totalPagesWithRecords ? tableStates.totalPagesWithRecords : 1}
            manual
            freezeWhenExpanded={true}
            onFetchData={(state, instance) => {
                if(state.filtered && state.filtered.length > 0) {
                    this._loadApiDatapageLoadFilter(state);
                } else {
                     this._loadApiDatapageLoad(state);
                }
            }}
            className={ "-striped -highlight apply-action-column-datatabl"}
            >
            </ReactTable>
                                  
      )

  }

  renderAssignInspector(){
    return (
      <div>
        <button className="cursor-pointer" onClick={this.assignInspectors}>Assign Inspectors</button>
      </div>
    )
  }

  render() {
    const { tableStates } = this.state;
    if(tableStates.rows && tableStates.rows.length > 0) {
      return(
          <PageBase title={"Enquiries"}>
            <div>
                {this.renderAssignInspector()}
                {this.renderTableList(tableStates.rows)}
            </div>
      </PageBase>);
    } else {
      return(<div className="enquiries"> 
        Fetching inspectors
      </div>);
    }
    
  }
}