import React from "react";

class Template extends React.Component{
	constructor(props){
		super(props);
		window.scrollTo(0,0);
		this.state={};
	}

	render(){
		return(
			<div>邮件模板页面</div>
		);
	};
};

export default Template;