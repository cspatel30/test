import React, { Component } from 'react';
import ProposalList from './ProposalList.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import round from '../../images/round-error-symbol.svg';
import InspectionCard from './InspectionCard.jsx';

export default class ProposalContent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          page: 1
        };
    }

    render() { 
        const {formatDate} = this.props;      
        const pageCount = Math.ceil(4 / 2);
        return (
            <div className="InnerContainer">
            <div className="raisedEnq">
             <RaisedButton
              label="GO TO ENQUIRIES"
              labelColor="#1B8CEF"              
              backgroundColor="#FFFFFF"   
              buttonStyle={{ borderRadius: 25 }}
              labelStyle={{fontWeight: "600"}}
              style={{ borderRadius: 25, border: "2px solid #1B8CEF",fontSize: "16px",width:"219px"}}           
            />  
            <div className="Filter">
            <div className="Enquiryactive"><span className="FilterHead"><img src={round} width="14px" height="14px"/> {'All amounts in US Dollars'}</span></div>
            </div>
            <InspectionCard/>
            </div> 
             <div>
             <ProposalList page={this.state.page} formatDate={formatDate} pageCount={pageCount}/>  
             </div>             
          </div>      
          );
      }
}