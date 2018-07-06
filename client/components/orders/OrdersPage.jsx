import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import './OrdersPage.scss';
import { Divider } from 'material-ui';


export default class OrdersPage extends Component {
    constructor(props){
        super(props);
        this.state={
            isActive:false,
            isDeclined:false,
            showButtons: true
        }
    } 

    acceptClicked () {
        this.setState({
            showButtons:false,
            isDeclined:false,
            isActive:true
        })       
    }
    declinedClicked () {
        this.setState({
            showButtons:false,
            isActive:false,
            isDeclined:true
        })       
    }
       
    render() {
        return (
            <div>
                
                    <div className="container text-right mt-5 d-flex">
                    <div className= "d-flex justify-content-end w-100">
                    <div className ="exclamatory"> ! </div> All amounts in US Dollars</div></div>
                    <div className="container border border-primary px-0">
                        <div className="results text-center border-bottom border-danger py-3">
                            RESULTS <span>(5)</span>
                        </div>
                        <List>
                        
                        <div className="d-flex border-bottom border-danger py-3 px-3">
                            <div className="box d-flex align-items-center w-40">05/11/2018</div>
                            <div className="box d-flex w-100">
                                <div>
                                    <div className="vesselDetail mb-1">
                                        <span className="text-info">Vessel :</span><span>MV NILOS</span>
                                    </div>
                                    <div className="vesselDetail mb-1">
                                        <span className="text-info">IMO :</span><span> 394134</span>
                                    </div>
                                    <div className="vesselDetail mb-1">
                                        <span className="text-info">Inspection Type :</span><span>Pre-Purchase Inspection</span>
                                    </div>
                                    <div className="vesselDetail mb-1">
                                        <span className="text-info">Vessel Type :</span><span> Bulk Carrier</span>
                                    </div>
                                    <div className="vesselDetail mb-1">
                                        <span className="text-info">Port :</span><span>La Massana, Barcelona </span>
                                    </div>
                                    <div className="vesselDetail mb-1">
                                        <span className="text-info">From :</span><span>14th july 2018 to 15th july 2018</span>
                                    </div>
                                </div>

                            </div>
                            <div className="box d-flex w-100 position-relative">
                                <div>
                                    <div className="vesselDetail mb-1">
                                        <span className="text-info">Total Fixed Order Amount :</span> <span className ="price-tags">$2000 </span><i className="fa fa-info-circle" aria-hidden="true"style = {{color:"#3f8cef"}}></i>
                                    </div>
                                    <div className="vesselDetail mb-1">
                                        <span className="text-info">Pricin Method :</span><span>Fixed</span>
                                    </div>
                                    <div className="vesselDetail mb-1">
                                        <span className="text-info">Payment Term :</span><span> 30 Days</span>
                                    </div>
                                    <div className="vesselDetail mb-1 position-absolute pa-bottom">
                                        <span className="text-info d-block">Message  :</span><span>Hello! nice to meet you</span>
                                    </div>
                                </div>
                            </div>
                            {
                                (this.state.showButtons)?(
                                    <div className="box w-85">
                                        <div className="viewAttachment mb-2">
                                            View Attachments
                                        </div>
                                        <div className="viewAttachment d-flex mb-3">
                                            <button className="btn btn-head btn-blue mr-2" onClick={this.acceptClicked.bind(this)}>
                                                ACCEPT
                                            </button>
                                            <button className="btn btn-head btn-white d-flex align-items-center"  onClick={this.declinedClicked.bind(this)}>
                                                DECLINE
                                            </button>
                                        </div>
                                        <div className="viewAttachment">
                                            Attach Invoice
                                        </div>
                                    </div>
                                ):(
                                    (this.state.isActive)?(
                                        <div className="box w-85">
                                            <div className="viewAttachment d-flex mb-1">
                                                <span className="declinedTextAccepted d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                                ACCEPTED</span>
                                            </div>
                                            <div className="viewAttachment">
                                                View Attachments
                                            </div>
                                        </div>
                                    ):(
                                        <div className="box w-85">
                                            <div className="viewAttachment d-flex mb-1">
                                                <span className="declinedTextDeclined d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                                DECLINED</span>
                                            </div>
                                            <div className="viewAttachment">
                                                View Attachments
                                            </div>
                                        </div>
                                    )                                    
                                )
                            }
                            
                        </div>
                        {[{amount:"240",status:"ACCEPTED"},{amount:"976",status:"COMPLETED"},{amount:"550",status:"CLOSED"},{amount:"686",status:"DECLINED"}].map(sectionId => (
                        <div className="d-flex border-bottom border-danger py-3 px-3">
                        <div className="box d-flex align-items-center w-40">05/11/2018</div>
                        <div className="box d-flex align-items-baseline w-100">
                            <div>
                                <div className="vesselDetail mb-1">
                                    <span className="text-info">Vessel :</span><span>MV NILOS</span>
                                </div>
                                <div className="vesselDetail mb-1">
                                    <span className="text-info">IMO :</span><span> 394134</span>
                                </div>
                                <div className="vesselDetail mb-1">
                                    <span className="text-info">Inspection Type :</span><span>Pre-Purchase Inspection</span>
                                </div>
                                <div className="vesselDetail mb-1">
                                    <span className="text-info">Vessel Type :</span><span> Bulk Carrier</span>
                                </div>
                                <div className="vesselDetail mb-1">
                                    <span className="text-info">Port :</span><span>La Massana, Barcelona </span>
                                </div>
                                <div className="vesselDetail mb-1">
                                    <span className="text-info">From :</span><span>14th july 2018 to 15th july 2018</span>
                                </div>
                            </div>

                        </div>
                        <div className="box d-flex align-items-baseline w-100 position-relative">
                            <div>
                                <div className="vesselDetail mb-1">
                                    <span className="text-info">Total Fixed Order Amount :</span><span   className="price-tags">    ${sectionId.amount}</span>
                                </div>
                                <div className="vesselDetail mb-1">
                                    <span className="text-info">Pricin Method :</span><span>Actual</span>
                                </div>
                                <div className="vesselDetail mb-1">
                                    <span className="text-info">Payment Term :</span><span> Actual</span>
                                </div>
                                <div className="vesselDetail mb-1 position-absolute pa-bottom">
                                    <span className="text-info d-block">Message  :</span><span>Hello! nice to meet you</span>
                                </div>
                            </div>
                        </div>
                        <div className="box w-85">

                            <div className="viewAttachment d-flex mb-1">
                            {
                                (sectionId.status=="ACCEPTED")?(
                                    <span className="declinedTextAccepted d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                    {sectionId.status}</span>
                                ):(
                                    (sectionId.status=="COMPLETED")?(
                                        <span className="declinedTextCompleted d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                        {sectionId.status}</span>
                                    ):(
                                        (sectionId.status=="CLOSED")?(
                                            <span className="declinedTextClosed d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                        {sectionId.status}</span>
                                        ):(
                                            <span className="declinedTextDeclined d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                            {sectionId.status}</span>
                                        )
                                    )
                                )
                            }
                            </div>
                            <div className="viewAttachment">
                                View Attachments
                            </div>
                        </div>
                    </div>
                         ))}
                        </List>
                        
                    </div>
               
            </div>
        )
    }
}