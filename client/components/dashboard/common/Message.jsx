import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import messageimg from '../../../images/message.svg';

export default class Message extends Component {

    constructor(props) {
      super(props);
  
      this.state = {        
        messageVisible : false
      }        
      this.handleClick = this.handleClick.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    
  handleClick(type){
    const newState = {
        messageVisible : false
    }
    if(type === 'msgstatus'){
    if (!this.state.messageVisible) {
        document.addEventListener("click", this.handleOutsideClick, false);
      } else {
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
      this.setState(prevState => ({
        ...newState,
        messageVisible : !prevState.messageVisible,
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
        const {messageVisible} = this.state;
        const {message} = this.props;
          return(                                    
            <div id="status" className={` ${messageVisible ? "selected" : ""}`} onClick={() => this.handleClick("msgstatus")}>
           <p className="message"><img src={messageimg} width="16px" height="16px"/> {message} more</p>          
           { messageVisible && (
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <div className="dropMessage">              
                <img src={messageimg} width="16px" height="16px"/>          
                {message}
              </div>
            </ReactCSSTransitionGroup>
          )}  
          </div>                       
          )
      }
    }
