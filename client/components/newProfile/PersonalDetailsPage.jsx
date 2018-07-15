import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.scss';


export default class PersonalDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state={
          personalDetails:''
        }
      } 
    
      componentWillReceiveProps(props){
        if(props){
            this.setState({
                personalDetails:props.userDashboard
            })
        }  
        //console.log("personal"+JSON.stringify(props))
      }
    

    render() {
        const {personalDetails}=this.state
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
                                <td>{personalDetails.passportName}</td>
                            </tr>
                            <tr>
                                <th className="fw-500">Nationality</th>
                                <td>{personalDetails.nationality}</td>
                            </tr>
                            <tr>
                                <th className="fw-500">Passport Number</th>
                                <td>{personalDetails.passport}</td>
                            </tr>
                            <tr>
                                <th className="fw-500">Date of Birth</th>
                                <td>{personalDetails.dob}</td>
                            </tr>
                            <tr>
                                <th className="fw-500">Nearest Airport</th>
                                <td>{personalDetails.nearestAirport}</td>
                            </tr>
                            <tr>
                                <th className="fw-500">Valid Visas</th>
                                <td>{personalDetails.validVis}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}