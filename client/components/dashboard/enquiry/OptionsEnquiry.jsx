import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './enquiry.scss';

export default class OptionsEnquiry extends Component {

    constructor(props) {
      super(props);
  
      this.state = {        
        optionsVisible : false
      }        
      this.handleClick = this.handleClick.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    
  handleClick(type){
    const newState = {
        optionsVisible : false
    }
    if(type === 'status'){
    if (!this.state.optionsVisible) {
        document.addEventListener("click", this.handleOutsideClick, false);
      } else {
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
      this.setState(prevState => ({
        ...newState,
        optionsVisible : !prevState.optionsVisible,
      }));
    }
    }
    handleOutsideClick(e) {
        if (this.node !== null) {
          if (this.node.contains(e.target)) {
            return;
          }
        }
    
        this.handleClick();
      }
      render(){
        const {optionsVisible} = this.state;
          return(                                    
            <div id="status" className={`dropstatus ${optionsVisible ? "selected" : ""}`} onClick={() => this.handleClick("status")}>
            <p className="circleEnquiry"> ... </p>             
          
          { optionsVisible && (
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <div className="dropdownEnquiry">
                <ul className="dropEnquirytitle">
                <li classname="dropEnquirylist">Edit</li>
                <li classname="dropEnquirylist">Cancel</li>
                <li classname="dropEnquirylist">View Detail</li>
                </ul>
              </div>
            </ReactCSSTransitionGroup>
          )}  
          </div>                       
          )
      }
    }
