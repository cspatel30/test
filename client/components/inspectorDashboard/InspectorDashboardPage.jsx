import React, { Component } from 'react';
import ReactStars from 'react-stars';
import FilterInspector from './FilterInspectorPage.jsx';
import InspectorProfiles from './InspectorProfilesPage.jsx';
import TopFavourateInspectors from './TopFavourateInspectorsPage.jsx';
import TopRatedInspectors from './TopRatedInspectorsPage.jsx'
import Searchbar from './InspectorSearchbarPage.jsx';
import InspectorBanner from './InspectorBanner.jsx'
import './InspectorDashboard.scss';

export default class InspectorDashboardPage extends Component {
    constructor(props){
        super(props);
        this.state={
            listOfInspectors:''
        }
    }
    componentWillMount() {
        this.props.getAllInspectors()
    }

    componentWillReceiveProps(props){
        if(props){
            this.setState({
                listOfInspectors:props
            })
        }  
       // console.log("userinspectorsdetailspage"+JSON.stringify(props.authReducer.getListInspectors))
      }
   
  render() {
    return (
      <div className="i-dashboard">
      <InspectorBanner />
      <Searchbar/>
      <div className="container icontainer col-md-12 mt-20">
            <div className="row col-md-12 pl-0 pr-0">
              <div className="col-md-3">
               <FilterInspector/>
       </div>
        <div className="col-md-6">
            <InspectorProfiles {...this.state}/>
        </div>
        <div className="col-md-3 pr-0">
            <TopRatedInspectors/>
            <TopFavourateInspectors/>
        </div>
        </div>
    </div>
    </div>
    );
  }
}
