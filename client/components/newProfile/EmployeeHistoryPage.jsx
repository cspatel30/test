import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.scss';

export default class EmployeeHistoryPage extends Component {

  render() {
	return (
        <div className="col-md-12 fl mb-15">
            <div className="trapezoid">
                <div className="title mr-auto pl-3 emp-history-minheight">Employeement History</div>
                <div className="rtCorner"></div>
            </div>
            <div className="d-flex p-3 tags shadow">
                <table className="table borderless">
                    <tbody>
                        <tr>
                        <th className="fw-500">Position    </th>
                        <td>Pre-Purchase Condition Inspector</td>
                        </tr>
                        <tr>
                        <th className="fw-500">Company Name</th>
                        <td>Sinotech Marine</td>
                        </tr>
                        <tr>
                        <th className="fw-500">Country</th>
                        <td>HK</td>
                        </tr>
                        <tr>
                        <th className="fw-500">From</th>
                        <td></td>
                        </tr>
                        <tr>
                        <th className="fw-500">To</th>
                        <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      );
  }
}