// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import HomeCaraousel from '../home/HomeCaraousel.jsx';
import HomeExtraSection from '../home/HomeExtraSection.jsx';
import HomeContactUs from '../home/HomeContactUs.jsx';
import HomeFooter from '../home/HomeFooter.jsx';

export default class HomePage extends Component {

  render() {
	return (
          <div>
          	<HomeCaraousel/>
          	<div className="clear"></div>
            <HomeExtraSection/>
            <HomeContactUs/>
            <HomeFooter/>
          </div> 
      );
  }
}