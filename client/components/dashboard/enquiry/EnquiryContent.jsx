import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import StatusEnquiry from './StatusEnquiry.jsx';
import CustomizedTable from '../common/CustomizedTable.jsx';
import './enquiry.scss';

export default class EnquiryContent extends Component {
    render() {
        const {renderEnquiries,profileType,formatDate,page,itemType} = this.props;
        
        if (renderEnquiries && renderEnquiries.length > 0) { 
        return (
            <div className="InnerContainer">
            <div className="raised">
             <RaisedButton
                label="ADD NEW ENQUIRY"
                labelColor="#FE3D6C"
                backgroundColor="#FFF"
                buttonStyle={{ borderRadius: 25 }}
                labelStyle={{fontWeight: "600"}}
                style={{ borderRadius: 25, border: '2px solid #FE3D6C',float: "left",
                margin: "10px 0 0",width: "192px"}}
              />
              
              <StatusEnquiry />
               
          </div>
            <CustomizedTable 
               renderEnquiries={renderEnquiries} 
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