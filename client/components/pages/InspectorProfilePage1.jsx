import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { Rating } from 'material-ui-rating';
import { ReadMore } from 'react-read-more';
import {blue500} from 'material-ui/styles/colors';
import { isArray } from 'util';

import EditInspectorProfile from './sections/EditInspectorProfile.jsx';
import DisplayRating from '../statelessCompo/DisplayRating.jsx';

class InspectorProfilePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        edit: false,
        displayRating: false,
        activeOrderFeedback: null,
      };
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

    onViewFeedback(order) {
      this.props.getFeebackByOrderId(order.orderId);
      this.setState({displayRating: true, activeOrderFeedback: order });
    }

    editProfile() {
      this.setState((state) => { state.edit = true});
    }
  
    cancelEdit() {
      console.log('cancel edit.......');
      this.setState((state) => { state.edit = false});	
    }

    renderProfilePicAvatar(inspector) {
      if(inspector.profilePic && inspector.profilePic.trim() !== "") {
        return (<Avatar src={"https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/profileimages/"+inspector.profilePic} size={150}/>);
      } else {
          return (<Avatar size={150}>{inspector.name.substring(0,1)}</Avatar>);
      }
    }
    renderChips(data) {
      let dataArray = [];
      if (isArray(data)) {
        dataArray = data;
      } else {
        dataArray = data ? data.split(",") : null;
      }
      if (dataArray && dataArray.length > 0) return dataArray.map((i, key) => (
        <Chip className="mb-2 mr-2" key={key} style={{float: 'left'}} labelColor='#fff' backgroundColor={blue500}>{i}</Chip>
      ))
    }
    renderMyProfile(inspe, user) {
      return (
        <div>
          <h3 className="py-3 px-5" style={{ color: '#fff', background: '#1475af' }}>MY PROFILE</h3>
          <div className="d-flex mx-3 my-2">
            <div className="col-3">
              <div>{this.renderProfilePicAvatar(inspe)}</div>
              <div className="d-flex flex-column mt-2" style={{ fontSize: '14px'}}>
                <b style={{ color: '#000000'}}>{inspe.name}</b>
                <div style={{ color: '#28a428' }}>Profile Verified</div>
                <div className="profile-rating"><Rating readOnly={true} value={inspe.rating} max={5} /></div>
              </div>
            </div>
            <div className="col-6 d-flex flex-column pt-3 render-profile-middle-row">
              <span>{inspe.positionDisplayName}</span>
              <span>{`${inspe.city}, ${inspe.country.name}`}</span>
              <span>Approved inspection Type:</span>
              <div>{this.renderChips(inspe.approvedInspectionTypes)}</div>
              <span>approved for vessel Type:</span>
              <div>{this.renderChips(inspe.approvedVesselTypes)}</div>
              <span>Years of experience: {`${inspe.experienceYears} years`}</span>
              <span>Total jobs done: {inspe.totalInspections}</span>
              <span>Last active: 00/00/00</span>
            </div>
            <div className="col-3 d-flex">
              <span className="mb-2">Areas Covered</span>
              <div>Display map</div>
            </div>
          </div>
          <div className="mt-4 mx-5 mb-3" style={{ textAlign:'center', fontStyle: 'italic', color: '#000', fontSize: '14px' }}>
            <ReadMore lines={3} text="Read more">{inspe.background || ''}</ReadMore>
          </div>
        </div>
      )
    }

    renderSkills(inspe, user) {
      return (
        <div>
          <h3 className="py-3 px-5 m-0" style={{ color: '#fff', background: '#1475af' }}>Skills</h3>
          <div className="d-flex p-4">
            {this.renderChips(inspe.skillsKeys)}
          </div>
        </div>
      )
    }

    renderWorkHistory(inspe, user) {
      const { displayRating, activeOrderFeedback } = this.state;
      const arr = ['Job Title', 'Vessel Name', 'IMO Number', 'Type of Vessel', 'Client\'s Rating', 'Client\'s Name'];
      const title = arr.map((i, key) => (
        <div style={{flex: 1, fontWeight: 'bold', fontSize: '18px'}} key={key}>{i}</div>
      ));
      const itemStyle = { flex: 1, fontSize: '16px', color: '#555' };
      return (
        <div>
          <h3 className="py-3 px-5" style={{ color: '#fff', background: '#1475af' }}>Work History and Client's Feedback</h3>
          <div className="px-5 py-4">
          {
              (inspe.workAndFeedback || []).map((o, key) => (
                <div key={key} style={{ borderBottom: '1px solid #d8e1e8' }}>
                  <div className="d-flex pl-5 pr-2 py-2 mb-2" style={{ color: '#000'}}>{title}</div>
                  <div className="d-flex pl-5 pr-2 mb-4">
                    <span style={itemStyle}>{o.jobTitle}</span>
                    <span style={itemStyle}>{o.vesselName}</span>
                    <span style={itemStyle}>{o.imoNumber}</span>
                    <span style={itemStyle}>{o.vesselType}</span>
                    <span style={itemStyle}>{o.clientRating}<small className="ml-3 p-2" onClick={() => this.onViewFeedback(o)} style={{ background: '#1475af', color: '#fff', borderRadius: '3px', cursor: 'pointer' }}>view</small></span>
                    <span style={itemStyle}>{o.clientName}</span>
                  </div>
                  <div className="mb-4"><strong className="p-1" style={{color: '#fff', background: blue500}}>Client Feedback: </strong>........</div>
                </div>
              ))
          }
          </div>
          { displayRating && <DisplayRating display={displayRating} order={activeOrderFeedback} feedback={this.props.feedbackbyOrderId} />}
        </div>
      )
    }
    renderEmploymentHistory(inspe, user) {
      const arr = ['Position', 'Company Name', 'Ship Type', 'Department', 'City', 'Country'];
      const title = arr.map((i, key) => (
        <div style={{flex: 1, fontWeight: 'bold', fontSize: '18px'}} key={key}>{i}</div>
      ));
      const itemStyle = { flex: 1, fontSize: '16px', color: '#555' };
      return (
        <div>
          <h3 className="py-3 px-5" style={{ color: '#fff', background: '#1475af' }}>Employment History</h3>
          <div className="px-5 py-4">
          {
              (inspe.employment || []).map((o, key) => (
                <div key={key} style={{ borderBottom: '1px solid #d8e1e8' }}>
                  <div className="d-flex pl-5 pr-2 py-2 mb-2" style={{ color: '#000'}}>{title}</div>
                  <div className="d-flex pl-5 pr-2 mb-4">
                    <span className="d-flex flex-column" style={itemStyle}>
                      <span className="mb-1">{o.jobTitle}</span>
                      <span style={{fontSize:'12px'}}>{moment(o.startDate).format('MMM YYYY')} - {moment(o.endDate).format('MMM YYYY')}</span>
                    </span>
                    <span style={itemStyle}>{o.companyName}</span>
                    <span style={itemStyle}>{o.shipType}</span>
                    <span style={itemStyle}>{o.department}</span>
                    <span style={itemStyle}>{o.city}</span>
                    <span style={itemStyle}>{o.country}</span>
                  </div>
                </div>
              ))
          }
          </div>
        </div>
      )
    }

    renderEducaAndQuali(inspe, user) {
      const arr = ['Level', 'Cource Name', 'Institution/University', 'Country'];
      const title = arr.map((i, key) => (
        <div style={{flex: 1, fontWeight: 'bold', fontSize: '18px'}} key={key}>{i}</div>
      ));
      const itemStyle = { flex: 1, fontSize: '16px', color: '#555' };
      return (
        <div>
          <h3 className="py-3 px-5" style={{ color: '#fff', background: '#1475af' }}>Education and Professional Qualifications</h3>
          <div className="px-5 pb-4 pt-2">
            <h3 className="mb-3">Highest Qualifications</h3>
          {
              (inspe.education || []).map((o, key) => (
                <div key={key} style={{ borderBottom: '1px solid #d8e1e8' }}>
                  <div className="d-flex pl-5 pr-2 py-2 mb-2" style={{ color: '#000'}}>{title}</div>
                  <div className="d-flex pl-5 pr-2 mb-4">
                    <span style={itemStyle}>{o.level}</span>
                    <span style={itemStyle}>{o.courseName}</span>
                    <span style={itemStyle}>{o.institution}</span>
                    <span style={itemStyle}>{o.country}</span>
                  </div>
                </div>
              ))
          }
          </div>
        </div>
      )
    }

    renderPersonalDetails(inspe, user) {
      const { ports } = this.props;
      const port = ports.find((x) => x.id[0] == inspe.seaport && x);
      const arr = ['Document Name', 'Expiry', 'File Attachment'];
      const title = arr.map((i, key) => (
        <div style={{flex: 1, fontWeight: 'bold'}} key={key}>{i}</div>
      ));
      return (
        <div>
          <h3 className="py-3 px-5" style={{ color: '#fff', background: '#1475af' }}>Personal Details</h3>
          <div className="d-flex p-4">
            <div className="" style={{flex: 3}}>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Name as per Passport : </b>{inspe.passportName}</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Nationality : </b>{inspe.nationality}</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Passport Number : </b>{inspe.passportNumber}</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Date of Birth : </b>{moment(inspe.dob).format('MMM Do YYYY')}</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Country of Residence : </b>{inspe.country.name}</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Nearest Sea Port : </b>{port.name}</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Nearest Airport : </b>{inspe.nearestAirport}</div>
            </div>
            <div className="" style={{flex: 3}}>
              <div className="d-flex flex-column justify-content-center align-items-center" style={{ color: '#fff', background: blue500, width: '80%', margin: '0 auto' }}>
                <b className="my-1">Areas Covered</b>
                <b className="my-1">(Countries Name)</b>
              </div>
              <div className="d-flex flex-column" style={{ width: '80%', margin: '0 auto' }}>
              {
                (inspe.coveredAreas || []).map((x, key) => (<div className="py-1 px-3 areas-covered" key={key} style={{  }}>{x}</div>))
              }
              </div>
            </div>
            <div className="" style={{flex: 4}}>
              <div className="d-flex flex-column" style={{ width: '80%', float: 'right' }}>
                <div className="d-flex py-1 px-3" style={{background: blue500, color: '#fff'}}>{title}</div>
                <div>Data</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    render() {
      const { userProfile, inspectorProfile, error } = this.props;
      console.log('........data.......', inspectorProfile, userProfile);
      if(this.state.edit) {
        return(<EditInspectorProfile userProfile={this.props.userProfile} inspectorProfile={this.props.inspectorProfile}
          handleFileUpload={this.props.handleFileUpload} ports={this.props.ports} countries={this.props.countries} 
          vesselTypes={this.props.vesselTypes} inspectorPositions={this.props.inspectorPositions} 
          inspectorQualifications={this.props.inspectorQualifications} regionCodes={this.props.regionCodes}
          inspectionTypes={this.props.inspectionTypes} inspectorSkills={this.props.inspectorSkills}
          inspectorTitles={this.props.inspectorTitles} region={this.props.region} inspectorLevel={this.props.inspectorLevel}
          saveProfile={this.props.saveProfile} deleteRecord={this.props.deleteRecord}
          cancelEdit={this.cancelEdit.bind(this)} profileUpdateSuccess={this.props.profileUpdateSuccess}/>)
      }
      
      if (userProfile && inspectorProfile) {
        return (
          <div className="inspector-profile-page mt-3 mb-5">
            <div className="error">{error}</div>
            <div className="inspector-profile-data-wrap">
              <div style={{position:'absolute', left: '-50px'}}><IconButton iconStyle={{width: 30, height: 30}} onClick={() => {this.editProfile()}}><EditIcon color={blue500} /></IconButton></div>
              {this.renderMyProfile(inspectorProfile, userProfile)}
              {this.renderSkills(inspectorProfile, userProfile)}
              {this.renderWorkHistory(inspectorProfile, userProfile)}
              {this.renderEmploymentHistory(inspectorProfile, userProfile)}
              {this.renderEducaAndQuali(inspectorProfile, userProfile)}
              {this.renderPersonalDetails(inspectorProfile, userProfile)}
            </div>
          </div>
        )
      }
      else {
		return (<div className="page">Fetching Profile</div>);
	  }
    }
}

export default InspectorProfilePage;