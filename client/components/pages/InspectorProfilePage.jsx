// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { NavLink } from 'react-router-dom';

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


import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import EditInspectorProfile from './sections/EditInspectorProfile.jsx';

const styles = {
  listItem: {
  	selected: {
  		backgroundColor: '#ccc'
  	},
  	unselected: {
  		backgroundColor: '#fff'
  	}
  },
	icon : {
		marginTop: 15
	},
	largeIcon: {
  	width: 30,
  	height: 30,
  },
  large: {
  	width: 40,
  	height: 40,
  	padding: 30,
	}
}

export default class InspectorProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
    	edit: false
    };

    this.editProfile = this.editProfile.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.renderDocumentStatus = this.renderDocumentStatus.bind(this);
  }

  componentWillMount() {
    if(this.props.userProfile) {
      this.props.getProfile();
    }
  }

  componentWillReceiveProps(props) {
  	if(!this.props.userProfile && props.userProfile) {
  		this.props.getProfile();
  	}
  }

  editProfile() {
  	this.setState((state) => { state.edit = true});
  }

  cancelEdit() {
  	this.setState((state) => { state.edit = false});	
  }
 
  renderChipsArray(dataArray, type) {
  	var elements = [];
  	if(dataArray && dataArray.length > 0) {
	  	dataArray.map((data) => { elements.push(<Chip style={{margin: 5, float: 'left'}} labelColor={fullWhite} backgroundColor={blue500} key={type+"_"+data}>{data.trim()}</Chip>); });
	}
  	return(<div>{elements}<div className="clear"></div></div>);
  }

  convertToIdNameMap(dataArray) {
  	var objectMap = {};
  	for(var i=0; i < dataArray.length; i++) {
  		objectMap[dataArray[i]['id']] = dataArray[i]['name'];
  	}
  	return objectMap;
  }

  renderChips(dataString, type) {
  	if(!dataString || dataString.trim() == "")
  		return null;

  	var keys = dataString.split(",");
  	var dataArray = [];
  	var objectMap = {};
  	switch(type) {
  		case 'vessel_type':
  			objectMap = this.convertToIdNameMap(this.props.vesselTypes);
  			break;
  		case 'inspection_type':
  			objectMap = this.convertToIdNameMap(this.props.inspectionTypes);
  			break;
  		case 'covered_area':
  			objectMap = this.convertToIdNameMap(this.props.regionCodes);	
  			break;
  		default:  		
  			dataArray = keys;
  	}

  	if(dataArray.length == 0)
  		keys.map((key) => {dataArray.push(objectMap[key.trim()]) });

  	return this.renderChipsArray(dataArray, type);
  	
  }

  renderBooleanStatus(value) {
  	if(value && value == 1) {
  		return(<Done color={green500} size={10} style={styles.icon}/>);
  	} else {
  		return(<Clear color={red500} size={10} style={styles.icon}/>);
  	}
  }

  renderDocumentStatus(docType, fileName) {
  	if(fileName && fileName.trim() != "") {
  		return(<span>
        <Done color={green500} size={10} style={styles.icon}/>
        <NavLink className="menu-link" key={"link_doc_"+docType} to={"/my/doc/"+docType+"/"+fileName} target="_blank">View Document</NavLink>
        </span>
      );
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
    console.log("Inspector page, new profile = ", this.props.inspectorProfile);
  	if(this.state.edit) {
  		return(<EditInspectorProfile userProfile={this.props.userProfile} inspectorProfile={this.props.inspectorProfile}
  			handleFileUpload={this.props.handleFileUpload} ports={this.props.ports} countries={this.props.countries} 
  			vesselTypes={this.props.vesselTypes} inspectorPositions={this.props.inspectorPositions} 
  			inspectorQualifications={this.props.inspectorQualifications} regionCodes={this.props.regionCodes}
  			inspectionTypes={this.props.inspectionTypes} saveProfile={this.props.saveProfile}
  			cancelEdit={this.cancelEdit} profileUpdateSuccess={this.props.profileUpdateSuccess}/>)
  	}

  	if(this.props.userProfile && this.props.inspectorProfile) {
		return (
          <div className="page">
          	<div className="error">{this.props.error}</div>
          	<div className="inspector-profile">
          		<div>
          			<IconButton iconStyle={styles.largeIcon} onClick={() => {this.editProfile()}}><EditIcon color={blue500} /></IconButton>
          			<div className="clear"></div>
          		</div>
	          	<Paper className="inspector-profile-section" zDepth={1}>
	          		<div className="profile-image">{this.renderProfilePicAvatar(this.props.inspectorProfile)}</div>
  		      		<div className="profile-details">
  		      			<h1>{this.props.userProfile.name}</h1>
  		      			<div className="detail-line"><CommunicationEmail color={blue500}/> {this.props.userProfile.email}</div>
  		      			<div className="detail-line">{this.props.inspectorProfile.positionDisplayName} {this.props.inspectorProfile.company ? " At "+this.props.inspectorProfile.company : ""}</div>
  		      			<div className="detail-line">{this.props.inspectorProfile.qualificationDisplayName}</div>
  		      			<div className="detail-line"><LocationOn color={blue500}/>{this.props.inspectorProfile.seaport}, {this.props.userProfile.city}, {this.props.userProfile.country.fullName}, {this.props.userProfile.country.continentName}</div>
  		      			<Divider/>
  		      			<p>
  		      				{this.props.inspectorProfile.background}
  		      			</p>
  		      		</div>
	          	</Paper>

	          	<Paper className="inspector-profile-section" zDepth={1}>
	          		<h3>Skill Details</h3>
	          		<div className="detail-line"><label>Position :</label> {this.props.inspectorProfile.positionDisplayName}</div>
	      			<div className="detail-line"><label>Qualification :</label> {this.props.inspectorProfile.qualificationDisplayName}</div>
	      			<div className="detail-line"><label>Skills :</label> {this.renderChips(this.props.inspectorProfile.skills, 'skills')}</div>
	      			<div className="detail-line">
	      				<label>Covered Regions :</label> 
	      				{this.renderChipsArray(this.props.inspectorProfile.coveredAreas, 'covered_area')}
	      			</div>
	      			<div className="detail-line">
	      				<label>Approved Vessel Types :</label>
	      				{this.renderChipsArray(this.props.inspectorProfile.approvedVesselTypes, 'vessel_type')}
	      			</div>
	      			<div className="detail-line">
	      				<label>Approved Inspection Types :</label>
	      				{this.renderChipsArray(this.props.inspectorProfile.approvedInspectionTypes, 'inspection_type')}
	      			</div>
	          	</Paper>

	          	<Paper className="inspector-profile-section" zDepth={1}>
	          		<h3>Work Experience</h3>
	          		<div className="detail-line"><label>No Of Years :</label> {this.props.inspectorProfile.experienceYears}</div>
	          		<div className="detail-line"><label>Total Inspections :</label> {this.props.inspectorProfile.totalInspections}</div>
	          		<div className="detail-line"><label>Highest Rank Onboard :</label> {this.props.inspectorProfile.highestRankOnboard}</div>
	      			<div className="detail-line"><label>Highest Rank Ashore :</label> {this.props.inspectorProfile.highestRankAshore}</div>
	          	</Paper>

	          	<Paper className="inspector-profile-section" zDepth={1}>
	          		<h3>Personal</h3>
	          		<div className="detail-line"><label><CommunicationEmail color={blue500} size={10}/></label> {this.props.userProfile.email}</div>
	          		<div className="detail-line"><label><CommunicationCall color={blue500} size={10}/></label> +{this.props.userProfile.country.phoneCode} - {this.props.userProfile.phone}</div>
          			<div className="detail-line"><label>Passport :</label> {this.props.inspectorProfile.passport}</div>
  	      			<div className="detail-line"><label>Date Of Birth :</label> {this.props.inspectorProfile.dob}</div>
  	      			<div className="detail-line"><label>Nationality :</label> {this.props.inspectorProfile.nationality}</div>
  	      			<div className="detail-line"><label>Valid Medical Insurance :</label> {this.renderBooleanStatus(this.props.inspectorProfile.validMedicalInsurance)}</div>
  	      			<div className="detail-line"><label>Valid Professional Indemnity :</label> {this.renderBooleanStatus(this.props.inspectorProfile.validIndemnityInsurance)}</div>
  	      			<div className="detail-line"><label>Valid Employment Medical Certificate :</label> {this.renderBooleanStatus(this.props.inspectorProfile.validEmploymentMedicalCert)}</div>
	      		</Paper>

	      		<Paper className="inspector-profile-section" zDepth={1}>
	          		<h3>Documents</h3>
          			<div className="detail-line"><label>Passport Document:</label>{this.renderDocumentStatus('passportDoc', this.props.inspectorProfile.passportDoc)}</div>
	          		<div className="detail-line"><label>SeaMan Book Document:</label>{this.renderDocumentStatus('seamanBookDoc', this.props.inspectorProfile.seamanBookDoc)}</div>
	          		<div className="detail-line"><label>Qualification Document:</label>{this.renderDocumentStatus('qualificationDoc', this.props.inspectorProfile.qualificationDoc)}</div>
	          		<div className="detail-line"><label>Shore Service Certificate:</label>{this.renderDocumentStatus('shoreServiceCert', this.props.inspectorProfile.shoreServiceCert)}</div>
	          		<div className="detail-line"><label>Medical Fitness Document:</label>{this.renderDocumentStatus('medicalFitnessDoc', this.props.inspectorProfile.medicalFitnessDoc)}</div>
	          		<div className="detail-line"><label>Medical Insurance Document:</label>{this.renderDocumentStatus('medicalInsuranceDoc', this.props.inspectorProfile.medicalInsuranceDoc)}</div>
	          		<div className="detail-line"><label>Professional Indemnity Certificate:</label>{this.renderDocumentStatus('profIndemnityCert', this.props.inspectorProfile.profIndemnityCert)}</div>
	          		<div className="detail-line"><label>CV Document:</label>{this.renderDocumentStatus('cvDoc', this.props.inspectorProfile.cvDoc)}</div>
                <div className="detail-line"><label>Identity Proof Document:</label>{this.renderDocumentStatus('identityProofDoc', this.props.inspectorProfile.identityProofDoc)}</div>
                <div className="detail-line"><label>Identity Proof Document Type:</label>{this.props.inspectorProfile.idProofDocType}</div>
	      		</Paper>

          	</div>
          	<div className="clear"></div>
          </div>
      	);
	} else {
		return (<div className="page">Fetching Profile</div>);
	}
  }
}