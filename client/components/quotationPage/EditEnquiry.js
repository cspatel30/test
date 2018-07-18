import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './Quotation.scss';

export default class EditEnquiry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: "/public/img/checked.png",
            unchecked: "/public/img/unchecked.png",
            tickMark: "/public/img/tickMark.png",
            tickMarkSelected: "/public/img/tickMarkSelected.png",
            calendar: "/public/img/calendar.png",
            fixedSelected:"/public/img/tickMarkSelected.png",
            actualSelected: "/public/img/tickMark.png",
            perHourSelected:"/public/img/checked.png",
            perDaySelected: "/public/img/unchecked.png",
            payAdvanceSelected:"/public/img/checked.png",
            payCreditPeriodSelected: "/public/img/unchecked.png",
            acceptTermsConditionSelected: "/public/img/unchecked.png",
            fixedPrice:true,
            actualPrice:false,
            fixedPrice:true,
            perDay:false,
            perHour:true,
            payAdvance:true,
            payCreditPeriod:false,
            acceptTermsCondition:false,
            startDate: '',
            endDate: '',
            quotationForm: {
                availabilityStartDate: "",
                availabilityEndDate: "",
                totalFixedPrice: "",
                fixedOrderPriceUS: "",
                inspectionServiceRate: "",
                travelWaitingRate: "",
                totalEstimatedInspectionServiceDuration: "",
                totalEstimatedServiceDuration: "",
                totalEstimatedTravelWaitingDuration: "",
                totalEstimatedAmount: "",
                actualOrderPriceUS: "",
                paymentAdvance: "",
                paymentCreditPeriod: ""
            },
            quotationFormError: {
                availabilityStartDate: "",
                availabilityEndDate: "",
                totalFixedPrice: "",
                fixedOrderPriceUS: "",
                inspectionServiceRate: "",
                travelWaitingRate: "",
                totalEstimatedInspectionServiceDuration: "",
                totalEstimatedServiceDuration: "",
                totalEstimatedTravelWaitingDuration: "",
                totalEstimatedAmount: "",
                actualOrderPriceUS: "",
                paymentAdvance: "",
                paymentCreditPeriod: ""
            }
        };
        this.fixedPriceSelected=this.fixedPriceSelected.bind(this);
        this.actualPriceSelected=this.actualPriceSelected.bind(this);
        this.perHourChecked=this.perHourChecked.bind(this);
        this.perDayChecked=this.perDayChecked.bind(this);
        this.payAdvanceChecked=this.payAdvanceChecked.bind(this);
        this.payCreditPeriodChecked=this.payCreditPeriodChecked.bind(this);
        this.termsAndConditionsChecked=this.termsAndConditionsChecked.bind(this);
        this.startDateChange = this.startDateChange.bind(this);
        this.endDateChange = this.endDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmitEditEnquiry = this.onSubmitEditEnquiry.bind(this);
    }

    startDateChange(date) {
        this.setState({
            startDate: date
        });
    }
    endDateChange(date) {
        this.setState({
            endDate: date
        });
    }

    fixedPriceSelected() {
        if (this.state.fixedPrice) {
            this.setState({
                fixedSelected: this.state.tickMark,
                fixedPrice:false
            })
        }else {
            this.setState({
                fixedSelected: this.state.tickMarkSelected,
                fixedPrice:true
            })
        }
    }

    actualPriceSelected() {
        if (this.state.actualPrice) {
            this.setState({
                actualSelected: this.state.tickMark,
                actualPrice:false
            })
        }else {
            this.setState({
                actualSelected: this.state.tickMarkSelected,
                actualPrice:true
            })
        }
    }

    perHourChecked() {
        if (this.state.perHour) {
            this.setState({
                perHourSelected: this.state.unchecked,
                perHour:false
            })
        }else {
            this.setState({
                perHourSelected: this.state.checked,
                perHour:true
            })
        }
    }

    perDayChecked() {
        if (this.state.perDay) {
            this.setState({
                perDaySelected: this.state.unchecked,
                perDay:false
            })
        }else {
            this.setState({
                perDaySelected: this.state.checked,
                perDay:true
            })
        }
    }

    payAdvanceChecked() {
        if (this.state.payAdvance) {
            this.setState({
                payAdvanceSelected: this.state.unchecked,
                payAdvance:false
            })
        }else {
            this.setState({
                payAdvanceSelected: this.state.checked,
                payAdvance:true
            })
        }
    }

    payCreditPeriodChecked() {

        if (this.state.payCreditPeriod) {
            this.setState({
                payCreditPeriodSelected: this.state.unchecked,
                payCreditPeriod:false
            })
        }else {
            this.setState({
                payCreditPeriodSelected: this.state.checked,
                payCreditPeriod:true
            })
        }
    }

    termsAndConditionsChecked() {
        if (this.state.acceptTermsCondition) {
            this.setState({
                acceptTermsConditionSelected: this.state.unchecked,
                acceptTermsCondition:false
            })
        }else {
            this.setState({
                acceptTermsConditionSelected: this.state.checked,
                acceptTermsCondition:true
            })
        }
    }

    handleInputChange(event) {
        event.persist();
        console.log("Name" + JSON.stringify(event.target.name) + "value" + JSON.stringify(event.target.value))

        this.setState((state) => { state.quotationForm[event.target.name] = event.target.value });
    }

    onSubmitEditEnquiry(event) {
        event.preventDefault();
        var error = false;
        console.log(this.state);
        var quotationFormError = {
            availabilityStartDate: "",
            availabilityEndDate: "",
            totalFixedPrice: "",
            fixedOrderPriceUS: "",
            inspectionServiceRate: "",
            travelWaitingRate: "",
            totalEstimatedInspectionServiceDuration: "",
            totalEstimatedServiceDuration: "",
            totalEstimatedTravelWaitingDuration: "",
            totalEstimatedAmount: "",
            actualOrderPriceUS: "",
            paymentAdvance: "",
            paymentCreditPeriod: ""
        }

        if (this.state.quotationForm.availabilityStartDate == "") {
            error = true;
            quotationFormError.availabilityStartDate = "This field is mandatory";
        }
        if (this.state.quotationForm.availabilityEndDate == "") {
            error = true;
            quotationFormError.availabilityEndDate = "This field is mandatory";
        }

        if (this.state.quotationForm.totalFixedPrice == "") {
            error = true;
            quotationFormError.totalFixedPrice = "This field is mandatory";
        }

        if (this.state.quotationForm.fixedOrderPriceUS == "") {
            quotationFormError.fixedOrderPriceUS = "This field is mandatory";
            error = true;
        }

        if (this.state.quotationForm.travelWaitingRate == "") {
            quotationFormError.travelWaitingRate = "This field is mandatory";
            error = true;
        }
        if (error) {
            alert("error")
            this.setState((state) => {
                state.quotationFormError = quotationFormError;
                state.signUpSuccess = false;
            });
            return;
        }

    }


    render() {
        return (
            <div className="editEnquiry mt-75">
                <div className="container border border-primary px-0">
                    <div className="results border-bottom border-danger py-3 d-flex alignC">
                    
                        <div className="ml-5 viewAttachment fs-14 d-flex alignC"> <i className="fa fa-angle-left mr-6" style={{"fontSize":"27px"}}></i><div className="mt" style = {{"margin-top":"2px"}}> Back to inspector enquiry list</div> </div>
                        <div className="ml-240 editSize"> EDIT QUOTE </div>
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
                                        <span className="text-info">Max Bidding Price :</span> <span className="price-tags">$2000 <i className="fa fa-info-circle" aria-hidden="true" style={{ color: "#3f8cef" }}></i></span>
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

                                <div className="viewAttachment d-flex mb-2">
                                    <button className="btn btn-head btn-blue mr-2">
                                        QUOTE
                            </button>
                                    <button className="btn btn-head btn-white">
                                        REJECT
                            </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 mx-auto mt-10">
                            <form id="editquotation" className="mb-5 pb-5" onSubmit={this.onSubmitEditEnquiry} action="/" method="post">
                                <h6 className="htext">Availability </h6>
                                <div className="d-flex">
                                    <div className="d-flex">
                                        <div className="field ml-10 position-relative">
                                            <img src={this.state.calendar} className="position-absolute c-top cw-25 " />
                                            <DatePicker
                                                id="calendar"
                                                selected={this.state.startDate}
                                                onChange={this.startDateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="label mt-10 ml-10">To</div>
                                        <div className="field ml-10 position-relative">
                                            <img src={this.state.calendar} className="position-absolute c-top cw-25 " />
                                            <DatePicker
                                                selected={this.state.endDate}
                                                onChange={this.endDateChange}
                                            />
                                            <div className="errorField"></div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex mb-3 alignC mt-20">
                                        <img className="tickMarkimg" src={this.state.fixedSelected} onClick={this.fixedPriceSelected} />
                                        <h5 className="mt-9">Fixed Price </h5>
                                    </div>
                                    <div className="d-flex mb-3 alignC">
                                        <div className="col-5 px-0">Total Fixed Price </div>
                                        <div className="col-5 px-0">
                                            <div className="position-relative">
                                                <input id="totalFixedPrice" type=
                                                    "text" name="totalFixedPrice" value={this.state.quotationForm.totalFixedPrice} onChange={this.handleInputChange} />

                                                <div className="position-absolute pba">$</div>
                                            </div>
                                            <div className="errorField"></div>
                                        </div>
                                    </div>
                                    <div className="my-3">Shipinspectors.com will charge 15% platform fee and Transaction Charges on above quotation </div>
                                    <div className="d-flex mb-3">
                                        <div className="col-5 px-0">Your order will be in US$ </div>
                                        <div className="col-5 px-0">
                                            <div className="position-relative">
                                                <input type="text" id="fixedOrderPriceUS" name="fixedOrderPriceUS" value={this.state.quotationForm.fixedOrderPriceUS} onChange={this.handleInputChange} />
                                                <div className="position-absolute pba">$</div>
                                            </div>
                                            <div>Note:</div>
                                            <div>*  Above quotation is fixed price quotation including expenses except Boat/Launch charges,if any</div>
                                        </div>
                                    </div>

                                    <div className="errorField"></div>
                                </div>
                                <div>
                                    <div className="d-flex mb-3 alignC mt-20">
                                        <img className="tickMarkimg" src={this.state.actualSelected} onClick={this.actualPriceSelected}/>
                                       
                                        <h5 className="mt-9" >Actual Price</h5>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="col-5 d-flex px-0">
                                            <h6 className="htext">Rate </h6>
                                        </div>
                                        <div className="col-5 d-flex px-0 w-100">
                                            <div className="d-flex w-100">
                                                <img id="picon" src={this.state.perHourSelected}   onClick={this.perHourChecked} className="checkbox wh-3 mt-4" />
                                                <label className="l-color" htmlFor="hour">Per Hour</label>
                                            </div>
                                            <div className="d-flex justify-content-end w-100">
                                                <img id="picon" src={this.state.perDaySelected}   onClick={this.perDayChecked} className="checkbox wh-3 mt-4" />
                                                <label className="l-color" htmlFor="day">Per Day</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3 alignC">
                                        <div className="col-5 px-0">Inspection Service Rate</div>
                                        <div className="col-5 px-0">
                                            <div className="position-relative">
                                                <input type="text" id="inspectionServiceRate" name="inspectionServiceRate" value={this.state.quotationForm.inspectionServiceRate} onChange={this.handleInputChange} />
                                                <div className="position-absolute pba">$</div>
                                            </div>
                                            <div className="errorField"></div>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3 alignC">
                                        <div className="col-5 px-0">Travel/Waiting Rate</div>
                                        <div className="col-5 px-0">
                                            <div className="position-relative">
                                                <input id="travelWaitingRate" name="travelWaitingRate" value={this.state.quotationForm.travelWaitingRate} onChange={this.handleInputChange} type="text" />
                                                <div className="position-absolute pba">$</div>
                                            </div>
                                            <div className="errorField"></div>
                                        </div>
                                    </div>

                                    <div className="d-flex mb-3 alignC">
                                        <h6 className="htext">Duration </h6>
                                    </div>
                                    <div className="d-flex mb-3 alignC">
                                        <div className="col-5 px-0">Total Estimated Inspection Service(Hours/Days) </div>
                                        <div className="col-5 px-0">
                                            <div className="position-relative">
                                                <input id="totalEstimatedInspectionServiceRate" name="totalEstimatedInspectionServiceRate" value={this.state.quotationForm.totalEstimatedInspectionServiceRate} onChange={this.handleInputChange} type="text" />
                                                <div className="position-absolute pba">$</div>
                                            </div>
                                            <div className="errorField"></div>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3 alignC">
                                        <div className="col-5 px-0 settext">Total Estimated Service(Hours/Days) </div>
                                        <div className="col-5 px-0">
                                            <input id="totalEstimatedServiceDuration" name="totalEstimatedServiceDuration" value={this.state.quotationForm.totalEstimatedServiceDuration} onChange={this.handleInputChange} type="text" placeholder="Days" />
                                            <div className="errorField"></div>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3 alignC">
                                        <div className="col-5 px-0">Total Estimated Travel/Waiting(Hours/Days) </div>
                                        <div className="col-5 px-0">
                                            <div className="position-relative">
                                                <input id="totalEstimatedTravelWaitingDuration" name="totalEstimatedTravelWaitingDuration" value={this.state.quotationForm.totalEstimatedTravelWaitingDuration} onChange={this.handleInputChange} type="text" />
                                                <div className="position-absolute pba">$</div>
                                            </div>
                                            <div className="errorField"></div>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3 alignC">
                                        <div className="col-5 px-0">Total Estimated Amount US$ </div>
                                        <div className="col-5 px-0">
                                            <div className="position-relative">
                                                <input id="totalEstimatedAmount" name="totalEstimatedAmount" value={this.state.quotationForm.totalEstimatedAmount} onChange={this.handleInputChange} type="text" />
                                                <div className="position-absolute pba">$</div>
                                            </div>
                                            <div className="errorField"></div>
                                        </div>
                                    </div>
                                    <div className="my-3">Shipinspectors.com will charge 15% platform fee and Transaction Charges on above quotation </div>
                                    <div className="d-flex mb-3">
                                        <div className="col-5 px-0">Your order will be in US$ </div>
                                        <div className="col-5 px-0">
                                            <div className="position-relative">
                                                <input id="actualOrderPrice" name="actualOrderPrice" value={this.state.quotationForm.actualOrderPrice} onChange={this.handleInputChange} type="text" />
                                                <div className="position-absolute pba">$</div>
                                            </div>
                                            <div>Note:</div>
                                            <div>*  Above quotation is fixed price quotation including expenses except Boat/Launch charges,if any</div>
                                            <div>*  Above quotation includes Preparation of Reports</div>
                                        </div>
                                    </div>
                                    <div className="errorField"></div>
                                </div>
                                <div>
                                    <h6 className="htext">Payment Terms </h6><br />
                                    <div>Select Payment Terms to Customer</div>
                                    <br />
                                    <div className="d-flex mb-3 alignC">
                                        <img id="picon" src={this.state.payAdvanceSelected}  onClick={this.payAdvanceChecked} 
                                        className="checkbox wh-3 mt-10 " />
                                        <div className="col-5 px-0" htmlFor="js">Advance</div>
                                        <div className="col-5 px-0">
                                            <div className="position-relative">
                                                <input id="paymentAdvance" name="paymentAdvance" value={this.state.quotationForm.paymentAdvance} onChange={this.handleInputChange} type="text" />
                                                <div className="position-absolute pba">%</div>
                                            </div>
                                            <div className="errorField"></div>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <img id="picon" src={this.state.payCreditPeriodSelected} onClick={this.payCreditPeriodChecked}className="checkbox wh-3 mt-6" />
                                        <div className="col-5 px-0" htmlFor="cperiod">Credit Period</div>
                                        <div className="col-5 px-0">
                                            <input id="paymentCreditPeriod" name="paymentCreditPeriod" value={this.state.quotationForm.paymentCreditPeriod} onChange={this.handleInputChange} type="text" placeholder="Days" />
                                            <p>Usually Shipping Customers accepts 30 days Credit Period</p>
                                            <div className="errorField"></div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mr-auto">
                                        <img id="picon" src={this.state.acceptTermsConditionSelected} onClick={this.termsAndConditionsChecked}className="checkbox w-3" />
                                        <label htmlFor="confirmquote">I confirm above quotation and accept Shippinginspectors.com 15% platform charges on above quotation</label>
                                    </div>
                                </div>
                                <div className="mt-10 d-flex justifyC">
                                    <button type="submit" className="btn btn-head btn-filter pl-5 mt-5  ml-10">
                                        SUBMIT QUOTATION
                </button>
                                    <button type="submit" className="btn btn-head btn-draft pl-5 mt-5 ml-10">
                                        SAVE DRAFT
                </button>
                                </div>
                            </form>
                        </div>
                    </List>
                </div>
            </div>
        )
    }
}