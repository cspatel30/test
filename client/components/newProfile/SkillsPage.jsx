import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './newProfile.scss';

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
    constructor(props) {
        super(props);
        this.state={
          skills:''
        }
      } 
    
      componentWillReceiveProps(props){
        if(props){
            // this.setState({
            //     skills:props.userDashboard
            // })
            var skillspilt = props.userDashboard.skills.split(",");
             this.setState({
                skills:skillspilt
            })
        }  
        // console.log("skills"+JSON.stringify(props.userDashboard))
        // console.log("skills22"+JSON.stringify(props.userDashboard.skills))
        // console.log("skills33"+JSON.stringify(Skills))
      }
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