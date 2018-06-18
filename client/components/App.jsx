import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
//import { HashRouter, browserHistory } from 'react-router-dom';
import { BrowserRouter, browserHistory } from 'react-router-dom';

import Body from './Body.jsx';
import ActionInProgressContainer from '../containers/ActionInProgressContainer.js';
import HeaderContainer from '../containers/HeaderContainer.js';
import Footer from './Footer.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Home extends Component {

  componentWillMount() {
  	if(!this.props.userProfile) {
    	this.props.initialiseUser();
    }
  }

  render() {
    return (
	    <BrowserRouter history={browserHistory}> 
		    <MuiThemeProvider>	
		      <div>
		      	<ActionInProgressContainer/>
            {/* <HeaderContainer/> */}
		        <Body/>
		      </div>
		    </MuiThemeProvider>  
	    </BrowserRouter>
    );
  }
}