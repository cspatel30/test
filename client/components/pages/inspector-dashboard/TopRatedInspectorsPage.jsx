import React, { Component } from 'react';
import ReactStars from 'react-stars';

const TopRated =[
    {
        company: "Marine Engineer Consultant",
        designation: "Chief Engineer"
    },
    {
        company: "Marine Engineer Consultant",
        designation: "Chief Engineer"
    },
    {
        company: "Marine Engineer Consultant",
        designation: "Chief Engineer"
    }
]
export default class TopRatedInspectorsPage extends Component {
  
    render() {
        return (
            <div className="col-md-12 pl-0 pr-0">
                <span>TOP RATED INSPECTORS</span>
                {
                    TopRated.map((data, key)=>{
                        return <div className="d-flex mt-10 IProfile-page" >
                            <div className="col-md-3 pl-0">
                                <div class="slider-circle">
                                    <img src="/public/img/user_img.png" className="slider-img"/>      
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div>
                                    <div className="toprated">{data.company}</div>
                                    <div className="designation">{data.designation}</div>
                                    <div className="stars d-flex">
                                        <ReactStars count={5} size={12} color2={ '#ffd700'} />
                                        <span className="ratingcount">(3)</span>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    })
                }
        </div>
        );
      }
}