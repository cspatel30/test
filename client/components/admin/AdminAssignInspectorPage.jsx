// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import BootstrapTable from 'react-bootstrap-table-next';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Pagination from 'materialui-pagination';
var moment = require('moment');

const styles = {
  assignInspectorDialog: {
    width: '95%',
    maxWidth: '95%',
    margin: '0 auto',
    boxSizing: 'border-box',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    position: 'relative',
    zIndex: 1500,
    opacity: 1,
    transform: 'translate(0px, 64px)'
  },
  column: {
    overflow: 'auto',
    textOverflow: 'initial'
  }
}

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

export default class AdminAssignInspectorPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedEnquiryId: this.props.match.params.enquiryId,
      selectedRows: {},
      order: 'asc',
      orderBy: 'id',
      selected: [],
      page: 0,
      rowsPerPage: 5,
      data:  [
		{
			"id": 11,
			"userId": 3,
			"seaport": 11131,
			"profilePic": "3.png",
			"qualification": "MASTER_MARINER",
			"position": "OTHERS",
			"passport": "Z2756012",
			"dob": "1973-07-18T00:00:00.000Z",
			"nationality": "Indian",
			"validMedicalInsurance": 1,
			"validIndemnityInsurance": 1,
			"validEmploymentMedicalCert": 1,
			"skills": "Marine Surveys, Safety & Quality Management, Auditing & Training",
			"approvedVesselTypesKeys": "BULK_CAR,OIL_TANK,CHEM_TANK,CONTAINERSHIP",
			"approvedInspectionTypesKeys": "PVI,ISMIA,ISMTI",
			"coveredAreasKeys": "AS",
			"background": "In-depth understanding of  vessel safe operation, vessel technical Management, Quality audits and inspection. He has sailed on variety of ships including Bulk, Oil and Chemical Tankers. He has worked ashore as QHSE Inspector, auditor with a global ship management and consulting companies.",
			"highestRankOnboard": "Captain",
			"highestRankAshore": "Marine Manager",
			"experienceYears": 25,
			"totalInspections": 80,
			"rating": 5,
			"passportDoc": "3.jpeg",
			"name": "Capt. Sachin D Khaire",
			"email": "info3@sinotechmarine.com",
			"company": "Freelancer",
			"phone": "30184902",
			"city": "HK",
			"countryCode": "HK",
			"positionDisplayName": "Others",
			"qualificationDisplayName": "Master Mariner",
			"approvedVesselTypes": [
				"Bulk Carrier",
				"Oil Tanker",
				"Chemical Tanker",
				"Containership"
			],
			"approvedInspectionTypes": [
				"Pre-Vetting Inspection",
				"ISM Internal Audit",
				"ISM Technical Inspection"
			],
			"coveredAreas": [
				"Asia"
			],
			"country": {
				"code": "HK",
				"name": "Hong Kong",
				"fullName": "Hong Kong Special Administrative Region of China",
				"iso3": "HKG",
				"number": 344,
				"continentCode": "AS",
				"continentName": "Asia",
				"phoneCode": 852
			}
		},
        {
			"id": 29,
			"userId": 63,
			"seaport": 12853,
			"qualification": "CHIEF_MARINE_ENGG",
			"position": "OTHERS",
			"cvDoc": "63.pdf",
			"passportDoc": "63.pdf",
			"seamanBookDoc": "63.pdf",
			"qualificationDoc": "63.pdf",
			"identityProofDoc": "63.pdf",
			"name": "Ranjan Dutta",
			"email": "aardee@aardeemarine.com",
			"company": "Aardee Marine Consulting LLC",
			"phone": "7862001528",
			"city": "Coral Springs",
			"countryCode": "US",
			"positionDisplayName": "Others",
			"qualificationDisplayName": "Chief Marine Engineer",
			"country": {
				"code": "US",
				"name": "United States of America",
				"fullName": "United States of America",
				"iso3": "USA",
				"number": 840,
				"continentCode": "NA",
				"continentName": "North America",
				"phoneCode": 1
			}
		}
	]
    }

    this.onRowSelect = this.onRowSelect.bind(this);
    this.assignInspectors = this.assignInspectors.bind(this);
  }

  componentWillMount() {
    this.props.searchInspectorsForEnquiry(this.props.match.params.enquiryId);
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    if(event === "all" || event==="none"){
        this.handleSelectAllClick(event, event==="none"?false:true);
    }
    else{
    const { selected } = this.state;
    let id = this.state.data[event[0]].id;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
  

    this.setState({ selected: newSelected });
    }

    console.log(" handleClick",event, id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;


  onRowSelect(row, isSelect, rowIndex) { 
    console.log('...row', row, isSelect, rowIndex);
    if(isSelect) {
      this.setState((state) => { state.selectedRows[row.userId] = true;});
    } else {
      this.setState((state) => { delete state.selectedRows[row.userId]});
    }
  } 

  assignInspectors() {
    if(Object.keys(this.state.selectedRows).length == 0) {
      alert("Please select atleast 1 inspector");
    } else {
      this.props.assignInspectorsForEnquiry(this.state.selectedEnquiryId, Object.keys(this.state.selectedRows));
    }
  }

  renderErrorMessage() {
    if(this.props.error && this.props.error.message) {
      return (<div className="error">{this.props.error.message}</div>);
    } else
      return null;
  }

  render() {
    const { selectedRows } = this.state;
    var selectedUserIds = [];
    if(this.props.currentEnquiry && this.props.currentEnquiry.inspectors && this.props.currentEnquiry.inspectors.length > 0) {
      this.props.currentEnquiry.inspectors.map((mapping) => {selectedUserIds.push(mapping.inspector_user_id)});
    }
    console.log("selected = ", selectedUserIds);

    const selectRow = 
      { mode: 'checkbox', clickToSelect: true, bgColor: '#f7f7f7', 
        onSelect: this.onRowSelect,
        selected: Object.keys(selectedRows).map(x => parseInt(x)),
      };

     let inspectorsList = this.state.data;//this.props.currentEnquiry.inspectors; 

    console.log(":inspectorsListinspectorsList",inspectorsList);
    if(this.props.inspectorAssignedSuccess) {
      return (<div className="success">Inspectors Assigned Successfully</div>);
    }
    else {
      if(inspectorsList || this.props.enquiryInspectorMatches && this.props.enquiryInspectorMatches.length > 0) {
        return(
          <div>
            {this.renderErrorMessage()}
            <div style={{marginTop: 10, marginBottom: 10, textAlign: 'right'}}><button onClick={this.assignInspectors}>Assign Inspectors</button></div>
           {/* <BootstrapTable keyField='userId' data={ this.props.enquiryInspectorMatches } columns={ columns } striped condensed bordered={false}
            noDataIndication="No matches found" selectRow={selectRow} store={ {selected : selectedUserIds } }/>
            */}
            hello
            <Table style={{tableLayout: 'auto'}} selectable={true}
                multiSelectable={true}
                onRowSelection={this.handleClick}>
                            <TableHeader displaySelectAll={true} adjustForCheckbox={true}>
                                <TableRow >
                                    <TableHeaderColumn className="table-title">Identity</TableHeaderColumn>
                                    <TableHeaderColumn className="table-title">Details </TableHeaderColumn>
                                    <TableHeaderColumn className="table-title">Lump sum pricing </TableHeaderColumn>
                                    <TableHeaderColumn className="table-title">US$ </TableHeaderColumn>
                                    <TableHeaderColumn className="table-title">Mark up %</TableHeaderColumn>
                                    <TableHeaderColumn className="table-title align-center">Client Quotation</TableHeaderColumn>
                                    <TableHeaderColumn className="table-title">Daily Rate</TableHeaderColumn>
                                    <TableHeaderColumn className="table-title align-center">US$</TableHeaderColumn>
                                    <TableHeaderColumn className="table-title">Mark up %</TableHeaderColumn>
                                    <TableHeaderColumn className="table-title align-center">Client Quotation</TableHeaderColumn>
                                    <TableHeaderColumn className="table-title align-center">Status</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    (inspectorsList.length > 0 ? inspectorsList.map((item, index) => {
                                           const isSelected = this.isSelected(item.id);
                                            return (
                                                <TableRow >
                                                    <TableRowColumn padding="checkbox">
                                                        <Checkbox checked={isSelected} />
                                                    </TableRowColumn>
                                                    <TableRowColumn>
                                                        <div className="clear">{item.id}</div>
                                                        <div className="clear">{item.name}</div>
                                                        <div className="clear">{item.city+' , '+item.country.name}</div>
                                                    </TableRowColumn>
                                                    <TableRowColumn>{item.country?item.country.name:""}</TableRowColumn>
                                                    <TableRowColumn>
                                                        <div>Inspection Fee </div>
                                                        <div>Travel Expense</div>
                                                        <div>Others</div>
                                                    </TableRowColumn>
                                                    <TableRowColumn>
                                                        <div>1200</div>
                                                        <div>300</div>
                                                    </TableRowColumn>
                                                     <TableRowColumn>
                                                        <div>30</div>
                                                        <div>10</div>
                                                    </TableRowColumn>
                                                    <TableRowColumn>
                                                        <div>1560</div>
                                                        <div>330</div>
                                                    </TableRowColumn>
                                                    <TableRowColumn>
                                                        <div>InspectionService</div> 
                                                        <div>Traveling/Waiting Charges</div>
                                                        <div>Estimated Inspection Days</div>
                                                        <div>Estimated Trave/Waiting Days</div>
                                                    </TableRowColumn>
                                                    <TableRowColumn>
                                                        <div>30</div> 
                                                        <div>$250</div>
                                                        <div>5</div>
                                                    </TableRowColumn>
                                                     <TableRowColumn>
                                                        <div>30</div> 
                                                        <div>$10</div>
                                                        <div>0</div>
                                                    </TableRowColumn>
                                                     <TableRowColumn>
                                                        <div>$455</div> 
                                                        <div>$275</div>
                                                        <div>5</div>
                                                    </TableRowColumn>
                                                     <TableRowColumn>
                                                        <div>Attachments Edit</div> 
                                                        <div>Cancel</div>
                                                    </TableRowColumn>
                                                </TableRow>
                                            );
                                        }) :  <TableRow><TableRowColumn className='no-record'>No record found</TableRowColumn></TableRow>)
                                }
                            </TableBody>
                        </Table>
          </div>);
      } else {
        return(<div>
            {this.renderErrorMessage()}
            Searching...
        </div>);
      }
    }
  }
}