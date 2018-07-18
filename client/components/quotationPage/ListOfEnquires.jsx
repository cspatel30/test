import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './Quotation.scss';

export default  class ListOfEnquiries extends Component {
    constructor(props){
        super(props)
        this.state = {
            startDate:'',
            endDate:'',
            calendar:"/public/img/calendar.png"
        };
        this.startDateChange = this.startDateChange.bind(this);
        this.endDateChange = this.endDateChange.bind(this);
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
      datesClear() {
        this.setState({
          startDate: '',
          endDate:''
        });
      }

   
  render() {
    return (
        <div>
            <h5 className="textC f-bold">LIST OF ENQUIRIES</h5>
            <div className="row">
                <div className="container d-flex justifyC mt-10">
                    <div className="d-flex">
                        <div className="label mt-10">From</div>
                        <div className="field ml-10 position-relative">
                            <img src={this.state.calendar} className="position-absolute cl-top cw-32 " />
                            {/* <i className="fa fa-calendar position-absolute p-top fscalender-24"></i> */}
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.startDateChange}
                            />
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="label mt-10 ml-10">To</div>
                        <div className="field ml-10 position-relative">
                            <img src={this.state.calendar} className="position-absolute cl-top cw-32 " />
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.endDateChange}
                            />
                        </div>
                    </div>

                    <div className="viewAttachment d-flex alignC">
                        <button className="btn btn-head btn-filter pl-5  ml-10">
                            FILTER
                        </button>
                        <button className="btn btn-head btn-clear pl-5  ml-10" onClick={this.datesClear.bind(this)}>
                            CLEAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
