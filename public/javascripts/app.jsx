import React from "react";
import Nav from "./components/layout_components/nav.jsx";

import "../stylesheets/layout_components/app_layout.scss";

class App extends React.Component{

	render(){
		return(
			<div className="container">
				<Nav />
				<div className="content_main">
					{ this.props.children }
				</div>
			</div>
		);
	}
};

export default App;