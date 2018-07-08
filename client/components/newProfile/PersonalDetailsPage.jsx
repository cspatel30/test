import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.scss';


export default class PersonalDetailsPage extends Component {

    render() {
        return (
            <div className="col-md-12 fl mb-15">
                <div className="trapezoid">
                    <div className="title mr-auto pl-3">Personal Details</div>
                    <div className="rtCorner"></div>
                </div>
                <div className="d-flex p-3 tags shadow pd-minheight">
                    <table className="table borderless">
                        <tbody>
                            <tr>
                                <th className="fw-500">Name as per Passport</th>
                                <td>Lavania Ragvendra</td>
                            </tr>
                            <tr>
                                <th className="fw-500">Nationality</th>
                                <td>Indian</td>
                            </tr>
                            <tr>
                                <th className="fw-500">Passport Number</th>
                                <td>Z2226781</td>
                            </tr>
                            <tr>
                                <th className="fw-500">Date of Birth</th>
                                <td>Jul 4th 1979</td>
                            </tr>
                            <tr>
                                <th className="fw-500">Nearest Airport</th>
                                <td>Hong Kong</td>
                            </tr>
                            <tr>
                                <th className="fw-500">Valid Visas</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}