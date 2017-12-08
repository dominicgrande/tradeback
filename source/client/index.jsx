import React from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route, Link, hashHistory } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import Home from './components/Home/Home.jsx'
import Card from './components/Card/Card.jsx';

render(
	<div>
	<Router history={hashHistory}>
		<div>
		<Route exact path='/' component={Home}/>,
		<Route exact path='/card' component={Card}/>,
		</div>
	</Router>
	</div>,
	document.getElementById('app')
);
