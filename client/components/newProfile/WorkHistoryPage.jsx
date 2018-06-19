import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.css';

const WorkHistory =[
    {
        description:"Pre-purchase Inspection of Bulk Carrier",
        location:" Hanoi Vietanam",
        fromTo: "08-Aug-2018 - 18-Aug-2018"
    },
    {
        description:"Pre-purchase Inspection of Bulk Carrier",
        location:" Hanoi Vietanam",
        fromTo: "08-Aug-2018 - 18-Aug-2018"
    },
    {
        description:"Pre-purchase Inspection of Bulk Carrier",
        location:" Hanoi Vietanam",
        fromTo: "08-Aug-2018 - 18-Aug-2018"
    }
]
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
                        {
                            WorkHistory.map((history, key)=>{
                                return <tr>
                                    <th className="b-0">
                                        <span className="table-font-color">{history.description}</span><br/>
                                        <span className="fs-12 fw-normal icon_grey"><i className="fa fa-1x fa-map-marker p-top-mapIcon" ></i>{history.location}</span><br/>
                                        <span className="fs-12 fw-normal icon_grey"><i className="fa fa fa-1x fa-clock-o p-top-clockIcon" ></i> {history.fromTo}</span>
                                    </th>
                                    <td className="b-0">
                                        <ReactStars count={5} size={15} color2={ '#ffd700'} />
                                        <span></span><br/>
                                        <span className="ml-8"> Good Job! </span>
                                    </td>
                                </tr>
                            })
                        }
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