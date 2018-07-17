import React, { Component } from "react";
import './client.scss';
class ClientHeader extends Component {
  render() {
    console.log("props in header" ,this.props);
    const {hash } = this.props.location;
    return (
      <div className="client-wrap" style={{textAlign: 'center', background: 'url(/public/img/banner.png)'}}>
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

export default ClientHeader;
