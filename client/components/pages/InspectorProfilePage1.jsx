import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {green500, red500, blue500, yellow600, orange600, fullWhite} from 'material-ui/styles/colors';
import { isArray } from 'util';

class InspectorProfilePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        edit: false
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

    editProfile() {
      this.setState((state) => { state.edit = true});
    }
  
    cancelEdit() {
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
                <div>Profile Verified</div>
                <div>Display rating here: {inspe.rating}</div>
              </div>
            </div>
            <div className="col-6 d-flex flex-column pt-3 render-profile-middle-row">
              <span>{inspe.highestRankOnboard}</span>
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
          <p className="mt-4 mx-5" style={{ textAlign:'center', fontStyle: 'italic', color: '#000', fontSize: '14px' }}>{inspe.background || ''}</p>
        </div>
      )
    }

    renderSkills(inspe, user) {
      return (
        <div>
          <h3 className="py-3 px-5 m-0" style={{ color: '#fff', background: '#1475af' }}>Skills</h3>
          <div className="d-flex p-4">
            {this.renderChips(inspe.skills)}
          </div>
        </div>
      )
    }

    renderWorkHistory(inspe, user) {
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
              (inspe.employment || []).map((o, key) => (
                <div key={key} style={{ borderBottom: '1px solid #d8e1e8' }}>
                  <div className="d-flex pl-5 pr-2 py-2 mb-2" style={{ color: '#000'}}>{title}</div>
                  <div className="d-flex pl-5 pr-2 mb-4">
                    <span style={itemStyle}>{o.jobTitle}</span>
                    <span style={itemStyle}>{'vName'}</span>
                    <span style={itemStyle}>{'IMO No.'}</span>
                    <span style={itemStyle}>{o.shipType}</span>
                    <span style={itemStyle}>{'rating'}</span>
                    <span style={itemStyle}>{'client name'}</span>
                  </div>
                  <div className="mb-4"><strong className="p-1" style={{color: '#fff', background: blue500}}>Client Feedback: </strong>........</div>
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
      const arr = ['Document Name', 'Expiry', 'File Attachment'];
      const title = arr.map((i, key) => (
        <div style={{flex: 1, fontWeight: 'bold'}} key={key}>{i}</div>
      ));
      return (
        <div>
          <h3 className="py-3 px-5" style={{ color: '#fff', background: '#1475af' }}>Personal Details</h3>
          <div className="d-flex p-4">
            <div className="" style={{flex: 3}}>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Name as per Passport : </b>xyz</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Nationality : </b>{inspe.nationality}</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Passport Number : </b>{inspe.passport}</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Date of Birth : </b>{inspe.dob.toLocaleString()}</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Country of Residence : </b>{inspe.country.name}</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Nearest Sea Port : </b>{`port name`}</div>
              <div className="mb-3"><b className="p-1" style={{color: '#000', fontSize: '15px'}}>Nearest Airport : </b>{`airport name`}</div>
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
      console.log('........data.......', inspectorProfile);
      if (userProfile && inspectorProfile) {
        return (
          <div className="inspector-profile-page mt-3 mb-5">
            <div className="error">{error}</div>
            <div className="inspector-profile-data-wrap">
              {this.renderMyProfile(inspectorProfile, userProfile)}
              {this.renderSkills(inspectorProfile, userProfile)}
              {this.renderWorkHistory(inspectorProfile, userProfile)}
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