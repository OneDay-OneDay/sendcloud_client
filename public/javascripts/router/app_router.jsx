import React from "react";
import ReactDOM from "react-dom";
import { Router,Route,Redirect,browserHistory,IndexRoute, IndexRedirect } from "react-router";

import App from "../app.jsx";
import auth from "../auth.js";

ReactDOM.render(
	(
		<Router history={ browserHistory }>
			<Route path="/send_email" component={ App }>
				<IndexRoute onEnter={ auth.replace_away } getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/page_components/sending.jsx").default)
					}) } } />
				<Redirect from="/send_email/sending" to="/send_email" />
				<Route path="/send_email/template" onEnter={ auth.replace_away } getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/page_components/template.jsx").default) 
					}) } } />
				<Route path="/send_email/address" onEnter={ auth.replace_away } getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/page_components/address.jsx").default) 
					}) } } />
				<Route path="/send_email/setting" onEnter={ auth.replace_away } getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/page_components/setting.jsx").default) 
					}) } } />
				<Route path="/send_email/notlogin" onEnter={ auth.already_login } getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/page_components/notlogin.jsx").default)
					}) } } />
			</Route>
			<Route path="*" getComponent={ (nextState, callback) =>{ 
				require.ensure( [ ], (require) => { 
					callback(null, require("../notfound.jsx").default)
				}) } } />
		</Router>
	), document.getElementById("app"));