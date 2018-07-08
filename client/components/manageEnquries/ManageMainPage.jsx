import React, { Component } from 'react';
import BannerPage from './BannerPage.jsx'
import ListOfEnquiries from './ListOfEnquiries';
import ManagePage from './ManagePage'

export default class QuotaionPage extends Component {
    constructor(props){
        super(props);
    }
   
  render() {
    return (
      <div className="i-dashboard">
          <BannerPage />
          <ListOfEnquiries/>
          <ManagePage/>
       </div>
    );
  }
}