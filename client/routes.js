// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';

import HomeHeader from './components/homePage/Header.js';
import HomeFooter from './components/homePage/Footer.js';
import HomePage from './components/pages/HomePage.jsx';
import HomePageNew from './components/homePage/HomePageNew';
import AboutPage from './components/pages/AboutPage.jsx';
import PolicyPage from './components/pages/PolicyPage.jsx';
import TermsPage from './components/pages/TermsPage.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import SampleReportsPage from './components/pages/SampleReportsPage.jsx';

import InspectorsContainer from './containers/InspectorsContainer.js';
import InspectorPublicProfileContainer from './containers/InspectorPublicProfileContainer.js';
import LoginContainer from './containers/LoginContainer.js';
import RegisterContainer from './containers/RegisterContainer.js';
import QuoteEnquiryContainer from './containers/QuoteEnquiryContainer.js';
import CustomerEnquiriesContainer from './containers/CustomerEnquiriesContainer.js';
import InspectorProfileContainer from './containers/InspectorProfileContainer.js';
import AdminHomePageContainer from './containers/AdminHomePageContainer.js';
import DocumentDownloadContainer from './containers/DocumentDownloadContainer.js';
import ContactUsContainer from './containers/ContactUsContainer.js';
import SetupAccountContainer from './containers/SetupAccountContainer.js';
import VerifyEmailContainer from './containers/VerifyEmailContainer.js';
import UserOrdersContainer from './containers/UserOrdersContainer.js';
import NewProfileContainer from './containers/NewProfileContainer.js';
import NewInspectorDashboardContainer from './containers/NewInspectorDashboardContainer.js';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

export default class Body extends Component {

  render() {
	return (
          <div className="main">
            <HomeHeader/>
            <div className="content">
              {/* <Route component={ScrollToTop}/> */}
              {/* <Route exact path="/" component={HomePage}/> */}
              <Route exact path="/" component={HomePageNew}/>
              <Route exact path="/inspectors/" component={InspectorsContainer} />
              <Route exact path="/inspector/profile/:id" component={InspectorPublicProfileContainer} />
              <Route exact path="/enquiry/" component={QuoteEnquiryContainer} />
              <Route exact path="/about/" component={AboutPage} />
              <Route exact path="/contact/" component={ContactUsContainer} />
              <Route exact path="/news/" component={NotFoundPage} />
              <Route exact path="/reports/" component={SampleReportsPage} />
              <Route exact path="/login/" component={LoginContainer} />
              <Route exact path="/register/" component={RegisterContainer} />
              <Route exact path="/terms/" component={TermsPage} />
              <Route exact path="/policy/" component={PolicyPage} />
              <Route exact path="/my/profile/" component={InspectorProfileContainer} />
              <Route exact path="/my/enquiries/" component={CustomerEnquiriesContainer} />
              <Route exact path="/my/orders/" component={UserOrdersContainer} />
              <Route exact path="/my/doc/:docType/:fileName" component={DocumentDownloadContainer} />
              <Route exact path="/verify/email/:requestToken" component={VerifyEmailContainer} />
              <Route exact path="/setup/account/:requestToken" component={SetupAccountContainer} />
              <Route path="/admin" component={AdminHomePageContainer} />
              <Route exact path="/newprofile" component={NewProfileContainer} />
              <Route exact path="/inspectordashboard" component={NewInspectorDashboardContainer} />
            </div>
            <HomeFooter/>
          </div>
      );
  }
}