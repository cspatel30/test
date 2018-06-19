import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.css';

const Skills=[
    {
        skillName:"Marina casualty investigation"
    },
    {
        skillName:"ISM Audtis"
    },
    {
        skillName:"crude oil washing"
    }
]
export default class SkillsPage extends Component {

  render() {
      return (
        <div className="col-md-12" style={{float: "left", marginBottom: "15px"}}>
          <div className="trapezoid">
              <div className="title mr-auto pl-3">SKILLS</div>
              <div className="rtCorner"></div>
          </div>
          <div className="shadow skill-minheight">
              <div className="d-flex p-3 tags ">
                {
                    Skills.map((skill, key)=>{
                        return <div className="tag d-flex mt-25">
                            <div className="tagBg">
                            </div>
                            <div className="bgTag">{skill.skillName} <span data-role="remove"></span></div>
                        </div>
                    })
                }
              </div>
          </div>
        </div>
      );
  }
}