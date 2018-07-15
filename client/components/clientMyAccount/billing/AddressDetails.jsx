import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { setEdit, saveChanges, cancelChanges } from "../../reducers/billing";
import AddressEdit from "./AddressEdit";

class AddressDetails extends React.Component {
  state = {
    isEdit: false
  }

  onSubmit(values) {
    console.log("inside addresss edit form " ,values);
    this.setEdit(false);
    this.props.updateUserProfile(values);
  }

  setEdit(value) {
    this.setState({ isEdit: value });
  }

  render() {
    console.log("this.props ", this.props);
    return (
      <div className="container informationText">
          <div className="row mt-5 mb-2">
            <div className="col-9">
              <span className="subHeadlineText">Address</span>
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

        <div className="row">
          {this.state.isEdit ? (
            <AddressEdit
              onSubmit={this.onSubmit.bind(this)}
              userProfile={this.props.userProfile}
              cancelEdit={() => {this.setEdit(false)}}
            />
          ) : (
              <div className="col-9">
                <div className="row">
                  <label className="col-sm-2 addressLabel">Building</label>
                  <div className="col-sm-10 informationText">{this.props.userProfile.building}</div>
                </div>
                <div className="row">
                  <label className="col-sm-2 addressLabel">Street</label>
                  <div className="col-sm-10 informationText">{this.props.userProfile.street}</div>
                </div>
                <div className="row">
                  <label className="col-sm-2 addressLabel">City</label>
                  <div className="col-sm-10 informationText">{this.props.userProfile.city}</div>
                </div>
                <div className="row">
                  <label className="col-sm-2 addressLabel">Country</label>
                  <div className="col-sm-10 informationText">{this.props.userProfile.countryCode}</div>
                </div>
                <div className="row">
                  <label className="col-sm-2 addressLabel">Postal Code</label>
                  <div className="col-sm-10 informationText">{this.props.userProfile.postal_code}</div>
                </div>
                <div className="row">
                  <label className="col-sm-2 addressLabel">Email Id</label>
                  <div className="col-sm-10 informationText">{this.props.userProfile.email}</div>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}


// function mapStateToProps(state) {
//   console.log("state  ", state);
//   return {
//     user: state.billing.user,
//     address: state.billing.address,
//     isEdit: state.billing.isEdit
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ saveChanges, cancelChanges, setEdit }, dispatch);
// }

export default AddressDetails;
