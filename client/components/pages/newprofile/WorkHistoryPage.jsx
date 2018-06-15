import React, { Component } from 'react';
import ReactStars from 'react-stars';

export default class EmployeeHistoryPage extends Component {

  render() {
	return (
        <div className="col-md-12 fl mb-15">
            <div className="trapezoid">
                <div className="title mr-auto pl-3">Work History and Client's Feedback</div>
                <div className="rtCorner"></div>
            </div>
            <div className=" d-flex p-3 tags shadow">
                <table className="table mb-0">
                    <tbody>
                        <tr>
                            <th className="b-0">
                                <span className="table-font-color">Pre-purchase Inspection of Bulk Carrier</span><br/>
                                <span className="fs-12 fw-normal icon_grey"><i className="fa fa-1x fa-map-marker p-top-mapIcon" ></i> Hanoi Vietanam</span><br/>
                                <span className="fs-12 fw-normal icon_grey"><i className="fa fa fa-1x fa-clock-o p-top-clockIcon" ></i> 08-Aug-2018 - 18-Aug-2018</span>
                            </th>
                            <td className="b-0">
                                <ReactStars count={5} size={15} color2={ '#ffd700'} />
                                <span></span><br/>
                                <span className="ml-8"> Good Job! </span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <span className="table-font-color">Pre-purchase Inspection of Bulk Carrier</span><br/>
                                <span className="fs-12 fw-normal icon_grey"><i className="fa fa-1x fa-map-marker p-top-mapIcon" ></i> Hanoi Vietanam</span><br/>
                                <span className="fs-12 fw-normal icon_grey"><i className="fa fa fa-1x fa-clock-o p-top-clockIcon" ></i> 08-Aug-2018 - 18-Aug-2018</span>
                            </th>
                            <td>
                                <ReactStars count={5} size={15} color2={ '#ffd700'} />
                                <span></span><br/>
                                <span className="ml-8"> Good Job! </span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <span className="table-font-color">Pre-purchase Inspection of Bulk Carrier</span><br/>
                                <span className="fs-12 fw-normal icon_grey"><i className="fa fa-1x fa-map-marker p-top-mapIcon" ></i> Hanoi Vietanam</span><br/>
                                <span className="fs-12 fw-normal icon_grey"><i className="fa fa fa-1x fa-clock-o p-top-clockIcon" ></i> 08-Aug-2018 - 18-Aug-2018</span>
                            </th>
                            <td>
                                <ReactStars count={5} size={15} color2={ '#ffd700'} />
                                <span></span><br/>
                                <span className="ml-8"> Good Job! </span>
                            </td>
                        </tr>
                        <tr>
                            <th style={{ "font-weight": "normal",color: "#eb599c"}}> View more</th>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
}