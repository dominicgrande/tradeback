import React from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route, Link, hashHistory, Switch } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css';

import Home from './components/Home/Home.jsx'
import CardCreate from './components/Card/CardCreate.jsx';
import MiniCard from './components/MiniCard/MiniCard.jsx'

require('./styles/main.scss')

render(
	<div>
	<Router history={hashHistory}>
		<div>
		<Route exact path='/' component={Home}/>,
		<Route exact path='/minicard' component={MiniCard}/>,
		</div>
	</Router>
	</div>,
	document.getElementById('app')
);
