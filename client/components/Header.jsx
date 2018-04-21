// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { NavLink } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Domain from 'material-ui/svg-icons/social/domain';
import Boat from 'material-ui/svg-icons/maps/directions-boat';
import Dashboard from 'material-ui/svg-icons/action/dashboard';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';


export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handlePopover = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  logoutUser = () => {
  	this.handleClose();
  	this.props.logMeOut();
  }

  getActions(userProfile) {
    var actions = [];
    switch(userProfile.type) {
      case 'customer':
        actions.push(<div key="customer_link_enquiries"><NavLink className="link" to="/my/enquiries/" onClick={this.handleClose}>Quote Enquiries</NavLink></div>);
        actions.push(<div key="customer_link_orders"><NavLink className="link" to="/my/orders/" onClick={this.handleClose}>Orders</NavLink></div>);
        break;
      case 'inspector':
        actions.push(<div key="inspector_link_profile"><NavLink className="link" to="/my/profile/" onClick={this.handleClose}>My Profile</NavLink></div>);
        actions.push(<div key="inspector_link_enquiries"><NavLink className="link" to="/my/enquiries/" onClick={this.handleClose}>Quote Enquiries</NavLink></div>);
        actions.push(<div key="inspector_link_orders"><NavLink className="link" to="/my/orders/" onClick={this.handleClose}>Orders</NavLink></div>);
        break;
    }
    
    return actions;
  }

  renderUserActionSection(userProfile) {
	  if(userProfile) {
  		return (
        <div className="user-actions">
            <div className="desktop-user">
                <div className="desktop-userIconsContainer" onClick={this.handlePopover}>
                        <span className="myntraweb-sprite desktop-iconUser sprites-user"></span>
                        <span className="myntraweb-sprite desktop-caret sprites-caret"></span>
                </div>
            </div>
            <Popover className="account-popup"
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleClose}>
              <div className="profile">
                <div className="desktop-infoTitle">{userProfile.name}</div>
                <div className="desktop-infoEmail">{userProfile.email}</div>
                <div className="line"></div>
                {this.getActions(userProfile)}
                <div className="line"></div>
                <div>
                    <div className="logout" onClick={this.logoutUser}>
                        <span className="link" >Logout</span>
                    </div>
                </div>
              </div>
            </Popover>
      </div>);
    }
  }

  renderLoginRegisterButton(userProfile, login) {
    if(!userProfile) {
      if(login)  
        return (<div className="login"><NavLink className="menu-button" key="link_login" to="/login/">Login</NavLink></div>);
      else 
        return (<div className="register"><NavLink className="menu-button" key="link_register" to="/register/">Sign Up</NavLink></div>);
    }
  }

  renderQuoteButton(userProfile) {
    if(!userProfile || userProfile.type == 'customer') {
      return (
        <div className="quote">
          <NavLink className="quote-link" key="link_quote" to="/enquiry/"><button>Enquire Quotation</button></NavLink>
        </div>
      );
    }
  }

  renderCustomerFreeEnquiryLink(userProfile) {
    if(!userProfile || userProfile.type == 'customer') {
      return (
        <div className="quote">
          <div className="quote-container">
            <NavLink className="quote-link" key="link_quote" to="/enquiry/">Enquire Quotation</NavLink>
          </div>
        </div>
      );
    }
  }

  render() {

    const { logout, userProfile } = this.props;

    if(logout) {
  		alert("You have been logged out successfully");
  		window.location = "/";
  	}

	  return (
      <div className="header">
        <div className="left-section">
          <div className="logo-image">
            <a href="/"><img alt="SinoTechMarine" src="https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/sinotech-logo.png" width="200" height="100"/></a>
          </div>
          <div className="clear"></div>
        </div>
        <div className="right-section">
          <div className="login-section">
              {this.renderLoginRegisterButton(userProfile, true)}
              {this.renderLoginRegisterButton(userProfile, false)}
              {this.renderQuoteButton(userProfile)}
              {this.renderUserActionSection(userProfile)}
              <div className="clear"></div>
          </div>
          
          <div className="menu-section">
            <div id="box"></div>
            <ul>
              <li><NavLink className="menu-link" key="link_home" to="/">Home</NavLink></li>
              <li><NavLink className="menu-link" key="link_inspectors" to="/inspectors/">Inspectors</NavLink></li>
              <li><NavLink className="menu-link" key="link_news" to="http://www.sinotechmarine.com/news/" target="_blank">News</NavLink></li>
              <li><NavLink className="menu-link" key="link_reports" to="/reports/">Sample Reports</NavLink></li>
              <li><NavLink className="menu-link" key="link_about" to="/about/">About Us</NavLink></li>
              <li><NavLink className="menu-link" key="link_contact" to="/contact/">Contact Us</NavLink></li>
            </ul>
            <div className="clear"></div>
          </div>
  
        </div>
        <div className="clear"></div>
  	  </div>
    );

  }

}