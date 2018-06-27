import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import arrowDown from '../../../images/down-arrow.svg';
import tick from '../../../images/tick.svg';
import archive from '../../../images/archive.svg';

export default class StatusEnquiry extends Component {

    constructor(props) {
      super(props);
  
      this.state = {        
        statusVisible : false
      }        
      this.handleClick = this.handleClick.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    
  handleClick(type){
    const newState = {
      statusVisible : false
    }
    if(type === 'status'){
    if (!this.state.statusVisible) {
        document.addEventListener("click", this.handleOutsideClick, false);
      } else {
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
      this.setState(prevState => ({
        ...newState,
        statusVisible : !prevState.statusVisible,
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
        const {statusVisible} = this.state;
          return(
            <div className="Filter">                         
            <div id="status" className={`Enquirystatus ${statusVisible ? "selected" : ""}`} onClick={() => this.handleClick("status")}>
            <span className="FilterHead">STATUS  <img src={arrowDown} width="12px" height="12px"/></span>            
          
          { statusVisible && (
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={200}
              transitionEnter={false}
              transitionLeave={false}>
              <div className="dropEnquiry">
                <ul className="dropEnquirytitle">
                <li classname="dropEnquirylist">Open</li>
                <li classname="dropEnquirylist">Ordered</li>
                <li classname="dropEnquirylist">Completed</li>
                </ul>
              </div>
            </ReactCSSTransitionGroup>
          )}  
          </div>
            <div className="Enquiryactive"><span className="FilterHead"><img src={tick} width="15px" height="13px"/> ACTIVE</span></div>
            <div className="Enquiryarchieved" ><span className="FilterHead"><img src={archive} width="12px" height="13px"/> ARCHIEVED</span></div>
           
          </div>            
          )
      }
    }
