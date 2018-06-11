import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import StatusOrder from './StatusOrder.jsx';
import CustomizedTable from './CustomizedTable.jsx';

export default class OrderContent extends Component {
    render() {
        const {renderEnquiries,profileType,formatDate,page,itemType} = this.props;
        
        if (renderEnquiries && renderEnquiries.length > 0) { 
        return (
            <div className="InnerContainer">
            <div className="raised">            
              
              <StatusOrder />
               
          </div>
            <CustomizedTable 
               
               profileType={profileType} 
               formatDate={formatDate} 
               page={page} 
               itemType ={itemType}
               />
          </div>        
          );
        } else {
            return (              
              <div>You have no open enquiries</div>
            );
          }                
      }
    }