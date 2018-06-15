import React, { Component } from 'react';
import ReactStars from 'react-stars';

export default class AreasCovered extends Component {

    render() {
        return (
            <div className="col-md-4 fl">
                <div className="trapezoid">
                    <div className="title mr-auto pl-3">Areas Covered</div>
                    <div className="rtCorner"></div>
                </div>
                <div className="d-flex p-3 tags shadow area-minheight">
                    <table className="table borderless covered">
                        <tbody>
                            <tr>
                                <td>India</td>
                            </tr>
                            <tr>
                                <td>Vienam</td>
                            </tr>
                            <tr>
                                <td>China</td>
                            </tr>
                        </tbody>
                    </table>    
                </div>
           </div>
        );
    }
}