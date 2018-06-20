import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.scss';

const Qualifications =[
    {
        level:"Graduate",
        courseName:"Master Marine License",
        institution:"",
        fromTo:""
    },
    {
        level:"Diploma",
        courseName:"Chief Engineer License",
        institution:"",
        fromTo:""
    }
]
export default class EducationQualificationPage extends Component {

  render() {
        return (
            <div className="col-md-12 fl mb-15">
                <div className="trapezoid">
                    <div className="title mr-auto pl-3">Education and Professional Qualifications</div>
                    <div className="rtCorner"></div>
                </div>
                <div className="d-flex p-3 tags shadow epq-minheight">
                    <table className="table borderless">
                        <tbody>
                            <tr>
                                <th className="fw-500">Level</th>
                                <th className="fw-500">Course Name</th>
                                <th className="fw-500">Institution</th>
                                <th className="fw-500">From-To</th>
                            </tr>
                            {
                                Qualifications.map((qualification, key)=>{
                                    return <tr>
                                        <td>{qualification.level}</td>
                                        <td>{qualification.courseName}</td>
                                        <td>{qualification.institution}</td>
                                        <td>{qualification.fromTo}</td>
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