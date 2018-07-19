import React, { Component } from 'react';
import ReactStars from 'react-stars';
import MapWithASearchBox from './MapPage.jsx';
import Cookie from 'js-cookie';
import './newProfile.scss';

export default class UserProfileDetailsPage extends Component {
  constructor(props){
      super(props);
      this.state={
          userProfile:''
      }
  }
  componentWillReceiveProps(props){
    if(props){
        this.setState({
            userProfile:props.profileDetails
        },()=>{
            Cookie.set("inspector_name",this.state.userProfile.firstName)
        })
    }  
    //console.log("userprofiledetailspage"+JSON.stringify(props.profileDetails))
  }

  render() {
     const {userProfile}=this.state
     //console.log("user profile"+JSON.stringify(userProfile))
	 return (
        <div className="row pt-15 bg-white">
            <div className="col-md-1 ml-5">
                <i className="fa fa-pencil-square-o fa-1x p-top-edit"></i>
                <font className="p-top-edit ml-2 fs-11">Edit Profile</font>
            </div>
            <div className="col-md-2 tc">
                <img src="https://i1.wp.com/askgerald.co.za/wp-content/uploads/2014/08/Mark-profile-pic-colour-round.png?fit=453%2C449" className="p-top-image" />
                <div style={{textAlign: "center"}}>
                    <h3 className="p-top-name fw-500 fs-19 mt-0 mb-0">{userProfile.firstName}</h3>
                    <div>
                        <div style={{display: "flex",alignItems: "center", "justify-content": " center"}}>
                            <ReactStars count={5} size={21} color2={ '#ffd700'} />
                            <span className="p-top-edit ml-5">({userProfile.rating})</span>
                        </div>
                        <span className="p-top-verify"><i className="fa fa-check-circle verify" ></i> Profile Verified</span>
                    </div>
                </div>
            </div>
            <div className="col-md-5">
                <h3 className="p-top-name2 fw-500 fs-19 mb-0">{userProfile.title}</h3>
                <p className="p-top-name mb-0 fs-15">({userProfile.qualification})</p>
                <p className="address fw-normal" style={{color: "#a4a4a4"}}><i className="fa space-20 fa-map-marker p-top-mapIcon"></i> {userProfile.city},{userProfile.country}</p>
                <div className="row mt-5 alignItems mb-0">
                    <div className="col-md-3 pl-0">Approved for :</div>
                    <div className="tag d-flex">
                        <div className="tagBgOutLine">
                        </div>
                        <div className="p-top-name bgTagOutLine">{userProfile.approvedInspectionTypes}</div>
                    </div>
                </div>
                <div className="row mt-5 alignItems">
                    <div className="col-md-3 pl-0">Vessel Types :</div>
                    <div className="tag d-flex">
                        <div className="tagBgOutLine">
                        </div>
                        <div className="p-top-name bgTagOutLine">{userProfile.approvedVesselTypes} </div>
                        &nbsp;&nbsp;
                        <div className="tagBgOutLine">
                        </div>
                        <div className="p-top-name bgTagOutLine">Car Carrie Ship</div>
                    </div>
                </div>
                <div className="row mt-4 mb-18">
                    <div className="col-md-4 pl-0">Years Experience :</div>
                    <div className="col-md-8 ml-15">{userProfile.experienceYears}
                    </div>
                </div>
                <div className="mt-15">
                   {userProfile.profileSummary}<span className="fs-10">...more</span>
                </div>
            </div>
            <div className="col-md-3 mt-0">
                <h4 className="fs-15">Map</h4>
                <MapWithASearchBox/>
            </div>
        </div>
    );
  }
}