import React, { Component } from 'react';
import ReactStars from 'react-stars';

export default class DocumentsPage extends Component {

  render() {
	return (
          <div className="col-md-8 fr">
                <div className="trapezoid">
                    <div className="title mr-auto pl-3">
                        <span>Document Name</span>
                        <span className="exp_align">Expiry</span>
                        <span>File Attachment</span>
                    </div>
                    <div className="rtCorner"></div>
                </div>
                <div className="d-flex p-3 tags shadow doc-minheight">
                    <table className="table borderless">
                        <tbody>
                            <tr>
                                <td>Passport</td>
                                <td className="pl-0">29-07-2018</td>
                                <td className="pl-0 p-top-edit">View Document</td>
                            </tr>
                            <tr>
                                <td>Medical Insurance</td>
                                <td className="pl-0">29-07-2018</td>
                                <td className="pl-0">
                                    <div className="progress progress_align">
                                        <div className="progress-bar pink_background w-100" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Medical Fitness Certificate</td>
                                <td className="pl-0">29-07-2018</td>
                                <td className="pl-0">
                                    <div className="progress progress_align">
                                        <div className="progress-bar pink_background w-100" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Sea ferers Identity Book</td>
                                <td className="pl-0">29-07-2018</td>
                                <td className="pl-0">
                                    <div className="progress progress_align">
                                        <div className="progress-bar pink_background w-100" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Professional Indeminity Insurance</td>
                                <td className="pl-0">29-07-2018</td>
                                <td className="pl-0">
                                    <div className="progress progress_align">
                                        <div className="progress-bar pink_background w-100" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Qualification Document</td>
                                <td className="pl-0">29-07-2018</td>
                                <td className="pl-0 p-top-edit">View Document</td>
                            </tr>
                            <tr>
                                <td>Competency Document</td>
                                <td className="pl-0">29-07-2018</td>
                                <td className="pl-0">
                                    <div className="progress progress_align">
                                        <div className="progress-bar pink_background w-100" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}