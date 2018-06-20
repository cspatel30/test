import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.scss';

const Areas=[
    {
        countryName:"India"
    },
    {
        countryName:"Vienam"
    },
    {
        countryName:"China"
    }
]
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
                            {
                                Areas.map((country, key)=>{
                                    return <tr>
                                        <td>{country.countryName}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>    
                </div>
           </div>
        );
    }
}