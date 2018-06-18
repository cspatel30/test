// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import BootstrapTable from 'react-bootstrap-table-next';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
      selectedRows: {}
    }

    this.onRowSelect = this.onRowSelect.bind(this);
    this.assignInspectors = this.assignInspectors.bind(this);
  }

  componentWillMount() {
    this.props.searchInspectorsForEnquiry(this.props.match.params.enquiryId);
  }

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

    if(this.props.inspectorAssignedSuccess) {
      return (<div className="success">Inspectors Assigned Successfully</div>);
    }
    else {
      if(this.props.enquiryInspectorMatches && this.props.enquiryInspectorMatches.length > 0) {
        return(
          <div>
            {this.renderErrorMessage()}
            <div style={{marginTop: 10, marginBottom: 10, textAlign: 'right'}}><button onClick={this.assignInspectors}>Assign Inspectors</button></div>
            <BootstrapTable keyField='userId' data={ this.props.enquiryInspectorMatches } columns={ columns } striped condensed bordered={false}
            noDataIndication="No matches found" selectRow={selectRow} store={ {selected : selectedUserIds } }/>
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