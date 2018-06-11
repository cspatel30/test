import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { setEdit, saveChanges, cancelChanges } from "../../reducers/user";
import ProfileEdit from "./ProfileEdit";
import Info from 'material-ui/svg-icons/action/info-outline';
import Person from 'material-ui/svg-icons/social/person-outline';
import Phone from 'material-ui/svg-icons/communication/phone';
import Email from 'material-ui/svg-icons/communication/email';
import Language from 'material-ui/svg-icons/action/language';
import ContactPhone from 'material-ui/svg-icons/communication/contact-phone';
import ArrowUpword from 'material-ui/svg-icons/navigation/arrow-upward';

class Profile extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }
  
  onSubmit(values) {
    this.setEdit(false);
    this.props.updateUserProfile(values);
    alert("User updated successfully");
  }

  saveChanges() {

  }

  cancelChanges() {
    this.setState({isEdit: false});
  }

  setEdit(value) {
    this.setState({isEdit: value});
  }

  render() {
    const { userProfile } = this.props;

    return (
      <div className="container myAccountHeadline" id="profile">
        <div>
        <span><Info /><span className="headlineText">General Details</span></span>
          <hr className="hrStyle" />
          <div className="row mt-5 mb-2">
            <div className="col-9">
            <span className="subHeadlineText">Maersk Singapore Pte Ltd</span>
            </div>
            {!this.state.isEdit && (
                <span>
                  <button
                    className="btn btn-outline-danger float-right"
                    type="button"
                    onClick={() => this.setEdit(true)}
                  >
                    UPDATE
              </button>
                </span>
              )}
          </div>
        </div>

        <div className="row  align-items-center mt-3 mb-3" >
          <div className="col-sm-3">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFaIoe9xs9hdhFwLCd9VL7YS52oh62yy_Gvb6r6JouZKSCAeDJNA" className="companyImage" />
          </div>
          {this.state.isEdit ? (
            <div className="col-9">
              <ProfileEdit
                userProfile={userProfile}
                onSubmit={(values) => this.onSubmit(values)}
                cancelEdit={() => {this.setEdit(false)}}
              />
            </div>
          ) : (
              <div className="offset-1 col-6">
                <div className="row form-group ">
                  Customer Id: {userProfile.id}
                </div>
                <div className="row form-group">
                  <Person style={{color: 'lightblue'}}/>: {userProfile.name}
                </div>
                <div className="row form-group ">
                  <Phone style={{color: 'lightblue'}}/>: {userProfile.phone}
                </div>
                <div className="row form-group ">
                   <span style={{color: 'lightblue', fontSize: 18}}>@</span> : {userProfile.email}
                </div>
                <div className="row form-group ">
                  <ContactPhone style={{color: 'lightblue'}}/>: {userProfile.work_phone}
                </div>
                <div className="row form-group ">
                  <Language style={{color: 'lightblue'}}/>: {userProfile.company}
                </div>
              </div>
            )}
        </div>
        <div className="float-right" ><a href="#"><ArrowUpword /></a></div>
        <div className="shadowDivider" id="billing" />
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     user: state.user.user,
//     isEdit: state.user.isEdit
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ saveChanges, cancelChanges, setEdit }, dispatch);
// }

export default Profile;
