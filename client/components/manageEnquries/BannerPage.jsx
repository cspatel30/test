import React, { Component } from 'react';
import './ManagePage.scss';

export default  class BannerPage extends Component {
  
  render() {
    return (
      <div className="jumbotron jumbotron-billboard jumbo-height">
      <div className="img"></div>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                  <h1 className="jumbo-txt">MANAGE ENQURIES</h1>
                </div>
            </div>
        </div>
      </div>
      
    );
  }
}

