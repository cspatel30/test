import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './Carousel.scss';

export default () => <div className="Carousel">
  <div className="imageSlider">
    <Carousel
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      axis="vertical">
      <div>
        <img src="/public/img/banner.png" />
      </div>
      <div>
        <img src="/public/img/banner.png" />
      </div>
      <div>
        <img src="/public/img/banner.png" />
      </div>
      <div>
        <img src="/public/img/banner.png" />
      </div>
      <div>
        <img src="/public/img/banner.png" />
      </div>
    </Carousel>
    <div className="topBanner-content">
      <h1>Find and Hire Expert Ship Inspectors</h1>
      <h4>Industry&apos;s First Maritime Freelancer Portal</h4>
      <div className="topBanner-content-actions">
        <button>FIND INSPECTOR</button>
        <button>GET QUOTATION</button>
      </div>
    </div>
  </div>
  <center>
    <h1 className="mb-2">Shipinspectors.com</h1>
    <br />
    <br />
  </center>
  <div className="row about">
    <div className="col-md-6">
      <img src="/public/img/headerLogo.jpg" />
    </div>
    <div className="col-md-6 content">
      <h3>Your Global Partners for Ship Inspection</h3>
      <b>We are Maritime Industry Experts coming from strong background of Ship Technical Management. </b>
      <br />
      <br />
      <p>
        We bring extensive industry knowledge and experience than enable us to offer you a high quality
        independent Marine Technical Consulting service gloabally with fast turn around and decisive online
        reporting.Our value for money analysis, advice, recommendations, cost saving strategies and string monitoring
        and due dilligence on condition of your shipping assets minimze your financial and operational risks to unlock your
        potential for long term business growth.
      </p>
      <br />
      <br />
      <button>EXPLORE MORE&nbsp;&nbsp;&nbsp;<i className="fa fa-long-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>