// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  refresh: {
    display: 'inline-block',
    position: 'relative'
  }
};

export default class ActionInProgress extends Component {

  constructor(props) {
  	super(props);
  	
  	this.state = {
    	open: false,
  	};
  }

  componentWillReceiveProps(props) {
  	this.state.open = props.loading;
  }

  getClassName() {
  	if(this.state.open)
  		return "action-popup show";
  	else
  		return "action-popup hide";
  }

  render() {
	return (
      <div className={this.getClassName()}>
      	<div className="action-content">
	      	<RefreshIndicator size={50} left={0} top={200}
		      loadingColor="#FF9800" status="loading" style={style.refresh}/>
		</div>
      </div>
	);
  }
}