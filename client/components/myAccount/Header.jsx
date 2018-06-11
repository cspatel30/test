import React, { Component } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppBar from "material-ui/AppBar";

class AppHeader extends Component {

  render() {
    return (
      <div className="container">
        <ul className="nav nav-tabs justify-content-center accountHeader">
          <li className="nav-item">
            <a className="nav-link active" href="#">PROFILE</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#billing">BILLING DETAILS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#setting">SETTINGS</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default AppHeader;
