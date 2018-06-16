import React, { Component } from 'react';


export default class InspectorSearchBarPage extends Component {
  
  render() {
    return (
      <div className="container col-md-12">
          <div className="row col-md-12">
              <div className="col-md-3">
              <span >Filter</span>
              <hr/>
              </div>
              <div className="col-md-9">
              <div className="example">
                <input type="text" placeholder="Search by keywords...." name="search"/>
                <button type="submit"><i className="fa fa-search"></i></button>
              </div>
              </div>
          </div>
      </div>
    );
  }
}
