// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default class AboutPage extends Component {

  render() {
	return (
          <div className="page">
          	<h1>About Us</h1>
          	<h3> (ISO 9001:2015 Certified) </h3>
               <p>We are Maritime Industry Experts come from a strong background of Ship Technical Management.  We bring extensive Industry Knowledge and Experience that enable us to offer you a high quality Independent Marine Technical Consulting Service globally with fast turn around and decisive online reporting.  Our value for money analysis, advice, recommendations, cost saving strategies and strong monitoring and due diligence on condition of your shipping assets minimize your financial and operational risks to unlock your potential for long term business growth.
                  <br/>
                  Our customers focused approach and 100 % commitment to delivery of quality service make us value partner to meet your needs for Independent Marine Consulting and Technology Services.</p>

          	<h1>Vision</h1>
          	<p>
                 We at SINOTECH Marine have vision to provide an efficient and decisive consulting service organizations or bodies investing in the global maritime capital market to secure their investment.
                 <br/>
                 We have vision to solve Industry problems by innovating Technology oriented solutions to reduce operational costs and compliance risks to ensure sustainable business growth of our customers.
          	</p>

               <h1>Mission</h1>
               <p>
                  Our mission is to be an outstanding Marine services provider who aspires to innovate and deliver services and solutions with the highest degree of satisfaction to the customers. We are committed to reduction of cost in the value chain, standardization of quality & pricing of services  globally to bring more values to the business profile of our customers.
               </p>

               <h1>Values</h1>
               <p>
                 <h3>Our People is our strength</h3>
                 We value our people and their capabilities, efforts and commitments as our primary assets. We strive to provide satisfying growth opportunities to our employees in a safe and healthy working environment.

                 <h3>Reliability</h3>
                 We only make realistic commitments and make strategic and value partnership with our customers to support their business long term business growth.

                 <h3>Integrity</h3>
                 SINOTECH Marine is driven by high ethical standards. We maintain the highest level of integrity and fairness with our consultant associates, suppliers, employees and customers.

                 <h3>Quality</h3>
                 We are 100% committed to the highest standard of the service quality. We pursue excellence in all that we do and strive for customer satisfaction by delivering services even under adverse conditions and strict timeframe and budget.
               </p>

          </div>
      );
  }
}