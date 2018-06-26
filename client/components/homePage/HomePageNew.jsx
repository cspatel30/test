// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';

import HomeHeader from './Header';
import HomeFooter from './Footer';
import InspectionQuote from './InspectionQuote';

export default class HomePageNew extends Component {

  render() {
    return (
      <div>
        <HomeHeader />
        <InspectionQuote />
        <HomeFooter />
      </div> 
    );
  }
}

// export default HomePageNew;