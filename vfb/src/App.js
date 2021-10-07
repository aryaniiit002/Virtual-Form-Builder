import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.css';
import Home from "./components/Home"
import FormBuilder from './components/FormBuilder';
import FormGenerators from './components/FormGenerators';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/formbuilder" component={FormBuilder} />
				<Route path="/formgenerator/:formId" component={FormGenerators} />
				<Route>404 Not Found!</Route>
			</Switch>
		</Router>
	);
}

export default App;
