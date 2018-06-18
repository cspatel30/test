// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

export default class EmptyPage extends Component {

  render() {
	return (
		
          <div className="page">
          	<h1>404!!</h1>
          	<p>Sorry the page you are looking for is not found!!</p>
          </div>
      );
  }
}