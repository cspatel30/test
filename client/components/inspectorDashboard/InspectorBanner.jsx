import React, { Component } from 'react';
import './InspectorDashboard.scss';

class InspectorBanner extends Component {
  
  render() {
    return (
      <div className="jumbotron jumbotron-billboard jumbo-height">
      <div className="img"></div>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                  <h1 className="jumbo-txt">FIND INSPECTORS</h1>
                </div>
            </div>
        </div>
    </div>
      
    );
  }
}

export default InspectorBanner;
