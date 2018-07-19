import React from 'react';
import './HowItWorks.scss';

export default () => <div className="HowItWorks">
  <center className="HowItWorks-header">
    <br />
    <br />
    <br />
    <h1 className="mb-2">How Shipinspectors.com Works</h1>
    <p>We have expert ship inspectors representing every function of Maritime Operations.</p>
    <br />
    <br />
    <div className="row process">
      <div className="col-md-3">
        <div className="process-card">
          <img src="/public/img/companyLogo.png" />
          <h3 className="title">FIND</h3>
          <br />
          <div className="description">Recommenders can see your bounty contract and recommend many
          suitable carrer opportunities to you and mentor you and support you to</div>
          <a className="action">READ MORE</a>
        </div>
      </div>
      <div className="col-md-3">
        <div className="process-card">
          <img src="/public/img/companyLogo.png" />
          <h3 className="title">APPOINT</h3>
          <br />
          <div className="description">Recommenders can see your bounty contract and recommend many
          suitable carrer opportunities to you and mentor you and support you to</div>
          <a className="action">READ MORE</a>
        </div>
      </div>
      <div className="col-md-3">
        <div className="process-card">
          <img src="/public/img/companyLogo.png" />
          <h3 className="title">REPORT</h3><br />
          <div className="description">Recommenders can see your bounty contract and recommend many
          suitable carrer opportunities to you and mentor you and support you to</div>
          <a className="action">READ MORE</a>
        </div>
      </div>
      <div className="col-md-3">
        <div className="process-card">
          <img src="/public/img/companyLogo.png" />
          <h3 className="title">PAY</h3><br />
          <div className="description">Recommenders can see your bounty contract and recommend many
          suitable carrer opportunities to you and mentor you and support you to</div>
          <a className="action">READ MORE</a>
        </div>
      </div>
    </div>
  </center>
</div>