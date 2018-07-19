// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import update from 'react-addons-update';
import DatePicker from 'react-datepicker';
import moment from 'moment';

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
  	console.log('name of docs...', event.target.name);
  	this.props.handleFileUpload(this.props.inspectorProfile.userId, 'sinotechmarineassets', event.target.name, event.target.files[0]);
  }

  handleInspectorInputChange(event) {
  	event.persist();
    this.setState((state) => { state.inspectorProfile[event.target.name] = event.target.value });
	}
	
  updateDOB(value, field) {
	this.setState((state) => { state.inspectorProfile[field] = value });
	}
	
	addRecord(arrName) {
		// education   employment  inspectorId userId
		const { userProfile, inspectorProfile } = this.props;
		const eduObj = {country: '', courseName: '', endDate: '', startDate: '', institution: '', level: '', inspectorId: inspectorProfile.id, userId: userProfile.id};
		const empObj = {city: '', companyName: '', country: '', department: '', endDate: '', startDate: '', jobTitle: '', shipType: '', inspectorId: inspectorProfile.id, userId: userProfile.id};
		const newArr = arrName === 'education' ? [eduObj, ...this.state.inspectorProfile[arrName]] : [empObj, ...this.state.inspectorProfile[arrName]];
		this.setState((state) => { state.inspectorProfile[arrName] = newArr });
	}
	deleteRecord(arrName, id) {
		this.props.deleteRecord(arrName, id);
		// delete obj from arrName
	}

  onChange(arrName, index, field, value) {
	this.setState((state) => { state.inspectorProfile[arrName][index][field] = value });  
	// this.setState({ ...this.state, inspectorProfile: { [arrName]: update(this.state.inspectorProfile[arrName], { [index]: { [field]: { $set: value } } }) }  });
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
          <div className="page d-flex flex-column">
          	<div className="error">{this.props.error}</div>
          	<h1>Edit Profile</h1>
						<div className="d-flex">
							<div className="col-6">
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
											<select style={{padding: '6px', width: 70, border: '1px solid #ccc'}} name="countryCode" value={this.state.inspectorProfile.countryCode}  onChange={this.handleInspectorInputChange}>
																{this.renderSelectBox(this.props.countries, 'code', 'phoneCode')}
											</select>
											<input className="ml-1" style={{width: 150}} type="text" name="phone" value={this.state.inspectorProfile.phone} onChange={this.handleInspectorInputChange}/>
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
									
							{/* <div className="edit-line">
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
							</div> */}

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
										<label>Covered Regions :</label> 
										<div className="value">
											<VirtualizedSelect labelKey='name' multi={true} onChange={(selectedValue) => this.setState((state) => { state.inspectorProfile.coveredAreasKeys = selectedValue; })}
												options={this.props.regionCodes} searchable={true} simpleValue value={this.state.inspectorProfile.coveredAreasKeys} valueKey='id'/>
										</div>
										<div className="clear"></div>
									</div>
									<div className="edit-line">
										<label>Career Summary:</label>
										<div className="value">
											<textArea style={{width: '90%', border: '1px solid #ccc', minHeight: 120}} name="background" value={this.state.inspectorProfile.background} onChange={this.handleInspectorInputChange}/>
										</div>
										<div className="clear"></div>
									</div>
								</div>
								</Paper>
							</div>

								<div className="leftHalf">  	
									<Paper className="inspector-profile-section" zDepth={1}>
										<h3>Skill Details</h3>
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
										<VirtualizedSelect labelKey='name' multi={true} onChange={(selectedValue) => this.setState((state) => { state.inspectorProfile.skillsKeys = selectedValue; })}
									options={this.props.inspectorSkills} searchable={true} simpleValue value={this.state.inspectorProfile.skillsKeys} valueKey='id'/>
										</div>
										<div className="clear"></div>
									</div>
									</Paper>
								</div>

								<div className="rightHalf">  	
									<Paper className="inspector-profile-section" zDepth={1}>
										<h3>Education and Professional Qualifications</h3>
										<div className="text-right mb-2"><button type="button" className="btn btn-primary" onClick={() => this.addRecord('education')}>Add New</button></div>
									{
										(this.state.inspectorProfile.education || []).map((o, key) => { 
											console.log('level........', key, o.level);
											return (
											<div className="p-3 mb-3" style={{border: '1px solid gray'}} key={key}>
												<div className="text-right"><button type="button" className="btn btn-danger" onClick={() => this.deleteRecord('education', o.id)}>Delete</button></div>
												<div className="edit-line">
														<label>Level:</label> 
												<div className="value"><div className="selectField">
												<select name="level" value={o.level}  onChange={(e) => this.onChange('education', key, 'level', e.target.value)}>
													{this.renderSelectBox(this.props.inspectorLevel, 'code', 'name')}
												</select>
												</div></div>
													</div>
											<div className="edit-line">
														<label>Course Name:</label>
												<div className="value"><div className="selectField"> 
												<select name="courseName" value={o.courseName} onChange={(e) => this.onChange('education', key, 'courseName', e.target.value)}>
													{this.renderSelectBox(this.props.inspectorQualifications, 'code', 'name')}
												</select>
												</div></div>
													</div>
											<div className="edit-line">
												<label>Institution/University:</label>
												<div className="value">
													<input type="text" name="institution" value={o.institution} onChange={(e) => this.onChange('education', key, 'institution', e.target.value)} />
												</div>
											</div>
											<div className="edit-line">
														<label>Country:</label>
												<div className="value"><div className="selectField"> 
												<select name="country" value={o.country}  onChange={(e) => this.onChange('education', key, 'country', e.target.value)}>
													{this.renderSelectBox(this.props.countries, 'code', 'name')}
												</select>
												</div></div>
													</div>
											<div className="edit-line">
												<label className="mr-3">Start Date:</label>
												<DatePicker
													selected={moment(o.startDate).isValid() ? moment(o.startDate) : undefined}
													dateFormat="DD/MM/YYYY" placeholderText="Start Date"
													onChange={v => this.onChange('education', key, 'startDate', v.toDate())}
												/>
											</div>
											<div className="edit-line">
												<label className="mr-3">End Date:</label>
												<DatePicker
												selected={moment(o.endDate).isValid() ? moment(o.endDate) : undefined}
												dateFormat="DD/MM/YYYY" placeholderText="End Date"
												onChange={v => this.onChange('education', key, 'endDate', v.toDate())}
												/>
											</div>
											</div>
										)})
									}
									</Paper>
								</div>
							</div>
							<div className="col-6">
								<div className="leftHalf">
									<Paper className="inspector-profile-section" zDepth={1}>
										<h3>Personal</h3>
										
										<div className="edit-line"><label>Name as per Passport:</label><div className="value"><input type="text" name="passportName" value={this.state.inspectorProfile.passportName} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>
													<div className="edit-line"><label>Passport Number:</label><div className="value"><input type="text" name="passportNumber" value={this.state.inspectorProfile.passportNumber} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>
										<div className="edit-line">
											<label className="mr-3">Date Of Birth:</label>
											<DatePicker
											selected={moment(this.state.inspectorProfile.dob).isValid() ? moment(this.state.inspectorProfile.dob) : undefined}
											dateFormat="DD/MM/YYYY" placeholderText="End Date"
											onChange={v => this.updateDOB(v.toDate(), 'dob')}
											/>
										</div>
													<div className="edit-line"><label>Nationality:</label><div className="value"><input type="text" name="nationality" value={this.state.inspectorProfile.nationality} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>
										<div className="edit-line"><label>Residence Address: </label><div className="value"><input type="text" name="residenceAddress" value={this.state.inspectorProfile.residenceAddress} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>	
										<div className="edit-line">
											<label>Nearest SeaPort:</label>
											<div className="value"> 
												<VirtualizedSelect labelKey='name' multi={false} onChange={(selectedValue) => this.setState((state) => { state.inspectorProfile.seaport = selectedValue[0]; })}
												options={this.props.ports} searchable={true} simpleValue value={this.state.inspectorProfile.seaport} valueKey='id'/>
																</div>
																<div className="clear"></div>
												</div>
										<div className="edit-line"><label>Nearest Airport: </label><div className="value"><input type="text" name="nearestAirport" value={this.state.inspectorProfile.nearestAirport} onChange={this.handleInspectorInputChange}/></div><div className="clear"></div></div>

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
													<label>Medical Insurance:</label>
													<div className="value">
														<input type="file" value="" name="inspectordocs/medicalinsurance" onChange={this.handleFileUploadInputChange} />
														{this.renderDocumentStatus(this.state.inspectorProfile.medicalInsuranceDoc)}
													</div>
													<div className="clear"></div>
												</div>
												<div className="edit-line">
													<label>Medical Fitness Certificate ILO:</label>
													<div className="value">
														<input type="file" value="" name="inspectordocs/medicalfitnesscert" onChange={this.handleFileUploadInputChange} />
														{this.renderDocumentStatus(this.state.inspectorProfile.medicalFitnessDoc)}
													</div>
													<div className="clear"></div>
												</div>
												<div className="edit-line">
													<label>SeaMan Book Document:</label>
													<div className="value">
														<input type="file" value="" name="inspectordocs/seamanbook" onChange={this.handleFileUploadInputChange} />
														{this.renderDocumentStatus(this.state.inspectorProfile.seamanBookDoc)}
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
													<label>Qualification Cert(competency license):</label>
													<div className="value">
														<input type="file" value="" name="inspectordocs/qualification" onChange={this.handleFileUploadInputChange} />
														{this.renderDocumentStatus(this.state.inspectorProfile.qualificationDoc)}
													</div>
													<div className="clear"></div>
												</div>
												
												{/* <div className="edit-line">
													<label>Shore Service Certificate:</label>
													<div className="value">
														<input type="file" value="" name="inspectordocs/shoreservicecert" onChange={this.handleFileUploadInputChange} />
														{this.renderDocumentStatus(this.state.inspectorProfile.shoreServiceCert)}
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
												</div> */}
											</Paper>
											</div>

											<div className="rightHalf">  	
												<Paper className="inspector-profile-section" zDepth={1}>
													<h3>Employment History</h3>
													<div className="text-right mb-2"><button type="button" className="btn btn-primary" onClick={() => this.addRecord('employment')}>Add New</button></div>
												{
													(this.state.inspectorProfile.employment || []).map((o, key) => (
														<div className="p-3 mb-3" style={{border: '1px solid gray'}} key={key}>
															<div className="text-right"><button type="button" className="btn btn-danger" onClick={() => this.deleteRecord('employment', o.id)}>delete</button></div>
															<div className="edit-line">
																	<label>Position:</label>
															<div className="value"><div className="selectField">
															<select name="jobTitle" value={o.jobTitle} onChange={(e) => this.onChange('employment', key, 'jobTitle', e.target.value)}>
																{this.renderSelectBox(this.props.inspectorPositions, 'code', 'name')}
															</select>
															</div></div>
																</div>
														<div className="edit-line">
																	<label>Company Name:</label>
															<div className="value"> 
																<input type="text" name="companyName" value={o.companyName} onChange={(e) => this.onChange('employment', key, 'companyName', e.target.value)} />
															</div>
														</div>
														<div className="edit-line">
															<label>Ship Type:</label>
															<div className="value">
																<input type="text" name="shipType" value={o.shipType} onChange={(e) => this.onChange('employment', key, 'shipType', e.target.value)} />
															</div>
														</div>
														<div className="edit-line">
															<label>Department:</label>
															<div className="value">
																<input type="text" name="department" value={o.department} onChange={(e) => this.onChange('employment', key, 'department', e.target.value)} />
															</div>
														</div>
														<div className="edit-line">
															<label>City:</label>
															<div className="value">
																<input type="text" name="city" value={o.city} onChange={(e) => this.onChange('employment', key, 'city', e.target.value)}/>
															</div>
														</div>
														<div className="edit-line">
																	<label>Country:</label>
															<div className="value"><div className="selectField"> 
															<select name="country" value={o.country}  onChange={(e) => this.onChange('employment', key, 'country', e.target.value)}>
																{this.renderSelectBox(this.props.countries, 'code', 'name')}
															</select>
															</div></div>
																</div>
														<div className="edit-line">
															<label className="mr-3">Start Date:</label>
															<DatePicker
															selected={moment(o.startDate).isValid() ? moment(o.startDate) : undefined}
															dateFormat="DD/MM/YYYY" placeholderText="Start Date"
															onChange={v => this.onChange('employment', key, 'startDate', v.toDate())}
															/>
														</div>
														<div className="edit-line">
															<label className="mr-3">End Date:</label>
															<DatePicker
															selected={moment(o.endDate).isValid() ? moment(o.endDate) : undefined}
															dateFormat="DD/MM/YYYY" placeholderText="End Date"
															onChange={v => this.onChange('employment', key, 'endDate', v.toDate())}
															/>
														</div>
														</div>
													))
												}
												</Paper>
										</div>
							</div>
						</div>

          	<div className="clear"></div>
          	<div className="actions-bar">
	  			<RaisedButton style={{float: 'right', marginLeft: 10}} label="Save" primary={true}  onClick={this.saveProfile}/>
	  			<RaisedButton style={{float: 'right'}} label="Cancel" primary={true}  onClick={() => this.props.cancelEdit()}/>
	  			<div className="clear"></div>
	  		</div>
          </div>
      	);
	} else {
		return (<div className="page">Fetching Profile</div>);
	}
  }
}