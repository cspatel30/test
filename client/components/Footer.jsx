
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
	      <div className="footer-section">
	        <div className="left">
	            Copyright © 2018 sinotechmarine.com & shipinspectors.com All Rights Reserved
	        </div>

	        <div className="right">
	        	<div className="footer-item"><NavLink key="link_tc" to="/terms/">Terms & Conditions</NavLink></div>
	        	<div className="footer-item"><div className="vertical-divider">&nbsp;</div></div>
	        	<div className="footer-item"><NavLink key="link_policy" to="/policy/">Privacy Policy</NavLink></div>
	        	<div className="clear"></div>
	        </div>
	        <div className="clear"></div>
	      </div>
      </div>
    );
  }
}