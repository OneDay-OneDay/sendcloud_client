import React from "react";
import "../../../stylesheets/page_components/notlogin.scss";

class Notlogin extends React.Component{
	constructor(props){
		super(props);
		window.scrollTo(0,0);
	}
	
	render(){
		return(
			<div className="notlogin">你还未登录，登录后才可以使用左侧功能</div>
		);
	};
};

export default Notlogin;