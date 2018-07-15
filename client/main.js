// import 'regenerator-runtime/runtime';
var React = require("react");
var ReactDOM = require("react-dom");
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import { Provider } from 'react-redux';
import {IntlProvider, addLocaleData} from 'react-intl';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './resources/static/css/main.scss';

// require ('jquery/dist/jquery.min.js');
require ('./resources/static/js/jquery-3.3.1.min.js');
require('hammerjs/hammer.min.js');
require('./resources/static/js/materialize.min.js');

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

addLocaleData([zh, en]);

const userlocale = 'en';

//import { BrowserRouter, Switch, Route } from 'react-router-dom';

const initialState = {};
import configureStore from './store/store';
import AppContainer from './App';

const store = configureStore(initialState);

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