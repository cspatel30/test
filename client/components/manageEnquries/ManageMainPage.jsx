import React, { Component } from 'react';
import BannerPage from './BannerPage.jsx'
import ListOfEnquiries from './ListOfEnquiries';
import ManagePage from './ManagePage'

export default class QuotaionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
          gotEnquries:''
        }
    }
    
    componentWillMount() {
      this.props.getAllEnquiries()
      
  }
  componentWillReceiveProps(props){
   // console.log("Props"+JSON.stringify(props))
   // console.log(JSON.stringify(props.enquiresReducer.gotAllListEnquiries)+"this is manageMainPage Data")
    if(props){
      this.setState({
        gotEnquries: props.enquiresReducer.gotAllListEnquiries
      })
    }
  }
   
  render() {
    if(this.state.gotEnquries){
      var Enquries = this.state.gotEnquries
    }
    //console.log(JSON.stringify(this.state.gotEnquries)+"This is my state3")
    return (
      <div className="i-dashboard">
          <BannerPage />
          <ListOfEnquiries/>
          <ManagePage  listEnquires ={Enquries}/>
       </div>
    );
  }
}