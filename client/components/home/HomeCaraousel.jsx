// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { NavLink } from 'react-router-dom';

var Carousel = require('react-responsive-carousel').Carousel;

const styles = {
  findInspectorButton: {
    position: 'absolute',
    top: 285,
    left: 78,
    zIndex: 999999,
    padding: 15,
    width: 192,
    background: 'none'
  },
  getQuoteButton: {
    position: 'absolute',
    top: 285,
    left: 296,
    zIndex: 999999,
    padding: 15,
    width: 192,
    background: 'none'
  }
}


export default class HomeCaraousel extends Component {

  render() {
	    return (
          <div className="home-carousel">
          	<Carousel showThumbs={false} showArrows={false} infiniteLoop={true} autoPlay={false} interval={2000} className="carousel-area">
                <div className="home-carousel-item">
                  <img src={"https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/Slider-1.jpg"} height="450" width="100%"/>
                  <NavLink to="/inspectors/"><button style={styles.findInspectorButton}></button></NavLink>
                  <NavLink to="/enquiry/"><button style={styles.getQuoteButton}></button></NavLink>
                </div>
                <img src={"https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/Slider-2.jpg"} height="450" width="100%"/>
                <img src={"https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/Slider-3.jpg"} height="450" width="100%"/>
                <img src={"https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/Slider-4.jpg"} height="450" width="100%"/>
                <img src={"https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/Slider-5.jpg"} height="450" width="100%"/>
            </Carousel>
          </div> 
      );
  }
}