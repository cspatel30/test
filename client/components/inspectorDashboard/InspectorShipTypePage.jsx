import React, { Component } from 'react';
import './InspectorDashboard.scss';

export default class InspectorShipTypePage extends Component {
    constructor(props){
        super(props);
    }
   
  render() {
        return (
            <div className="shiptype">
            <div className="col-md-12 pl-0 pr-0 mt-10">
                <span>Ship Type</span>
                <div className="skills-filter pb-10 IProfile-page">
                    <ul className="ship-list mt-10">
                        <li>Car Carriers Ship</li>
                        <br/>
                        <li>Bulk Carriers Ship</li>
                    </ul>
                <span className="ml-2">Add covered...</span> 
                </div>
            </div>
            <div className="col-md-12 pl-0 pr-0 mt-10">
            <span>Areas Covered"</span>
            <div className="dropdown">
            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
            Dropdown button
            </button>
            <div className="dropdown-menu ">
            <div className="dropdown-divider" />
               <a className="dropdown-item" href="#">Another link</a>
               <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">Another link</a>
                  <div className="dropdown-divider" />
                     <a className="dropdown-item" href="#">Another link</a>
                  </div>
               </div>
            </div>
            <div className="col-md-12 pl-0 pr-0 mt-10">
               <h5>Years of experience</h5>
               <div style={wrapperStyle}>
                  <Range min={0} max={20} defaultValue={[0, 20]} tipFormatter={value=> `${value}`} />
               </div>
            </div>
            </div>
        );
    }
}
