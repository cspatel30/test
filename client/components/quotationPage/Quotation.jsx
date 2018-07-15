import React, { Component } from 'react';
import BannerPage from './BannerPage.jsx'
import ListOfEnquiries from './ListOfEnquires'
import EditEnquiry from './EditEnquiry'

export default class QuotaionPage extends Component {
    constructor(props){
        super(props);
    }
   
  render() {
    return (
      <div className="i-dashboard">
          <BannerPage />
          <ListOfEnquiries/>
          <EditEnquiry/>
       </div>
    );
  }
}
