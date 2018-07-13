import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.scss';

export default class EducationQualificationPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            educationData:[]
        }
      } 
    
      componentWillReceiveProps(props){
        if(props.userDashboard.educations){
            this.setState({
                educationData:props.userDashboard.educations
            })
        }  
      }
  render() {
      const {educationData} = this.state
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
                                educationData && educationData.length>0 ? 
                                educationData.map((qualification, key)=>{
                                    return <tr>
                                        <td>{qualification.level}</td>
                                        <td>{qualification.courseName}</td>
                                        <td>{qualification.institution}</td>
                                        <td>{qualification.startDate}-{qualification.endDate}</td>
                                    </tr>
                                }):""
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
     }
    
}