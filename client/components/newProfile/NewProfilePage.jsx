// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import ReactStars from 'react-stars';
import UserProfileDashboardPage from './UserProfileDashboardPage.jsx';
import UserProfileDetailsPage from './UserProfileDetailsPage.jsx';
import './newProfile.scss';

export default class NewProfilePage extends Component {

  constructor(props) {
    super(props);
    };

  render() {
    return (
        <div>
          <UserProfileDetailsPage/>
          <UserProfileDashboardPage/>
        </div>
    );
  }
}