import React from 'react';
export default () => <div className="ContactUs">
  <div className="row">
    <div className="col-md-6">
      <h1>Contact Us</h1>
      <div className="divider" />
      <div className="row">
        <div className="col-sm-1 col-2 ContactUs-marker">
          <i className="fa fa-phone fa-2x" />
        </div>
        <div className="col-sm-11 col-10 ContactUs-details">
          <p><span>+852-52456106</span></p>
          <p><span>+44-2074425848</span></p>
          <p><span>+1-6465830707</span></p>
          <p><span>+65-31581460</span></p>
          <p><span>+30-2103007223</span></p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-1 col-2 ContactUs-marker">
          <i className="fa fa-map-marker fa-2x" />
        </div>
        <div className="col-sm-11 col-10 ContactUs-details">
          <p><span>1234, Sed Smart space-2, Units 1205-1208, Level 12, Cyberport-2,
            100 Cyberport Road Hong Kong</span></p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-1 col-2 ContactUs-marker">
          <i className="fa fa-envelope fa-2x" />
        </div>
        <div className="col-sm-11 col-10 ContactUs-details">
          <p><span>enquiries@shipinspectors.com</span></p>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <h1>Your Global Partners 24/7</h1>
      <div className="divider" />
      <img src="/public/img/user_img.png" />
    </div>
  </div>
</div>