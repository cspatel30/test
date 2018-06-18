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
            <p style={{color:"#E72C7D",marginBottom:"16px",marginTop:"0px"}}> {'View Breakdown'} </p>             
          
          { breakVisible && (
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <div className="dropdownBreak rTable">
               <div className="rTableRow">
               <div className="rTableHead">ITEMS</div>
               <div className="rTableHead">LUMP SUM</div>
               </div>
               <div className="rTableRow">
                 <div className="rTableCell">Inspection Charges#</div>
                 <div className="rTableCell">$550</div>
                 </div>
               <div className="rTableRow"><div className="rTableCell">Reporting</div><div className="rTableCell">$250</div></div>
               <div className="rTableRow"><div className="rTableCell">{"Travel & Hotel"}</div><div className="rTableCell">$220</div></div>
               <div className="rTableRow"><div className="rTableCell">Agency Charges</div><div className="rTableCell">$50</div></div>
               <div className="rTableRow" style={{borderBottom: "1px solid #ddd"}} ><div className="rTableCell">Other Charges</div><div className="rTableCell">$50</div></div>
               <div className="rTableRow"><div className="rTableCell">Total (Lump Sum)</div><div className="rTableCell" style={{ color: "#1B8CEF",fontWeight: "bold"}}>$1100</div></div>
               <div className="rTableRow"><div className="rTableCell">Remark</div></div>
              </div>
            </ReactCSSTransitionGroup>
          )}  
          </div>                       
          )
      }
    }
