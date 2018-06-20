import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './InspectorDashboard.scss';


let profiles_data=[
    {
        id:1,
        profile_name:"Jenette K",
        company:"Marine Engineer Consultant",
        designation:"Chief Engineer",
        location:"Houston",
        country:"USA",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.."
    },
    {
        id:2,
        profile_name:"Jenette K",
        company:"Marine Engineer Consultant",
        designation:"Chief Engineer",
        location:"Houston",
        country:"USA",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.."
    },
    {
        id:3,
        profile_name:"Jenette K",
        company:"Marine Engineer Consultant",
        designation:"Chief Engineer",
        location:"Houston",
        country:"USA",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.."
    },
    {
        id:4,
        profile_name:"Jenette K",
        company:"Marine Engineer Consultant",
        designation:"Chief Engineer",
        location:"Houston",
        country:"USA",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.."
    },
    {
        id:5,
        profile_name:"Jenette K",
        company:"Marine Engineer Consultant",
        designation:"Chief Engineer",
        location:"Houston",
        country:"USA",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.."
    },
    {
        id:6,
        profile_name:"Jenette K",
        company:"Marine Engineer Consultant",
        designation:"Chief Engineer",
        location:"Houston",
        country:"USA",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.."
    }
]

export default class InspectorProfilesPage extends Component {
    constructor(props){
        super(props);
        this.state={
            checked:"/public/img/check-square.png",
            unchecked:"/public/img/unchecked.png",
            selectInspector:"/public/img/unchecked.png",
            insId:''
        }
    }

    inspectorSelected(id){
        alert("testing..."+JSON.stringify(id))
        if(id){
            this.setState({
                selectInspector:this.state.checked,
                insId:id
            })
           
        }
    }

   
  render() {
        return (
            <div className="card">
            <div className="card-header card-header-styles d-flex alignItems ch-minheight pl-8 pr-0">
            <div className="d-flex alignItems mr-auto pt-10">
            <img id="picon" onClick={this.inspectorSelected.bind(this)} src={this.state.selectInspector} className="checkbox w-21 "/>
            <label className="designation"  htmlFor="checkbox">Clear all selected</label>
            </div>
              <div className="col-md-3 mr-auto"  data-toggle="buttons">
                 <span className="fs-14"> RESULTS(24) </span>
              </div>
              <div className="mr-auto  mr-10"  data-toggle="buttons">
              <button type="button" className="btn enquiryButton mr-10" > ADD TO ENQUIRY </button>
              </div>
            </div>
            {
                profiles_data.map((data, key)=>{
                    return <div>
                        <div className="card-body cardbody-border">
                    <div className="col-md-12 pl-0 pr-0">
                    <div className="d-flex mt-10 alignItems ">
                    <div className="col-md-1 pl-0">
                        <div className="d-flex alignItems mr-auto">
                        <img id="dicon" src={(data.id===this.state.insId) ? this.state.selectInspector: this.state.unchecked} onClick={this.inspectorSelected.bind(this,data.id)} className="checkbox w-100"/>
                        </div>
                    </div>
                    <div className="col-md-2 pl-0">
                        <div class="slider-circle">
                            <img src="/public/img/user_img.png" className="slider-img"/> 
                            <span className="mt-5 IProfile-page">{data.profile_name}</span>     
                        </div>
                    </div>
                    <div className="col-md-9 d-flex pr-0">
                        <div className="profile-info mr-auto">
                            <div className="post  profile-color fw-500">{data.company}</div>
                                <span className="designation">{data.designation}</span>
                                <div className="stars d-flex">
                        <ReactStars count={5} size={12} color2={ '#ffd700'} />
                        <span >(3)</span>
                    </div>
                                <div ><i className="fa fa-map-marker map-pointer" aria-hidden="true"></i> <span className="i-grey">{data.location}</span>
                                  <span className="i-grey ml-10">{data.country}</span>
                               </div>
                         </div>
                         <div className="enquiry"  data-toggle="buttons">
                         <button type="button" className="btn enquiryButtonNot" > VIEW FULL PROFILE </button>
                         </div>
                        </div>
                    </div>
                    <div className="col-md-12 pl-0 pr-0">
                        <div className="col-md-9 fr">
                                <span className="fs-12">{data.description}</span>
                         </div>
                        </div>
                </div>
               
                    </div>
                   
                    </div>
                })
            }
            <div className="card-footer bg-white">
            <ul className="pagination fr">
                 <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                    <span className="redColor" aria-hidden="true">&laquo;</span>
                    <span  className="sr-only bgcolor">Previous</span>
                    </a>
                 </li>
                 <li className="page-item "><a className="page-link " href="#">1</a></li>
                 <li className="page-item"><a className="page-link" href="#">2</a></li>
                 <li className="page-item"><a className="page-link" href="#">3</a></li>
                 <li className="page-item"><a className="page-link" href="#">4</a></li>
                 <li className="page-item"><a className="page-link" href="#">5</a></li>
                 <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                    <span  className="redColor" aria-hidden="true">&raquo;</span>
                    <span className="sr-only bgcolor">Next</span>
                    </a>
                 </li>
              </ul>
            </div>
        </div>
        );
    }
}
