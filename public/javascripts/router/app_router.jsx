import React from "react";
import ReactDOM from "react-dom";
import { Router,Route,Redirect,browserHistory,IndexRoute } from "react-router";

import App from "../app.jsx";

ReactDOM.render(
	(
		<Router history={ browserHistory }>		
			<Route path="/send_email" component={ App }>
				<IndexRoute getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/page_components/sending.jsx").default) 
					}) } } />
				<Redirect from="/send_email/sending" to="/send_email" />
				<Route path="/send_email/template" getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/page_components/template.jsx").default) 
					}) } } />
				<Route path="/send_email/address" getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/page_components/address.jsx").default) 
					}) } } />
				<Route path="/send_email/setting" getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/page_components/setting.jsx").default) 
					}) } } />
			</Route>
		</Router>
	), document.getElementById("app"));