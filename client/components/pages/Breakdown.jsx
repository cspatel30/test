import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class Breakdown extends Component {

    constructor(props) {
      super(props);
  
      this.state = {        
        breakVisible : false
      }        
      this.handleClick = this.handleClick.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    
  handleClick(type){
    const newState = {
        breakVisible : false
    }
    if(type === 'status'){
    if (!this.state.breakVisible) {
        document.addEventListener("click", this.handleOutsideClick, false);
      } else {
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
      this.setState(prevState => ({
        ...newState,
        breakVisible : !prevState.breakVisible,
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
        const {breakVisible} = this.state;
          return(                                    
            <div id="status" className={`dropstatus ${breakVisible ? "selected" : ""}`} onClick={() => this.handleClick("status")}>
            <p style={{color:"#E72C7D",marginBottom:"16px"}}> {'View Breakdown'} </p>             
          
          { breakVisible && (
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <div className="dropdownBreak">
               <div><span>ITEMS</span><span>LUMP SUM</span></div>
               <div><span>Inspection Charges #</span><span>$550</span></div>
               <div><span>Reporting</span><span>$250</span></div>
               <div><span>{"Travel & Hotel"}</span><span>$220</span></div>
               <div><span>Agency Charges</span><span>$50</span></div>
               <div><span>Other Charges</span><span>$50</span></div>
               <div><span>Total (Lump Sum)</span><span>$1100</span></div>
               <div><span>Remark</span></div>
              </div>
            </ReactCSSTransitionGroup>
          )}  
          </div>                       
          )
      }
    }
