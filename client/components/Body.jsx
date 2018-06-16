import React, { Component } from 'react';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';

import Footer from './Footer.jsx';
import LoginContainer from '../containers/LoginContainer.js';
import RegisterContainer from '../containers/RegisterContainer.js';
import NewProfileContainer from '../containers/NewProfileContainer.js';
import InspectorDashboardContainer from '../containers/InspectorDashboardContainer.js';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

export default class Body extends Component {

  render() {
	return (
          <div className="main">
            <div className="content">
              <Route component={ScrollToTop}/>
              <Route exact path="/" component={NewProfileContainer}/>
              <Route exact path="/login/" component={LoginContainer} />
              <Route exact path="/newprofile/" component={NewProfileContainer} />
              <Route exact path="/register/" component={RegisterContainer} />  
              <Route exact path="/inspectordashboard/" component={InspectorDashboardContainer} />  
            </div>
            <Footer/>
          </div>
      );
  }
}