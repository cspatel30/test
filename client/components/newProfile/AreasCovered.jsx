import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.scss';

export default class AreasCovered extends Component {
    constructor(props) {
        super(props);
        this.state={
            areasCovered:[]
        }
      } 
    
      componentWillReceiveProps(props){
        if(props.userDashboard.coveredArea){
            var areaspilt = props.userDashboard.coveredArea.split(",");
            this.setState({
                areasCovered:areaspilt
            })
        }  
      }
    render() {
        if(this.state.areasCovered){
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
                                this.state.areasCovered.map((country, key)=>{
                                    return <tr>
                                        <td>{country}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>    
                </div>
           </div>
            );
        }
        else{
            return <h6>Loading...</h6>
        }
    }
}