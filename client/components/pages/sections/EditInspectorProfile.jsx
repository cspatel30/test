// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import VirtualizedSelect from 'react-virtualized-select';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Paper from 'material-ui/Paper';
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
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';

import {green500, red500, blue500, yellow600, orange600, fullWhite} from 'material-ui/styles/colors';

import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

const styles = {
  listItem: {
	selected: {
		backgroundColor: '#ccc'
	},
	unselected: {
		backgroundColor: '#fff'
	},
	icon : {
		marginTop: 5
	}
  }
}

export default class EditInspectorProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
    	inspectorProfile: this.props.inspectorProfile
    }

    this.state.inspectorProfile.countryCode = this.props.inspectorProfile.country.code;

    this.clickProfilePicIcon = this.clickProfilePicIcon.bind(this);
    this.handleFileUploadInputChange = this.handleFileUploadInputChange.bind(this);
    this.handleInspectorInputChange = this.handleInspectorInputChange.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
  }

  componentWillReceiveProps(props) {
  	if(props.profileUpdateSuccess) {
  		this.props.cancelEdit();
  	} 
  	this.setState((state) => { state.inspectorProfile = props.inspectorProfile});
  }

  clickProfilePicIcon() {
  	this.refs.profilePicUpload.click();
  }

  handleFileUploadInputChange(event) {
  	console.log(event.target.name);
  	this.props.handleFileUpload(this.props.inspectorProfile.userId, 'sinotechmarineassets', event.target.name, event.target.files[0]);
  }

  handleInspectorInputChange(event) {
  	event.persist();
    this.setState((state) => { state.inspectorProfile[event.target.name] = event.target.value });
  }
 
  renderSelectBox = (datasource, keyField='id', textField='name') => {
	  var options = [];
	  options.push(<option key="" value="">Select</option>);
	  datasource.map( (ds) => {
	    options.push(<option key={ds[keyField]} value={ds[keyField]}>{ds[textField]}</option>);
	  });
	  return  options;             
  }

  saveProfile() {
  	//validate inputs
  	console.log(this.state);	
  	this.props.saveProfile(this.state.inspectorProfile);
  }


  renderDocumentStatus(documentLink) {
  	if(documentLink && documentLink.trim() != "") {
  		return(<Done color={green500} size={10} style={styles.icon}/>);
  	} else {
  		return(<Clear color={red500} size={10} style={styles.icon}/>);
  	}
  }

  renderProfilePicAvatar(inspector) {
    if(inspector.profilePic && inspector.profilePic.trim() !== "") {
      return (<Avatar style={{float: 'left'}} src={"https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/profileimages/"+inspector.profilePic} size={75}/>);
    } else {
      return (<Avatar style={{float: 'left'}} size={75}>{inspector.name.substring(0,1)}</Avatar>);
    }
  }

  render() {

  	if(this.state.inspectorProfile) {
		return (
          <div className="page">
          	<div className="error">{this.props.error}</div>
          	<h1>Edit Profile</h1>
          	<div className="leftHalf">
	          	<Paper className="inspector-profile-section" zDepth={1}>
	          		<div className="profile-image">
	          			<div style={{margin: '0 auto', width: 100}}>
		          			<input ref="profilePicUpload" type="file"
			                   accept=".png,.jpg,.jpeg"
			                   style={{display: 'none'}}
			                   value=""
			                   name="profileimages"
			                   onChange={this.handleFileUploadInputChange} />
		          			{this.renderProfilePicAvatar(this.state.inspectorProfile)}
		          			<AddAPhoto style={{float: 'left', cursor: 'pointer'}}  onClick={this.clickProfilePicIcon}/>
	          				<div className="clear"></div>
	          			</div>
	          		</div>
		      		<div className="profile-details">
		      			<div className="edit-line"><label>Name:</label><div className="value"><input type="text" name="name" value={this.state.inspectorProfile.name} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>
		      			<div className="edit-line"><label>Email:</label><div className="value"><input type="text" name="email" value={this.state.inspectorProfile.email} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>
		      			<div className="edit-line"><label>Company:</label><div className="value"><input type="text" name="company" value={this.state.inspectorProfile.company} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>
		      			<div className="edit-line">
		      				<label>Phone:</label>
		      				<div className="value">
		      					<select style={{width: 50, border: '1px solid #ccc'}} name="countryCode" value={this.state.inspectorProfile.countryCode}  onChange={this.handleInspectorInputChange}>
		                          {this.renderSelectBox(this.props.countries, 'code', 'phoneCode')}
		                        </select>
		      					<input style={{width: 300}} type="text" name="phone" value={this.state.inspectorProfile.phone} onChange={this.handleInspectorInputChange}/>
		      				</div>
		      				<div className="clear"></div>
		      			</div>
		      			<div className="edit-line">
		      				<label>Position:</label>
			      			<div className="value"><div className="selectField"> 
		                        <select name="position" value={this.state.inspectorProfile.position}  onChange={this.handleInspectorInputChange}>
		                          {this.renderSelectBox(this.props.inspectorPositions)}
		                        </select>
	                      	</div></div>
	                      	<div className="clear"></div>
	                    </div>
	                    <div className="edit-line">
		      				<label>Qualification:</label>
			      			<div className="value">
			      				<div className="selectField"> 
			                        <select name="qualification" value={this.state.inspectorProfile.qualification}  onChange={this.handleInspectorInputChange}>
			                          {this.renderSelectBox(this.props.inspectorQualifications)}
			                        </select>
	                      		</div>
	                      	</div>
	                      	<div className="clear"></div>
	                    </div>
		      			
		      			<div className="edit-line">
		      				<label>Nearest SeaPort:</label>
		      				<div className="value"> 
		                        <VirtualizedSelect labelKey='name' multi={false} onChange={(selectedValue) => this.setState((state) => { state.inspectorProfile.seaport = selectedValue[0]; })}
          							options={this.props.ports} searchable={true} simpleValue value={this.state.inspectorProfile.seaport} valueKey='id'/>
	                      	</div>
	                      	<div className="clear"></div>
		      			</div>

		      			<div className="edit-line"><label>City:</label><div className="value"><input type="text" name="city" value={this.state.inspectorProfile.city} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>
		      			<div className="edit-line">
		      				<label>Country:</label>
		      				<div className="value"><div className="selectField"> 
		                        <select name="countryCode" value={this.state.inspectorProfile.countryCode}  onChange={this.handleInspectorInputChange}>
		                          {this.renderSelectBox(this.props.countries, 'code', 'name')}
		                        </select>
	                      	</div></div>
	                      	<div className="clear"></div>
		      			</div>
		      			
		      			<div className="edit-line">
		      				<label>Background:</label>
		      				<div className="value">
		      					<textArea style={{width: '90%', border: '1px solid #ccc', minHeight: 120}} name="background" value={this.state.inspectorProfile.background} onChange={this.handleInspectorInputChange}/>
		      				</div>
		      				<div className="clear"></div>
		      			</div>
		      		</div>
	          	</Paper>
	        </div>
	        <div className="rightHalf">  	
	          	<Paper className="inspector-profile-section" zDepth={1}>
	          		<h3>Work Experience and Skill Details</h3>

	          		<div className="edit-line">
	      				<label>No Of Years:</label>
	      				<div className="value">
	      					<input type="text" name="experienceYears" value={this.state.inspectorProfile.experienceYears} onChange={this.handleInspectorInputChange}/>
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>Total Inspections:</label>
	      				<div className="value">
	      					<input type="text" name="totalInspections" value={this.state.inspectorProfile.totalInspections} onChange={this.handleInspectorInputChange}/>
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>Highest Rank Onboard:</label>
	      				<div className="value">
	      					<input type="text" name="highestRankOnboard" value={this.state.inspectorProfile.highestRankOnboard} onChange={this.handleInspectorInputChange}/>
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>Highest Rank Ashore:</label>
	      				<div className="value">
	      					<input type="text" name="highestRankAshore" value={this.state.inspectorProfile.highestRankAshore} onChange={this.handleInspectorInputChange}/>
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	          		
	      			<div className="edit-line">
	      				<label>Skills :</label> 
	      				<div className="value">
	      					<input type="text" name="skills" value={this.state.inspectorProfile.skills} onChange={this.handleInspectorInputChange}/>
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			
	      			<div className="edit-line">
	      				<label>Covered Regions :</label> 
	      				<div className="value">
	      					<VirtualizedSelect labelKey='name' multi={true} onChange={(selectedValue) => this.setState((state) => { state.inspectorProfile.coveredAreasKeys = selectedValue; })}
          						options={this.props.regionCodes} searchable={true} simpleValue value={this.state.inspectorProfile.coveredAreasKeys} valueKey='id'/>
          				</div>
          				<div className="clear"></div>
	      			</div>
	      			
	      			<div className="edit-line">
	      				<label>Approved Vessel Types :</label>
	      				<div className="value">
	      					<VirtualizedSelect labelKey='name' multi={true} onChange={(selectedValue) => this.setState((state) => { state.inspectorProfile.approvedVesselTypesKeys = selectedValue; })}
          						options={this.props.vesselTypes} searchable={true} simpleValue value={this.state.inspectorProfile.approvedVesselTypesKeys} valueKey='id'/>
	      				</div>
	      				<div className="clear"></div>
	      			</div>

	      			<div className="edit-line">
	      				<label>Approved Inspection Types :</label>
	      				<div className="value">
	      					<VirtualizedSelect labelKey='name' multi={true} onChange={(selectedValue) => this.setState((state) => { state.inspectorProfile.approvedInspectionTypesKeys = selectedValue; })}
          						options={this.props.inspectionTypes} searchable={true} simpleValue value={this.state.inspectorProfile.approvedInspectionTypesKeys} valueKey='id'/>
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	          	</Paper>
	        </div>
	        <div className="clear"></div>
	        <div className="leftHalf">
	          	<Paper className="inspector-profile-section" zDepth={1}>
	          		<h3>Personal</h3>
	          		
	          		<div className="edit-line"><label>Passport:</label><div className="value"><input type="text" name="passport" value={this.state.inspectorProfile.passport} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>
	          		<div className="edit-line"><label>Date Of Birth:</label><div className="value"><input type="text" name="dob" value={this.state.inspectorProfile.dob} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>
	          		<div className="edit-line"><label>Nationality:</label><div className="value"><input type="text" name="nationality" value={this.state.inspectorProfile.nationality} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>

	          		<div className="edit-line">
	          			<label>Valid Medical Insurance:</label>
	          			<div className="value">
	          				<div className="selectField"> 
		                        <select name="validMedicalInsurance" value={this.state.inspectorProfile.validMedicalInsurance}  onChange={this.handleInspectorInputChange}>
		                          <option value="0">No</option>
		                          <option value="1">Yes</option>
		                        </select>
	                      	</div>
	          			</div>
	          			<div className="clear"></div>
	          		</div>
	          		<div className="edit-line">
	          			<label>Valid Professional Indemnity:</label>
	          			<div className="value">
	          				<div className="selectField"> 
		                        <select name="validIndemnityInsurance" value={this.state.inspectorProfile.validIndemnityInsurance}  onChange={this.handleInspectorInputChange}>
		                          <option value="0">No</option>
		                          <option value="1">Yes</option>
		                        </select>
	                      	</div>
	          			</div>
	          			<div className="clear"></div>
	          		</div>
	          		<div className="edit-line">
	          			<label>Valid Employment Medical Certificate:</label>
	          			<div className="value">
	          				<div className="selectField"> 
		                        <select name="validEmploymentMedicalCert" value={this.state.inspectorProfile.validEmploymentMedicalCert}  onChange={this.handleInspectorInputChange}>
		                          <option value="0">No</option>
		                          <option value="1">Yes</option>
		                        </select>
	                      	</div>
	          			</div>
	          			<div className="clear"></div>
	          		</div>
	      		</Paper>
	      	</div>
	      	<div className="rightHalf">
	      		<Paper className="inspector-profile-section"  zDepth={1}>
	      			<h3>Documents</h3>
	      			<div className="edit-line">
	      				<label>Passport:</label>
	      				<div className="value">
	      					<input type="file" value="" name="inspectordocs/passport" onChange={this.handleFileUploadInputChange} />
	      					{this.renderDocumentStatus(this.state.inspectorProfile.passportDoc)}
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>Qualification Cert:</label>
	      				<div className="value">
	      					<input type="file" value="" name="inspectordocs/qualification" onChange={this.handleFileUploadInputChange} />
	      					{this.renderDocumentStatus(this.state.inspectorProfile.qualificationDoc)}
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>SeaMan Book:</label>
	      				<div className="value">
	      					<input type="file" value="" name="inspectordocs/seamanbook" onChange={this.handleFileUploadInputChange} />
	      					{this.renderDocumentStatus(this.state.inspectorProfile.seamanBookDoc)}
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>Shore Service Certificate:</label>
	      				<div className="value">
	      					<input type="file" value="" name="inspectordocs/shoreservicecert" onChange={this.handleFileUploadInputChange} />
	      					{this.renderDocumentStatus(this.state.inspectorProfile.shoreServiceCert)}
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>Medical Fitness Certificate:</label>
	      				<div className="value">
	      					<input type="file" value="" name="inspectordocs/medicalfitnesscert" onChange={this.handleFileUploadInputChange} />
	      					{this.renderDocumentStatus(this.state.inspectorProfile.medicalFitnessDoc)}
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>Medical Insurance:</label>
	      				<div className="value">
	      					<input type="file" value="" name="inspectordocs/medicalinsurance" onChange={this.handleFileUploadInputChange} />
	      					{this.renderDocumentStatus(this.state.inspectorProfile.medicalInsuranceDoc)}
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>Professional Indemnity Certificate:</label>
	      				<div className="value">
	      					<input type="file" value="" name="inspectordocs/profindemnity" onChange={this.handleFileUploadInputChange} />
	      					{this.renderDocumentStatus(this.state.inspectorProfile.profIndemnityCert)}
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>CV:</label>
	      				<div className="value">
	      					<input type="file" value="" name="inspectordocs/cv" onChange={this.handleFileUploadInputChange} />
	      					{this.renderDocumentStatus(this.state.inspectorProfile.cvDoc)}
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>Identity Proof:</label>
	      				<div className="value">
	      					<input type="file" value="" name="inspectordocs/identityproof" onChange={this.handleFileUploadInputChange} />
	      					{this.renderDocumentStatus(this.state.inspectorProfile.identityProofDoc)}
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      			<div className="edit-line">
	      				<label>Identity Proof Doc Type:</label>
	      				<div className="value">
	      					<input type="text" value={this.state.inspectorProfile.idProofDocType} name="idProofDocType" onChange={this.handleInspectorInputChange} />
	      				</div>
	      				<div className="clear"></div>
	      			</div>
	      		</Paper>
          	</div>
          	<div className="clear"></div>
          	<div className="actions-bar">
	  			<RaisedButton style={{float: 'right', marginLeft: 10}} label="Save" primary={true}  onClick={this.saveProfile}/>
	  			<RaisedButton style={{float: 'right'}} label="Cancel" primary={true}  onClick={this.props.cancelEdit}/>
	  			<div className="clear"></div>
	  		</div>
          </div>
      	);
	} else {
		return (<div className="page">Fetching Profile</div>);
	}
  }
}