import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import arrowDown from '../../images/down-arrow.svg';
import tick from '../../images/tick.svg';
import archive from '../../images/archive.svg';
import calendar from '../../images/calendar.svg';
import DateTime from 'react-datetime';

let yesterday = DateTime.moment().subtract(1, 'day');
export default class StatusOrder extends Component {

    constructor(props) {
      super(props);
  
      this.state = {        
        statusVisible : false,
        dateVisible : false
      }        
      this.handleClick = this.handleClick.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    
  handleClick(type){
    const newState = {
      statusVisible : false,
      dateVisible : false
    }
    if(type === 'status'){
    if (!this.state.statusVisible) {
        document.addEventListener("click", this.handleOutsideClick, false);
      } else {
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
     
      this.setState(prevState => ({
        ...newState,
        statusVisible : !prevState.statusVisible       
      }));
    }
    if(type == 'statusdate'){
    if (!this.state.dateVisible) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState(prevState => ({
      ...newState,
      dateVisible : !prevState.dateVisible      
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

      isValidDate = (date) => {
        return date.isAfter( yesterday );
     }
     handleEndTimeChange = (date) => {
      this.setState((state) => {  });
    }
      render(){
        const {statusVisible,dateVisible} = this.state;
          return(
            <div className="Filter">                        
            
          <div id="status" className={`Enquirystatus ${statusVisible ? "selected" : ""}`} onClick={() => this.handleClick("status")}>
            <span className="FilterHead">STATUS <img src={arrowDown} width="11px" height="7px"/></span>            
          
          { statusVisible && (
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <div className="dropEnquiry">
                <ul className="dropEnquirytitle">
                <li classname="dropEnquirylist">Completed</li>
                <li classname="dropEnquirylist">In progress</li>
                <li classname="dropEnquirylist">Planned</li>
                <li classname="dropEnquirylist">Cancelled</li>
                <li classname="dropEnquirylist">Invoiced</li>
                </ul>
              </div>
            </ReactCSSTransitionGroup>
          )}  
          </div>
          <div id="status" className={`Enquirystatus ${dateVisible ? "selected" : ""}`} onClick={() => this.handleClick("statusdate")}>
            <span className="FilterHead">DATE <img src={arrowDown} width="11px" height="7px"/></span>            
          
          { dateVisible && (
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <div className="dropEnquiry">
                <ul className="dropEnquirytitle">
                <li classname="dropEnquirylist">From{/* <DateTime  dateFormat={"YYYY-MM-DD"} 
                    timeFormat={"HH:mm"}  onChange={this.handleEndTimeChange} closeOnTab={false}
          closeOnSelect={true}  isValidDate={ this.isValidDate } disabled={yesterday}/>*/}
                   <img src={calendar} width="17px" height="18px"/></li>
                <li classname="dropEnquirylist">To {/*<DateTime  dateFormat={"YYYY-MM-DD"} 
                    timeFormat={"HH:mm"} onChange={this.handleEndTimeChange} closeOnTab={false}
        closeOnSelect={true}  isValidDate={ this.isValidDate } disabled={yesterday}/>*/}
                    <img src={calendar} width="17px" height="18px"/></li>                
                </ul>
              </div>
            </ReactCSSTransitionGroup>
          )}  
          </div>
            <div className="Enquiryactive"><span className="FilterHead"><img src={tick} width="15px" height="12px"/>ACTIVE</span></div>
            <div className="Enquiryarchieved" ><span className="FilterHead"><img src={archive} width="11px" height="13px"/>ARCHIEVED</span></div>
           
          </div>            
          )
      }
    }
