import React from "react";
import { Link } from "react-router";
import { Table, Button, Spin } from "antd";
import { fetch_data_get } from "../../../../fetch_function/fetch.js";

import "../../../stylesheets/page_components/address.scss";

class Address extends React.Component{
	constructor(props){
		super(props);
		window.scrollTo(0,0);
		this.state={
			loading : false,
			address_list_data : [{  }] 
		};
	}
	
	//get address_list_data
	componentDidMount(){
		var _this = this;
		_this.setState({ loading : true });
		fetch_data_get("/api/get_address_list_data", { apiUser: localStorage.sc_client_api_user, apiKey: localStorage.sc_client_api_key })
			.then((result) => {
				let address_list_data = [];
				result.body.address_list_data.map((ele, key) => {
					address_list_data.push({
						key: key,
	  					name: ele.name,
	  					address: ele.address,
	  					description: ele.description,
	  					memberCount: ele.memberCount,
	  					gmtUpdated: ele.gmtUpdated
					});
				});
				_this.setState({
					loading : false,
					address_list_data : address_list_data
				});
			})
			.catch((error) => { console.log(error) });
	}

	render(){
		const columns = [
			{ title: "列表名称", dataIndex: "name", key: "name", render: (text) => <a href="#">{ text }</a> }, 
			{ title: "别称地址", dataIndex: "address", key: "address" },
			{ title: "列表描述", dataIndex: "description", key: "description" },
			{ title: "列表地址数", dataIndex: "memberCount", key: "memberCount" },
			{ title: "更新时间", dataIndex: "gmtUpdated", key: "gmtUpdated" },
			{ title: "操作", key: "operation", render: (text, record) => (
			  	<span>
			      	<Link to={ `/send_email/address_datail/${ record.address }` }>编辑</Link>
			      	<span className="ant-divider"></span>
			      	<a href="#">删除</a>
			    </span>
			  )
			}
		];
		return(
			<div className="SE_address_wrap">
				<div className="SE_address">
					<Spin size="large" spinning={ this.state.loading } >
						<Table columns={ columns } dataSource={ this.state.address_list_data } />
					</Spin>
				</div>
			</div>
		);
	};
}

export default Address;