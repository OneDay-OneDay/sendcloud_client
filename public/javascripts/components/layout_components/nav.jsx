import React from "react";
import { Link, IndexLink } from "react-router";

class Nav extends React.Component{
	render(){
		return(
			<ul className="nav">
				<div className="logo_area">SendCloud Client</div>
				<li><IndexLink to="/send_email" activeClassName={ "active" }>邮件发送</IndexLink></li>
				<li><Link to="/send_email/label" activeClassName={ "active" }>邮件标签</Link></li>
				<li><Link to="/send_email/template" activeClassName={ "active" }>邮件模板</Link></li>
				<li><Link to="/send_email/address" activeClassName={ "active" }>地址列表</Link></li>
			</ul>
		);
	};
};

export default Nav;