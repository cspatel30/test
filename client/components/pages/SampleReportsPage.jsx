// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

export default class SampleReportsPage extends Component {

  constructor(props) {
  	super(props);
  	
  	this.state = {
  		reports: [
  			{id: 1, inspectionTypeDisplayName: 'Pre-Purchase Inspection', rating: '66%', vesselTypeDisplayName: 'LPG Tanker', port: {name: '16N Red Sea', regionName: 'Asia', countryName: 'Saudi Arabia'}, inspectionDate: '2018-02-28', inspector: { name: 'Sinotech Marine'}},
  			{id: 2, inspectionTypeDisplayName: 'Condition Assessment Inspection', rating: '80%', vesselTypeDisplayName: 'Bulk Carrier', port: {name: 'SINGAPORE', regionName: 'Asia', countryName: 'SINGAPORE'}, inspectionDate: '2018-03-01', inspector: { name: 'Sinotech Marine'}},
  			{id: 3, inspectionTypeDisplayName: 'Pre-Purchase Inspection', rating: '85%', vesselTypeDisplayName: 'Oil Tanker', port: {name: 'SINGAPORE', regionName: 'Asia', countryName: 'SINGAPORE'}, inspectionDate: '2018-03-03', inspector: { name: 'Sinotech Marine'}}
  		]
  	}
  }

  renderReportSection(report) {
  	return(
  		<div key={"report_"+report.id}>
  			<div className="report-box">
  				<div className="report-box-section">
  					<div className="report-inspection-type-box">
  						<div className="text"><div style={{fontSize: 24, color: '#ffffff', fontWeight: 800, marginTop: 50}}>{report.inspectionTypeDisplayName}</div></div>
  						<div className="img-box"><img width="100%" height="150" src="https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/sample-report-1.jpeg"/></div>
  						<div className="clear"></div>
  					</div>
  					<div className="report-rating">
  						<div className="section">
  							<div className="left">Rating</div>
  							<div className="right">{report.rating}</div>
  							<div className="clear"></div>
  						</div>
  					</div>
  				</div>
  				<div className="report-box-section">
  					<h2>{report.vesselTypeDisplayName}</h2>
  					<div className="report-details-row">
  						<div className="label">Inspected At:</div>
  						<div className="value">{report.port.name}, {report.port.countryName}</div>
  						<div className="clear"></div>
  					</div>
  					<div className="report-details-row">
  						<div className="label">Inspection Date:</div>
  						<div className="value">{report.inspectionDate}</div>
  						<div className="clear"></div>
  					</div>
  					<div className="report-details-row">
  						<div className="label">Inspected By:</div>
  						<div className="value">{report.inspector.name}</div>
  						<div className="clear"></div>
  					</div>
  					<div className="report-details-row" style={{textAlign: 'center'}}>
  						<a href={"https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/Report_"+report.id+".pdf"} target="_blank"><button>View Sample Report</button></a>
  					</div>
  				</div>
  			</div>
  		</div>
  	);
  }

  renderSampleReports() {
  	var elements = [];
  	this.state.reports.map((report) => { elements.push(this.renderReportSection(report)); });
  	return elements;
  }

  render() {
	return (
          <div className="page">
          	<h1>Sample Reports</h1>
          	{this.renderSampleReports()}
          </div>
      );
  }
}