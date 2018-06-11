import React, { Component } from "react";
import ChangePassword from './ChangePassword';
import Settings from 'material-ui/svg-icons/action/settings';
import ArrowUpword from 'material-ui/svg-icons/navigation/arrow-upward';

class Setting extends React.Component {
    onSubmit(values) {
        this.props.changeUserPassword(values);
        alert("Password updated successfully");
    }
    
    render() {
        return (
            <div className="container myAccountHeadline" id="setting">
            <span><Settings /><span className="headlineText">Account Settings</span></span>
            <hr className="hrStyle" />
            <div className="row">
            <div className="col-12" style={{color: 'blue', fontSize: 18, margin: '30px 0'}}>
            <span >@ <span className="ml-3">infor@maerskline.com</span></span>
            </div>
            <ChangePassword userProfile={this.props.userProfile} onSubmit={(values) => {this.onSubmit(values)}}/>
            </div>
            <div className="float-right" ><a href="#"><ArrowUpword /></a></div>
        </div>
        );
    }
}
export default Setting;