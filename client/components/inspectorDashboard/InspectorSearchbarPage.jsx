import React, { Component } from 'react';
import './InspectorDashboard.scss';
export default class InspectorSearchBarPage extends Component {
  
  render() {
    return (
      <div className="container icontainer col-md-12">
          <div className="row col-md-12">
              <div className="col-md-3 filter">
              <span >Filter</span>
              <hr/>
              </div>
              <div className="col-md-9 pr-0">
              <div className="example">
                <input type="text" placeholder="Search by keywords...." name="search"/>
                <button className="h-60" type="submit"><i className="fa fa-search"></i></button>
              </div>
              </div>
          </div>
      </div>
    );
  }
}
