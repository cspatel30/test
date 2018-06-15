import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { BrowserRouter, browserHistory } from 'react-router-dom';

import Body from './Body.jsx';
import HeaderContainer from '../containers/HeaderContainer.js';
import Footer from './Footer.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Home extends Component {

  render() {
    return (
	    <BrowserRouter history={browserHistory}> 
		    <MuiThemeProvider>	
		      <div>
            <HeaderContainer/>
		        <Body/>
		      </div>
		    </MuiThemeProvider>  
	    </BrowserRouter>
    );
  }
}