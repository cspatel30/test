import React, { Component } from "react";

class AppHeader extends Component {
  render() {
    console.log("props in header" ,this.props);
    const {hash } = this.props.location;
    return (
      <div style={{textAlign: 'center', background: 'url(../../resources/static/images/banner.png)'}}>
        <span className="clientAccountText">Client Account</span>
        <ul className="nav nav-tabs justify-content-center accountHeader">
          <li className="nav-item">
            <a className={hash=== '' ? "nav-link active" : 'nav-link'} href="#">PROFILE</a>
          </li>
          <li className="nav-item">
            <a className={hash=== '#billing' ? "nav-link active" : 'nav-link'} href="#billing">BILLING DETAILS</a>
          </li>
          <li className="nav-item">
            <a className={hash=== '#setting' ? "nav-link active" : 'nav-link'} href="#setting">SETTINGS</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default AppHeader;
