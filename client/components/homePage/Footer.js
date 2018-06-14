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
      <div className="col-4 px-5 right-section d-flex flex-column">
        <b className="mb-3">CONNECT WITH US</b>
        <div className="mb-3"><i className="fa fa-twitter mr-2" /><span className="item-opa">FOLLOW US ON TWITTER</span></div>
        <div className="mb-5"><i className="fa fa-linkedin mr-2" /><span className="item-opa">JOIN US ON LINKEDIN</span></div>
        <span className="hr-right mb-5" />
        <b className="mb-4">PAY ONLINE</b>
        <div className="credit-card-img">
          <a href="http://www.credit-card-logos.com/"><img alt="Credit Card Logos" title="Credit Card Logos" src="http://www.credit-card-logos.com/images/multiple_credit-card-logos-1/credit_card_logos_17.gif" width="235" height="35" border="0" /></a>
        </div>
      </div>
    </div>
  );
}
export default Footer;

