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
           //listedEnquries:props.listEnquires
        }
    }
    componentWillReceiveProps(props){
    //console.log("Props"+JSON.stringify(props))
    if(props.listEnquires.data.content){
         this.setState({
          listedEnquries: props.listEnquires.data.content
         })
    }
    }
    rejectClicked(){
        this.setState({
            showButtons:false,
            isRejected:true,
        })
    }

    render() {
     if(this.state.listedEnquries){
            var listResults = this.state.listedEnquries 
            console.log("listResults values are: "+JSON.stringify(listResults))
        return (
            <div>
                <div className="container border border-primary px-0">
                
                    <div className="results text-center border-bottom border-danger py-3">
                        RESULTS <span>({listResults.length})</span>
                    </div>
                        <List>
                            {
                                 listResults.map((enquiry,key)=>{
                                  return <div className="d-flex border-bottom border-danger py-3 px-3">
                                        <div className="box d-flex align-items-center w-40">{enquiry.createdOn}</div>
                                        <div className="box d-flex w-100">
                                            <div>
                                                <div className="vesselDetail mb-2">
                                                    <span className="text-info">Inspection Type : </span><span>{enquiry.inspectionType}</span>
                                                </div>
                                                <div className="vesselDetail mb-2">
                                                    <span className="text-info">Vessel Type :</span> <span>{enquiry.vesselType}</span>
                                                </div>
                                                <div className="vesselDetail mb-2">
                                                    <span className="text-info">From : </span><span>{enquiry.startTime} to{enquiry.endTime} </span>
                                                </div>
                                                <div className="vesselDetail mb-2">
                                                    <span className="text-info">Port : </span><span>{enquiry.port.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box d-flex w-100 position-relative">
                                            <div>
                                                <div className="vesselDetail mb-2">
                                                    <span className="text-info">Max Bidding Price :</span> <span className="price-tags">${enquiry.maxBidAmount} <i className="fa fa-info-circle" aria-hidden="true" style={{ color: "#3f8cef" }}></i></span>
                                                </div>
                                                <div className="vesselDetail mb-2 position-absolute d-flex">
                                                    <span className="text-info d-block">Message :</span> <span>{enquiry.clientMessage}</span>
                                                </div>
                                            </div>
                                        </div>
            
                                        <div className="box w-85">
                                            <div className="PriceColumn d-flex align-items-center mb-3">
                                                <div className="fixed d-flex align-items-center">
                                                    Total(Fixed Price)
                                                        </div>
                                                <div className="total">${enquiry.inspectorPaidAmount}</div>
                                            </div>
                                            {
                                                (this.state.showButtons) ? (
                                                    <div className="viewAttachment d-flex mb-2">
                                                        <button className="btn btn-head btn-blue mr-2">
                                                            QUOTE
                                                            </button>
                                                        <button className="btn btn-head btn-white" onClick={this.rejectClicked.bind(this)}>
                                                            REJECT
                                                            </button>
                                                    </div>
                                                ) :
                                                    (<span className="declinedTextRejected d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                                        REJECTED</span>)
                                            }
                                        </div>
                                    </div>
                                    })
                            }
                    </List>
                </div>
        </div>            
        )
    }
    else{
        return <h6>Loading....</h6>
    }
    }
}