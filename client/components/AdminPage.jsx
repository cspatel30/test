// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { NavLink } from 'react-router-dom';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import {List, ListItem} from 'material-ui/List';

import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {green500, red500, blue500, yellow600, orange600, fullWhite} from 'material-ui/styles/colors';


import AdminEnquiryContainer from '../containers/AdminEnquiryContainer.js';
import AdminAssignInspectorContainer from '../containers/AdminAssignInspectorContainer.js';
import AdminOrderContainer from '../containers/AdminOrderContainer.js';
const styles = {
  listItem: {
    selected: {
      backgroundColor: '#ccc'
    },
    unselected: {
      backgroundColor: '#fff'
    }
  }
};

export default class AdminPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedSectionName: "enquiry",
      loginForm: {
        email: "",
        password: ""
      },
      loginFormError: {
        email: "",
        password: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getListItemStyle = this.getListItemStyle.bind(this);
    this.renderSection = this.renderSection.bind(this);
  }

  handleInputChange (event) {
    event.persist();
    this.setState((state) => { state.loginForm[event.target.name] = event.target.value });
  }

  handleSubmit(event) {

    event.preventDefault();

    var error = false;

    var loginFormError = {  email: "", password: "" };

    if(this.state.loginForm.email == "") {
      error = true;
      loginFormError.email = "This field is mandatory";
    }

    if(this.state.loginForm.password == "") {
      loginFormError.password = "This field is mandatory";
      error = true;
    }

    this.setState( (state) => { state.loginFormError = loginFormError});

    if(error) 
      return;

    this.props.logMeIn(this.state.loginForm);

  }

  getListItemStyle(sectionName) {
    if(this.state.selectedSectionName == sectionName) 
      return styles.listItem.selected;
    else
      return styles.listItem.unselected;
  }

  renderSection(sectionName) {
    this.setState((state) => {state.selectedSectionName = sectionName});
  }

  renderSideMenu() {
    return (<div className="admin-leftside-menu">
            <List>
              <ListItem innerDivStyle={this.getListItemStyle('enquiry')} leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />} 
                rightIcon={<ActionInfo />}>
                <NavLink className="link" to={`${this.props.match.url}/enquiries`} onClick={() => {this.renderSection('enquiry')}}>Enquiries</NavLink>
              </ListItem>
              <ListItem innerDivStyle={this.getListItemStyle('orders')} leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />} 
                rightIcon={<ActionInfo />}>
                <NavLink className="link" to={`${this.props.match.url}/orders`} onClick={() => {this.renderSection('orders')}}>Orders</NavLink>
              </ListItem>
            </List>
          </div>);
  }

  renderSelectedSectionContent() {
    switch(this.state.selectedSectionName) {
      case 'enquiry':
        return(<div className="admin-rightside-content"><AdminEnquiryContainer/></div>);
      case 'orders':
        return null;
    }
  }

  render() {

    const {userProfile } = this.props;
    
    if(userProfile) {
      if(userProfile.type == 'admin') {
        return (<div>
            {this.renderSideMenu()}
            <div className="admin-rightside-content">
              <Route exact path={`${this.props.match.url}/orders`} component={AdminOrderContainer}/>
              <Route exact path={`${this.props.match.url}/enquiries`} component={AdminEnquiryContainer}/>
              <Route exact path={`${this.props.match.url}/enquiries/enquiry/:enquiryId/inspectors`} component={AdminAssignInspectorContainer}/>
            </div>
            <div className="clear"></div>
        </div>);
      } else {
        this.props.history.push('/');
      } 
    } else {
      return (<div className="page">
          <h1>Admin Login</h1>
          <div className="login-page">
            <div className="error">{this.props.error}</div>
            <form className="contact-form"  onSubmit={this.handleSubmit} action="/" method="post">
              <div className="label">Email</div>
              <div className="field">  
                <input className="inputField" type="text" placeholder="email" name="email" value={this.state.loginForm.email} onChange={this.handleInputChange}/>
                <div className="errorField">{this.state.loginFormError.email}</div>
              </div>  
              <div className="label">Password</div>
              <div className="field">  
                <input className="inputField" type="password" placeholder="password" name="password" value={this.state.loginForm.password} onChange={this.handleInputChange}/>
                <div className="errorField">{this.state.loginFormError.password}</div>
              </div>
              <div className="btn"><button>Login</button></div>

              <NavLink to={'/admin/enquiry'}>Enquiry</NavLink>
            </form>
          </div> 
        </div>);
    }
  }
}