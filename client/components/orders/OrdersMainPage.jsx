import React, { Component } from 'react';
import BannerPage from './BannerPage.jsx'
import ListOfEnquiries from './ListOfEnquires'
import OrdersPage from './OrdersPage'

export default class QuotaionPage extends Component {
    constructor(props){
        super(props);
    }
   
  render() {
    return (
      <div className="i-dashboard">
          <BannerPage />
          <ListOfEnquiries/>
          <OrdersPage/>
       </div>
    );
  }
}