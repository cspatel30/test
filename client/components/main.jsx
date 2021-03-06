// import 'regenerator-runtime/runtime';
var React = require("react");
var ReactDOM = require("react-dom");
import { Provider } from 'react-redux';
import {IntlProvider, addLocaleData} from 'react-intl';
import injectTapEventPlugin from 'react-tap-event-plugin';

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

addLocaleData([zh, en]);

const userlocale = 'en';

//import { BrowserRouter, Switch, Route } from 'react-router-dom';

import configureStore from '../stores/store.js';
import AppContainer from '../containers/AppContainer.js';

const store = configureStore();

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
    //ReactDOM.render(<Voyagelist voyages={_voyages} />, document.getElementById("container"));
    ReactDOM.render(
  	<Provider store={store}>
  		<IntlProvider locale={userlocale}>
	  			<AppContainer/>
	  	</IntlProvider>
  	</Provider>
  , document.getElementById('root'));
}

render();