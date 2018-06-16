import React from "react";
// import { setEdit, saveChanges, cancelChanges } from "../../reducers/user";
import ProfileEdit from "./ProfileEdit";
import Info from 'material-ui/svg-icons/action/info-outline';
import Person from 'material-ui/svg-icons/social/person-outline';
import Phone from 'material-ui/svg-icons/communication/phone';
import Email from 'material-ui/svg-icons/communication/email';
import Language from 'material-ui/svg-icons/action/language';
import ContactPhone from 'material-ui/svg-icons/communication/contact-phone';
import ArrowUpword from 'material-ui/svg-icons/navigation/arrow-upward';
import Edit from 'material-ui/svg-icons/image/edit';

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
        <span><Info /><span className="headlineText">General Details</span></span>
          <hr className="hrStyle" />
          <div className="row mt-5 mb-5">
            <div className="col-9">
            <span className="subHeadlineText">Maersk Singapore Pte Ltd</span>
            </div>
            {!this.state.isEdit && (
                <span className="col-3">
                  <button
                    className="btn btn-outline-danger float-right pl-4 pr-4"
                    type="button"
                    onClick={() => this.setEdit(true)}
                  >
                    UPDATE
              </button>
                </span>
              )}
          </div>
        <div className="row align-items-center mt-3 mb-3 ml-1" >
          <div className="col-3 companyLogoView">
            <img src="../../../resources/static/images/companyLogo.png" className="companyImage" />
            {this.state.isEdit && <Edit className="imageEdit" onClick={() => {alert("Upload New company Image")}} />}
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
              <div className="offset-1 col-8 mb-4">
                <div className="row form-group informationText">
                  <span>Customer ID:<span className="padding">{userProfile.id}</span></span>
                </div>
                <div className="row form-group informationText">
                  <Person style={{color: '#0c6092'}}/><span className="padding">{userProfile.name}</span>
                </div>
                <div className="row form-group informationText">
                  <Phone style={{color: '#0c6092'}}/><span className="padding">{userProfile.phone}</span>
                </div>
                <div className="row form-group informationText">
                   <Email style={{color: '#0c6092'}}/><span className="padding">{userProfile.email}</span>
                </div>
                <div className="row form-group informationText">
                  <ContactPhone style={{color: '#0c6092'}}/><span className="padding">{userProfile.work_phone}</span>
                </div>
                <div className="row form-group informationText">
                  <Language style={{color: '#0c6092'}}/><span className="padding">{userProfile.company}</span>
                </div>
              </div>
            )}
        </div>
        <div className="float-right upwordIcon" id="billing" ><a href="#"><ArrowUpword style={{color: '#1b99c4'}} /></a></div>
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
