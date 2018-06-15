var React = require("react");
var ReactDOM = require("react-dom");
import injectTapEventPlugin from 'react-tap-event-plugin';

//import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppContainer from '../containers/AppContainer.js';


injectTapEventPlugin();

var renderSelectBox = (datasource) => {
  var options = [];
  options.push(<option key="" value="">Select</option>);
  datasource.map( (ds) => {
    options.push(<option key={ds.id} value={ds.id}>{ds.name}</option>);
  });
  return  options;             
}

function render(){
    ReactDOM.render(
	  			<AppContainer/>
  , document.getElementById('root'));
}

render();