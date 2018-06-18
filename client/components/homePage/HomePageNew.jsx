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
        <div style={{ background: 'blue', height: '100vh' }}>temp</div>
      </div> 
    );
  }
}

// export default HomePageNew;