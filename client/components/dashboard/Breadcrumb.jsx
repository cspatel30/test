import React, { Component } from 'react';

export default class Breadcrumb extends Component {
    render() { 
        const {showNavigationName,showActive,selected} = this.props;
        return (
            <div className="breadcrumbnav">
            <ul className="breadcrumb">
            <li className={showActive === 'Manage Enquiries' ? 'active' : ''}><div className={`section ${selected === "Manage Enquiries" ? "selected" : ""}`} onClick={() => showNavigationName("Manage Enquiries")}>ENQUIRIES</div></li>
            <li className={showActive === "Find Inspectors" ? 'active' : ''}><div className={`section ${selected === "Find Inspectors" ? "selected" : ""}`} onClick={() => showNavigationName("Find Inspectors")}>FIND INSPECTORS</div></li>
            <li className={showActive === "Manage Orders" ? 'active' : ''}><div className={`section ${selected === "Manage Orders" ? "selected" : ""}`} onClick={() => showNavigationName("Manage Orders")}>ORDERS</div></li>
            <li className={showActive === "Reports" ? 'active' : ''}><div className={`section ${selected === "Reports" ? "selected" : ""}`} onClick={() => showNavigationName("Reports")}>REPORTS</div></li>
            <li className={showActive === "Invoices" ? 'active' : ''}><div className={`section ${selected === "Invoices" ? "selected" : ""}`} onClick={() => showNavigationName("Invoices")}>INVOICES</div></li>
          </ul>  
          </div>        
          );
      }
    }