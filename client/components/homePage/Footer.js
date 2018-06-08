import _ from 'lodash';
import React from 'react';
import './Footer.scss';

const Footer = () => {

  const renderQuickLinks = (side) => {
    const leftArr = ['HOME', 'ABOUT US', 'INSPECTORS', 'ONLINE REPORTS', 'CASE STUDIES', 'CONTACT US'];
    const rightArr = ['CLIENT REGISTRATION', 'INSPECTOR REGISTRATION', 'POST INSPECTION ENQUIRY', 'INDUSTRY NEWS'];
    return (
      <div className={`col-6 p-0 d-flex flex-column`}>
        {
          (side === 'left' ? leftArr : rightArr).map((x, key) => (
            <span className="item mb-3">{x}</span>
          ))
        }
      </div>
    );
  }
  return (
    <div className="footer-wrapper d-flex py-5">
      <div className="col-4 left-section">
        <div className="d-flex flex-column justify-content-between left-sec-data">
          <div>
            <img src="../../resources/footerLogo.jpg" alt="#logo"/>
            <div className="powered-by d-flex flex-column">
              <span>Powered by</span>
              <span><b>SINOTECH</b> MARINE</span>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="d-flex flex-column copyright-text">
            <span className="py-1">COPYRIGHT <i className="fa fa-copyright" /> 2018 SINOTECHMARINE.COM &</span>
            <span className="py-1">SHIPINSPECTORS.COM ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
      <div className="col-4 d-flex flex-column px-5 center-section">
        <b className="mb-3">QUICK LINKS</b>
        <div className="d-flex center-data-wrap">
          {renderQuickLinks('left')}
          {renderQuickLinks('right')}
        </div>
      </div>
      <div className="col-4 right-section">3</div>
    </div>
  );
}
export default Footer;

