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
    constructor(props) {
        super(props);
        this.state={
          education:''
        }
      } 
    
      componentWillReceiveProps(props){
        if(props.userDashboard.educations){
            //console.log("userDashboard.."+JSON.stringify(props.userDashboard.educations))
            this.setState({
                education:JSON.stringify(props.userDashboard.educations)
            },()=>{
                //console.log("education education......"+this.state.education)
            })
        }  
      }
  render() {
    var educationData;
      const {education} = this.state
      if(education.length>0){
        //console.log("education 1"+typeof(JSON.parse(education)))
        var educationData = JSON.parse(education)
    }
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



<div>
    <div className="card-body cardbody-border">
        <div className="col-md-12 pl-0 pr-0">
            <div className="d-flex mt-10 alignItems ">
                <div className="col-md-1 pl-0 ml-12">
                    <div className="d-flex alignItems mr-auto">
                        <img id="dicon" src={(inspector.id===this.state.insId) ? this.state.selectInspector: this.state.unchecked} onClick={this.inspectorSelected.bind(this,data.id)} className="checkbox w-75"/>
                    </div>
                </div>
                <div className="col-md-2 pl-0">
                    <div class="slider-circle">
                        <img src="/public/img/user_img.png" className="slider-img"/> 
                        <span className="mt-5 IProfile-page ml-5">{inspector.name}</span>     
                    </div>
                </div>
                <div className="col-md-9 d-flex pr-0 pl-0">
                    <div className="profile-info mr-auto">
                        <div className="post  profile-color fw-bold">{inspector.company}</div>
                        <span>Chief Engineer</span>
                        <div className="stars d-flex">
                            <ReactStars count={5} size={12} color2={ '#ffd700'} />
                            <span >(3)</span>
                        </div>
                        <div >
                            <i className="fa fa-map-marker map-pointer" aria-hidden="true"></i> <span className="i-grey">Houston</span>
                            <span className="i-grey ml-10">USA</span>
                        </div>
                    </div>
                    <div className="enquiry"  data-toggle="buttons">
                        <button type="button" className="btn enquiryButtonNot" > VIEW FULL PROFILE </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 pl-0 pr-0">
                <div className="col-md-9 fr pr-0 text-justify">
                    <span className="fs-12">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy..</span>
                </div>
            </div>
        </div>
    </div>
</div>