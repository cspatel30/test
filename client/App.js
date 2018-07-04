import React, { Component } from 'react';
import { connect } from 'react-redux'

import { verifyToken } from './actions/auth2';
import { initApp } from './actions/app';

import {FormattedMessage} from 'react-intl';
import { BrowserRouter, browserHistory } from 'react-router-dom';

import Routes from './routes';
import ActionInProgressContainer from './containers/ActionInProgressContainer.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

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
		        <Routes />
		      </div>
		    </MuiThemeProvider>  
	    </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
	const {userToken, userProfile} = state;
  	return  {userToken, userProfile};
}

const mapDispatchToProps = (dispatch) => {
	return {
		initialiseUser: (token) => {
       		dispatch(verifyToken(token));
       		dispatch(initApp());
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);