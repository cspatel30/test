// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { NavLink } from 'react-router-dom';

export default class HomeFooter extends Component {

  render() {
    return (
        <div className="home-footer">
        	<div className="subscription">
            <div className="title">Subscribe For Newsletter</div>
            <form>
              <div className="inputField"><input type="text" placeholder="Name*" name="name" value=""/></div>
              <div className="inputField"><input type="text" placeholder="Email*" name="email" value=""/></div>
              <button>Subscribe</button>
            </form>
          </div>
          <div className="navigation">
            <div className="title">Navigation</div>
            <div className="nav-link"><NavLink key="link_home" to="/">Home</NavLink></div>
            <div className="nav-link"><NavLink key="link_about" to="/about/">About Us</NavLink></div>
            <div className="nav-link"><NavLink key="link_inspectors" to="/inspectors/">Inspectors</NavLink></div>
            <div className="nav-link"><NavLink key="link_reports" to="/reports/">Online Reports</NavLink></div>
            <div className="nav-link"><NavLink key="link_cases" to="http://www.sinotechmarine.com/case-studies/">Case Studies</NavLink></div>
            <div className="nav-link"><NavLink key="link_contact" to="/contact/">Contact Us</NavLink></div>
            
          </div>
          <div className="quick-links">
            <div className="title">Quick Links</div>
            <div className="nav-link"><NavLink key="link_register_customer" to="/register/">Client Registration</NavLink></div>
            <div className="nav-link"><NavLink key="link_register_si" to="/register/">Inspector Registration</NavLink></div>
            <div className="nav-link"><NavLink key="link_enquiry" to="/enquiry/">Post Inspection Enquiry</NavLink></div>
            <div className="nav-link"><NavLink key="link_news" to="http://www.sinotechmarine.com/news/" target="_blank">Industry News</NavLink></div>
          </div>
          <div className="pay-online">
            <div className="title">Pay Online</div>
            <div className="payment-options">
              <img src="https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/payonline.png" width="180" height="30"/>
            </div>            

            <div className="title">Get Social</div>
            
            <a target="_blank" href="https://twitter.com/sinotech" style={{marginRight: 10}}>
              <img src="https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/twitter-logo.png" width="30px" height="30px" alt="Twitter logo"/>
            </a>
            
            <a target="_blank" href="https://www.linkedin.com/in/sinotech/" style={{marginRight: 10}}>
              <img src="https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/public/linkedin-logo.png" width="30px" height="30px" alt="Linkedin logo"/>
            </a>
            
          </div>
        </div> 
    );
  }
}