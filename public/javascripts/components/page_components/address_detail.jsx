import React from "react";
import { Table, Button, Spin } from "antd";
import { fetch_data_get } from "../../../../fetch_function/fetch.js";

import "../../../stylesheets/page_components/address_detail.scss";

class Address_detail extends React.Component{
	constructor(props){
		super(props);
		window.scrollTo(0,0);
		this.state={
			loading : false,
			address_detail_data : [{  }]
		};
	}
	
	//get address_datail_data
	componentDidMount(){
		var _this = this;
		_this.setState({ loading : true });
		fetch_data_get("/api/get_address_detail_data", { apiUser: localStorage.sc_client_api_user, apiKey: localStorage.sc_client_api_key, address : this.props.params.address })
			.then((result) => {
				let address_detail_data = [];
				result.body.address_detail_data.map((ele, key) => {
					address_detail_data.push({
						key: key,
						member: ele.member,
	  					name: ele.name || "",
	  					vars: ele.vars || "",
	  					gmtCreated: ele.gmtCreated
					});
				});
				_this.setState({
					loading : false,
					address_detail_data : address_detail_data
				});
			})
			.catch((error) => { console.log(error) });
	}

	render(){
		const columns = [
			{ title: "地址", dataIndex: "member", key: "member" },
			{ title: "姓名", dataIndex: "name", key: "name" },
			{ title: "变量", dataIndex: "vars", key: "vars" },
			{ title: "创建日期", dataIndex: "gmtCreated", key: "gmtCreated" },
			{ title: "操作", key: "operation", render: (text, record) => (
			  	<span>
			      	<a href="#">删除</a>
			    </span>
			  )
			}
		];
		return(
			<div className="SE_address_detail_wrap">
				<div className="SE_address_detail">
					<Spin size="large" spinning={ this.state.loading } >
						<Table columns={ columns } dataSource={ this.state.address_detail_data } />
					</Spin>
				</div>
			</div>
		);
	};
}

export default Address_detail;