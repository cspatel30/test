import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './OrdersPage.scss';
import { Divider } from 'material-ui';

export default class OrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            isDeclined: false,
            showButtons: true,
            listJobOrders: '',
            requestedAccepted: ''
        }
    }
    acceptClicked(oid) {
        // this.setState({
        //     showButtons: false,
        //     isDeclined: false,
        //     isActive: true           
        // })
        this.props.orderAcceptRequest(oid)
    }
    declinedClicked(oid) {
        // this.setState({
        //     showButtons: false,
        //     isActive: false,
        //     isDeclined: true
        // })
        this.props.orderDeclineRequest(oid)
    }

    componentWillReceiveProps(props) {
        if (props.gotJobOrders.data.content) {
            this.setState({
                listJobOrders: props.gotJobOrders.data.content
            })
        }
        if (props.accceptRequestState.status && props.accceptRequestState.status == "Success") {
            this.setState({
                showButtons: false,
                isDeclined: false,
                isActive: true
            })
        }
        if (props.declineRequestState.status && props.declineRequestState.status == "Success") {
             this.setState({
            showButtons: false,
            isActive: false,
            isDeclined: true
        })
        }
    }

    render() {
        if (this.state.listJobOrders) {
            var list = this.state.listJobOrders
            return (
                <div>
                    <div className="container text-right mt-5 d-flex">
                        <div className="d-flex justify-content-end w-100">
                            <div className="exclamatory"> ! </div> All amounts in US Dollars</div>
                    </div>
                    <div className="container border border-primary px-0">
                        <div className="results text-center border-bottom border-danger py-3">
                            RESULTS <span>({list.length})</span>
                        </div>
                        <List>
                            {
                                list.map((OrdersPage, key) => {
                                    return <div className="d-flex border-bottom border-danger py-3 px-3">
                                        <div className="box d-flex align-items-center w-40">{OrdersPage.user.registeredDate}</div>
                                        <div className="box d-flex w-100">
                                            <div>
                                                <div className="vesselDetail mb-1">
                                                    <span className="text-info">Vessel :</span><span>{OrdersPage.vesselName}</span>
                                                </div>
                                                <div className="vesselDetail mb-1">
                                                    <span className="text-info">IMO :</span><span> {OrdersPage.imoNumber}</span>
                                                </div>
                                                <div className="vesselDetail mb-1">
                                                    <span className="text-info">Inspection Type :</span><span>{OrdersPage.inspectionType}</span>
                                                </div>
                                                <div className="vesselDetail mb-1">
                                                    <span className="text-info">Vessel Type :</span><span>{OrdersPage.vesselType}</span>
                                                </div>
                                                <div className="vesselDetail mb-1">
                                                    <span className="text-info">Port :</span><span>{OrdersPage.port.name} </span>
                                                </div>
                                                <div className="vesselDetail mb-1">
                                                    <span className="text-info">From :</span><span>{OrdersPage.startTime} to{OrdersPage.endTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box d-flex w-100 position-relative">
                                            <div>
                                                <div className="vesselDetail mb-1">
                                                    <span className="text-info">Total Fixed Order Amount :</span> <span className="price-tags">${OrdersPage.inspectorPaidAmount} </span><i className="fa fa-info-circle" aria-hidden="true" style={{ color: "#3f8cef" }}></i>
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
                                            (this.state.showButtons) ? (
                                                <div className="box w-85">
                                                    <div className="viewAttachment mb-2">
                                                        View Attachments
                                                    </div>
                                                    <div className="viewAttachment d-flex mb-3">
                                                        <button className="btn btn-head btn-blue mr-2" onClick={this.acceptClicked.bind(this, OrdersPage.id)}>
                                                            ACCEPT
                                                        </button>
                                                        <button className="btn btn-head btn-white d-flex align-items-center" onClick={this.declinedClicked.bind(this,OrdersPage.id)}>
                                                            DECLINE
                                                        </button>
                                                    </div>
                                                    <div className="viewAttachment">
                                                        Attach Invoice
                                                    </div>
                                                </div>
                                            ) : (
                                                    (this.state.isActive) ? (
                                                        <div className="box w-85">
                                                            <div className="viewAttachment d-flex mb-1">
                                                                <span className="declinedTextAccepted d-flex align-items-center"><i className="fa fa-tag" aria-hidden="true"></i>
                                                                    ACCEPTED</span>
                                                            </div>
                                                            <div className="viewAttachment">
                                                                View Attachments
                                                            </div>
                                                        </div>
                                                    ) : (
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
                                })
                            }
                        </List>
                    </div>
                </div>
            )
        }
        else {
            return <h6>Loading....</h6>
        }
    }
}