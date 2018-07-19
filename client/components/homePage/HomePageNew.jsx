import React, { Component } from 'react';
import InspectionQuote from './InspectionQuote';
import Carousel from './Carousel';
import HowItWorks from './HowItWorks';
import WhyShipInspector from './WhyShipInspector';
import Inspection from './Inspection';
import './HomePage.scss'

export default class HomePageNew extends Component {

  render() {
    return (
      <div className="HomePage">
        <Carousel />
        <br />
        <div className="divider" />
        <br />
        <HowItWorks />
        <br />
        <br />
        <WhyShipInspector />
        <br />
        <div className="divider" />
        <br />
        <Inspection />
        <InspectionQuote />
      </div>
    );
  }
}
