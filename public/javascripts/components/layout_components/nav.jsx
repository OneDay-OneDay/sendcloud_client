import React from "react";
import { Link, IndexLink } from "react-router";

class Nav extends React.Component{
	render(){
		return(
			<ul className="nav">
				<li><IndexLink to="/send_email/setting" activeClassName={ "active" }>账户设置</IndexLink></li>
				<li><Link to="/send_email/sending" activeClassName={ "active" }>邮件发送</Link></li>
				<li><Link to="/send_email/template" activeClassName={ "active" }>邮件模板</Link></li>
				<li><Link to="/send_email/address" activeClassName={ "active" }>地址列表</Link></li>
			</ul>
		);
	};
};

export default Nav;