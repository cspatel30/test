import React, { Component } from 'react';
import ReactStars from 'react-stars';


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
                  <div className="tag d-flex mt-25">
                      <div className="tagBg">
                      </div>
                      <div className="bgTag">Marina casualty investigation <span data-role="remove"></span></div>
                  </div>
                  <div className="tag d-flex">
                      <div className="tagBg">
                      </div>
                      <div className="bgTag">ISM Audtis <span data-role="remove"></span></div>
                  </div>
                  <div className="tag d-flex">
                      <div className="tagBg">
                      </div>
                      <div className="bgTag">crude oil washing<span data-role="remove"></span></div>
                  </div>
              </div>
          </div>
        </div>
      );
  }
}