import React from "react";
import ReactDOM from "react-dom";
import { Router,Route,browserHistory,IndexRoute } from "react-router";

import App from "../app.jsx";
import Setting from "../components/common_components/setting.jsx";

ReactDOM.render(
	(
		<Router history={ browserHistory }>		
			<Route path="/send_email" component={ App }>
				<IndexRoute getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/common_components/setting.jsx").default) 
					}) } } />
				<Route path="/send_email/setting" getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/common_components/setting.jsx").default) 
					}) } } />
				<Route path="/send_email/sending" getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/common_components/sending.jsx").default) 
					}) } } />
				<Route path="/send_email/template" getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/common_components/template.jsx").default) 
					}) } } />
				<Route path="/send_email/address" getComponent={ (nextState, callback) =>{ 
					require.ensure( [ ], (require) => { 
						callback(null, require("../components/common_components/address.jsx").default) 
					}) } } />
			</Route>
		</Router>
	), document.getElementById("app"));