import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './ManagePage.scss';

export default  class ListOfEnquiries extends Component {
    constructor(props){
        super(props)
        this.state = {
        startDate:'',
        endDate:''
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
            <h5 className="textC">LIST OF ENQUIRIES</h5>
      <div className="row">
      <div className="container d-flex mt-10">
        <div className="d-flex">
            <div className="label mt-10">From</div>
            <div className="field ml-10 position-relative">
            <i className="fa fa-calendar position-absolute p-top" style={{"font-size":"24"}}></i>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.startDateChange}
                />
            </div>
        </div>
        <div className="d-flex">
            <div className="label mt-10 ml-10">To</div>
            <div className="field ml-10 position-relative">
            <i className="fa fa-calendar position-absolute p-top" style={{"font-size":"24"}}></i>
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.endDateChange}
                    />
            </div>
        </div>
           
        <div className="viewAttachment d-flex">
        <button className="btn btn-head btn-filter pl-5 mt-5 ml-10">
            FILTER
        </button>
        <button className="btn btn-head btn-clear pl-5 mt-5 ml-10" onClick={this.datesClear.bind(this)}>
            CLEAR
        </button>
        </div>
        </div>
        </div>
        </div>
    );
  }
}
