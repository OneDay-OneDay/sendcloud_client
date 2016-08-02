import React from "react";
import Nav from "./components/layout_components/nav.jsx";
import User from "./components/layout_components/user.jsx";

import "../stylesheets/layout_components/app_layout.scss";

class App extends React.Component{
	render(){
		return(
			<div className="container">
				<Nav />
				<div className="content_banner">
					<div className="user">
						<User />
					</div>
				</div>
				<div className="content_main">
					<div className="content_main_box">{ this.props.children }</div>
				</div>
			</div>
		);
	}
};

export default App;