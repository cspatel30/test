import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './Carousel.scss';

export default () => <div className="Carousel">
  <Carousel
    showThumbs={false}
    showArrows={false}
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
      <p className="legend">
        Legend
    </p>
    </div>
  </Carousel>
  <center>
    <br />
    <br />
    <br />
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