// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { NavLink } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Rating } from 'material-ui-rating';

import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import ActionInfo from 'material-ui/svg-icons/action/info';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import LocationOn from 'material-ui/svg-icons/communication/location-on';

import {green500, red500, blue500, yellow600, orange600, fullWhite} from 'material-ui/styles/colors';

import Chip from 'material-ui/Chip';

const styles = {
	unselected: {
		backgroundColor: '#fff'
	},
	icon : {
		marginTop: 15
	},
	largeIcon: {
		width: 60,
		height: 60,
	},
	large: {
		width: 120,
		height: 120,
		padding: 30,
	}
}

export default class InspectorPublicProfilePage extends Component {

  componentWillMount() {
  	this.props.getInspectorPublicProfile(parseInt(this.props.match.params.id));
  }

  renderChipsArray(dataArray, type) {
  	var elements = [];
  	if(dataArray && dataArray.length > 0) {
	  	dataArray.map((data) => { elements.push(<Chip style={{margin: 5, float: 'left'}} labelColor={fullWhite} backgroundColor={blue500} key={type+"_"+data}>{data.trim()}</Chip>); });
	}
  	return(<div>{elements}<div className="clear"></div></div>);
  }

  renderChips(dataString, type) {
  	if(!dataString || dataString.trim() == "")
  		return null;

  	return this.renderChipsArray(dataString.split(","), type);
  }

  renderBooleanStatus(value) {
  	if(value && value == 1) {
  		return(<Done color={green500} size={10} style={styles.icon}/>);
  	} else {
  		return(<Clear color={red500} size={10} style={styles.icon}/>);
  	}
  }

  renderProfilePicAvatar(inspector) {
    if(inspector.profilePic && inspector.profilePic.trim() !== "") {
      return (<Avatar src={"https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/profileimages/"+inspector.profilePic} size={75}/>);
    } else {
      return (<Avatar size={75}>{inspector.name.substring(0,1)}</Avatar>);
    }
  }

  render() {

  const { inspectorPublicProfile } = this.props;

  if(inspectorPublicProfile) {

	 return (
		
      <div className="page">
	  		<div className="profile-summary">
	  		  <Paper>	
  	  			<div className="profile-summary-image" style={{textAlign: 'center'}}>
  	  				{this.renderProfilePicAvatar(inspectorPublicProfile)}
  	  				<Divider style={{visibility: 'hidden', marginTop: 50}}/>
  	  				<Rating readOnly={true} value={inspectorPublicProfile.rating} max={5} />
  	  			</div>
	      		<div className="profile-summary-details">
	      			<h1>{inspectorPublicProfile.name} - ({inspectorPublicProfile.qualificationDisplayName})</h1>
	      			<div className="detail-line">{inspectorPublicProfile.positionDisplayName} {inspectorPublicProfile.company ? " At "+inspectorPublicProfile.company : ""}</div>
	      			<Divider/>
	      			<div className="detail-line"><label><CommunicationEmail color={blue500} size={10}/></label> {inspectorPublicProfile.email}</div>
		          <div className="detail-line"><label><CommunicationCall color={blue500} size={10}/></label> +{inspectorPublicProfile.country.phoneCode} - {inspectorPublicProfile.phone}</div>
	      			<div className="detail-line"><LocationOn color={blue500}/>{inspectorPublicProfile.seaport}, {inspectorPublicProfile.city}, {inspectorPublicProfile.country.fullName}, {inspectorPublicProfile.country.continentName}</div>
	      			<Divider/>
	      			<p>
	      				{inspectorPublicProfile.background}
	      			</p>
	      		</div>
	      		<div className="clear"></div>
	  		  </Paper>

      	  <Paper className="inspector-profile-section" zDepth={1}>
        		<h3>Skill Details</h3>
        		<div className="detail-line"><label>Position :</label> {inspectorPublicProfile.positionDisplayName}</div>
      			<div className="detail-line"><label>Qualification :</label> {inspectorPublicProfile.qualificationDisplayName}</div>
      			<div className="detail-line"><label>Skills :</label> {this.renderChips(inspectorPublicProfile.skills, 'skills')}</div>
      			<div className="detail-line">
      				<label>Covered Regions :</label> 
      				{this.renderChipsArray(inspectorPublicProfile.coveredAreas, 'covered_area')}
      			</div>
      			<div className="detail-line">
      				<label>Approved Vessel Types :</label>
      				{this.renderChipsArray(inspectorPublicProfile.approvedVesselTypes, 'vessel_type')}
      			</div>
      			<div className="detail-line">
      				<label>Approved Inspection Types :</label>
      				{this.renderChipsArray(inspectorPublicProfile.approvedInspectionTypes, 'inspection_type')}
      			</div>
        	</Paper>

        	<Paper className="inspector-profile-section" zDepth={1}>
        		<h3>Work Experience</h3>
        		<div className="detail-line"><label>No Of Years :</label> {inspectorPublicProfile.experienceYears}</div>
        		<div className="detail-line"><label>Total Inspections :</label> {inspectorPublicProfile.totalInspections}</div>
        		<div className="detail-line"><label>Highest Rank Onboard :</label> {inspectorPublicProfile.highestRankOnboard}</div>
    			  <div className="detail-line"><label>Highest Rank Ashore :</label> {inspectorPublicProfile.highestRankAshore}</div>
        	</Paper>

        	<Paper className="inspector-profile-section" zDepth={1}>
        		<h3>Personal</h3>
      			<div className="detail-line"><label>Passport :</label> {inspectorPublicProfile.passport}</div>
      			<div className="detail-line"><label>Date Of Birth :</label> {inspectorPublicProfile.dob}</div>
      			<div className="detail-line"><label>Nationality :</label> {inspectorPublicProfile.nationality}</div>
      			<div className="detail-line"><label>Valid Medical Insurance :</label> {this.renderBooleanStatus(inspectorPublicProfile.validMedicalInsurance)}</div>
      			<div className="detail-line"><label>Valid Professional Indemnity :</label> {this.renderBooleanStatus(inspectorPublicProfile.validIndemnityInsurance)}</div>
      			<div className="detail-line"><label>Valid Employment Medical Certificate :</label> {this.renderBooleanStatus(inspectorPublicProfile.validEmploymentMedicalCert)}</div>
    		  </Paper>
        </div>
      </div>
      );
    } else {
      return (<div className="page">
        <p> No matching profile found!!</p>
        </div>)
    }
  }
}