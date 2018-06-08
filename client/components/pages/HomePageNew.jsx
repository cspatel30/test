// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';

import HomeHeader from '../homePage/Header';
import HomeFooter from '../homePage/Footer';

export default class HomePageNew extends Component {

  render() {
    console.log('hello..');
	  return (
      <div>
        <HomeHeader />
        <HomeFooter />
        <div style={{ background: 'blue', height: '100vh' }}>temp</div>
      </div> 
    );
  }
}

// export default HomePageNew;