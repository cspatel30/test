import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.scss';

export default class EmployeeHistoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employmentHistory: []
        }
    }

    componentWillReceiveProps(props) {
        if (props.userDashboard.employments) {
            this.setState({
                employmentHistory: props.userDashboard.employments
            })
        }
    }
    render() {
        return (
            <div className="col-md-12 fl mb-15">
                <div className="trapezoid">
                    <div className="title mr-auto pl-3 emp-history-minheight">Employeement History</div>
                    <div className="rtCorner"></div>
                </div>
                <div className="d-flex p-3 tags shadow">
                        <table className="table borderless">
                             {
                            this.state.employmentHistory && this.state.employmentHistory.length > 0 ?
                            this.state.employmentHistory.map((employee,key) => {
                             return  <tbody>
                                        <tr>
                                            <th className="fw-500">Position    </th>
                                            <td>{employee.jobTitle}</td>
                                        </tr>
                                        <tr>
                                            <th className="fw-500">Company Name</th>
                                            <td>{employee.companyName}</td>
                                        </tr>
                                        <tr>
                                            <th className="fw-500">Country</th>
                                            <td>{employee.country}</td>
                                        </tr>
                                        <tr>
                                            <th className="fw-500">From</th>
                                            <td>{employee.startDate}</td>
                                        </tr>
                                        <tr>
                                            <th className="fw-500">To</th>
                                            <td>{employee.endDate}</td>
                                        </tr>
                                    </tbody>
                                    }):""
                                }
                         </table>
                </div>
            </div>
        );
    }
}