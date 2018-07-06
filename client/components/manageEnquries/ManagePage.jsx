import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';


import './ManagePage.scss';

export default class ManagePage extends Component {
    constructor(props){
        super(props);
        this.state={
            isActive:false,
            isDeclined:false,
            showButtons: true
        }
    }
    rejectClicked(){
        this.setState({
            showButtons:false,
            isRejected:true,
        })
    }

    render() {
        return (
            <div>
                    <div className="container border border-primary px-0">
                        <div className="results text-center border-bottom border-danger py-3">
                            RESULTS <span>(7)</span>
                        </div>
                        <List>
                        <div className="d-flex border-bottom border-danger py-3 px-3">
                            <div className="box d-flex align-items-center w-40">05/11/2018</div>
                            <div className="box d-flex w-100">
                                <div>
                                    <div className="vesselDetail mb-2">
                                        <span className="text-info">Inspection Type : </span><span>Pre-Purchase Inspection</span>
                                    </div>
                                    <div className="vesselDetail mb-2">
                                        <span className="text-info">Vessel Type :</span> <span> Bulk Carrier</span>
                                    </div>
                                    <div className="vesselDetail mb-2">
                                        <span className="text-info">From : </span><span>14th july 2018 to 15th july 2018</span>
                                    </div>
                                    <div className="vesselDetail mb-2">
                                        <span className="text-info">Port : </span><span>La Massana, Barcelona </span>
                                    </div>
                                </div>
                            </div>
                            <div className="box d-flex w-100 position-relative">
                                <div>
                                    <div className="vesselDetail mb-2">
                                       <span className="text-info">Max Bidding Price :</span> <span className ="price-tags">$2000 <i className="fa fa-info-circle" aria-hidden="true"style = {{color:"#3f8cef"}}></i></span>
                                   </div>
                                    <div className="vesselDetail mb-2 position-absolute d-flex">
                                        <span className="text-info d-block">Message :</span> <span>Hello! nice to meet you</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="box w-85">
                                <div className="PriceColumn d-flex align-items-center mb-3">
                            <div className="fixed d-flex align-items-center">
                                    Total(Fixed Price)  
                                </div>
                                <div className="total">$1900</div>
                                </div>
                                {
                                    (this.state.showButtons)?(
                                    <div className="viewAttachment d-flex mb-2">
                                    <button className="btn btn-head btn-blue mr-2">
                                        QUOTE
                                    </button>
                                    <button className="btn btn-head btn-white" onClick={this.rejectClicked.bind(this)}>
                                        REJECT
                                    </button>
                                </div>
                                ):
                                (<span className="declinedTextRejected d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                REJECTED</span>)
                                }                        
                            </div>
                        </div>
                        
                        {[{amount:"2000",status:"OPEN",total:"1900"},{amount:"604",status:"ORDERED",total:"597"},{amount:"776",status:"EXPIRED",total:"993"},{amount:"349",status:"REJECTED",total:"545"},{amount:"450",status:"REJECTED",total:"268"},{amount:"466",status:"REJECTED",total:"393"}].map(sectionId => (
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
                        <div className="box d-flex w-100 position-relative">
                                <div>
                                    <div className="vesselDetail mb-2">
                                       <span className="text-info">Max Bidding Price :</span> <span className ="price-tags mb-1"> ${sectionId.amount} <i className="fa fa-info-circle" aria-hidden="true"style = {{color:"#3f8cef"}}></i></span>
                                   </div>
                                    <div className="vesselDetail mb-2 position-absolute d-flex">
                                        <span className="text-info d-block">Message :</span> <span>Hello! nice to meet you</span>
                                    </div>
                                </div>
                            </div>
                        <div className="box w-85">

                            <div className="leftColumn">
                            <div className="PriceColumn d-flex align-items-center">
                            <div className="fixed d-flex align-items-center">
                                    Total(Fixed Price)  
                                </div>
                                <div className="total">${sectionId.total}</div>
                                </div>
                                <div className="viewAttachment mb-4">
                                    View Quote 
                                </div>
                                {
                                (sectionId.status=="OPEN")?(
                                    <span className="declinedTextOpen d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                    {sectionId.status}</span>
                                ):(
                                    (sectionId.status=="ORDERED")?(
                                        <span className="declinedTextOrdered d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                        {sectionId.status}</span>
                                    ):(
                                        (sectionId.status=="EXPIRED")?(
                                            <span className="declinedTextExpired d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                        {sectionId.status}</span>
                                        ):(
                                            <span className="declinedTextRejected d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                            {sectionId.status}</span>
                                        )
                                    )
                                )
                            }
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