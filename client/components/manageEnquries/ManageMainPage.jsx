import React, { Component } from 'react';
import BannerPage from './BannerPage.jsx'
import ListOfEnquiries from './ListOfEnquiries';
import ManagePage from './ManagePage'
var moment = require('moment');

export default class QuotaionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
          gotEnquries:''
        }
        this.receivingDates = this.receivingDates.bind(this)
    }
    
    componentWillMount() {
      this.props.getAllEnquiries()
      
  }
  componentWillReceiveProps(props){
   console.log("Props"+JSON.stringify(props))
   // console.log(JSON.stringify(props.enquiresReducer.gotAllListEnquiries)+"this is manageMainPage Data")
    if(props){
      this.setState({
        gotEnquries: props.enquiresReducer.gotAllListEnquiries
      })
    }
  }
  receivingDates(dates){
    alert("start date == "+JSON.stringify(dates))
    alert("end date == "+JSON.stringify(dates.endDate))
    if(dates){
      var dateString = dates.startDate;
      var momentObj = moment(dateString, 'MM-DD-YYYY');
      var momentStart = momentObj.format('YYYY-MM-DD'); 
      var dateString = dates.endDate;
      var momentObj = moment(dateString, 'MM-DD-YYYY');
      var momentEnd = momentObj.format('YYYY-MM-DD');    
      var dateformat ={}
      dateformat.startDate = momentStart
      dateformat.endDate = momentEnd

      this.props.getAllEnquiries(dateformat)
    }
    

    // this.setState({
    //   startDates: dates.start,
    //   endDates: dates.endDate
    // })
  }
   
  render() {
    if(this.state.gotEnquries){
      var Enquries = this.state.gotEnquries
    }
    //console.log(JSON.stringify(this.state.gotEnquries)+"This is my state3")
    return (
      <div className="i-dashboard">
          <BannerPage />
          <ListOfEnquiries  sendDates={this.receivingDates}/>
          <ManagePage  listEnquires ={Enquries}/>
       </div>
    );
  }
}