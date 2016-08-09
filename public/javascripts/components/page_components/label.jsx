import React from "react";
import { Table, notification } from "antd";
import { fetch_data_get } from "../../../../fetch_function/fetch.js";

import "../../../stylesheets/page_components/label.scss";

class Setting extends React.Component{
	constructor(props){
		super(props);
		window.scrollTo(0,0);
		this.state={ label_list_data : [{  }] };
	}

	//get label_list_data
	componentDidMount(){
		var _this = this;
		fetch_data_get("/api/get_label_list_data", { apiUser: localStorage.sc_client_api_user, apiKey: localStorage.sc_client_api_key })
			.then((result) => {
				let label_list_data = [];
				result.body.label_list_data.map((ele, key) => {
					label_list_data.push({
						key: key,
	  					labelId: ele.labelId,
	  					labelName: ele.labelName,
	  					gmtCreated: ele.gmtCreated
					});
				});
				_this.setState({ 
					label_list_data : label_list_data
				});
			})
			.catch((error) => { console.log(error) });
	}

	delete_label(labelId){
		fetch_data_get("/api/delete_label", {apiUser : localStorage.sc_client_api_user, apiKey : localStorage.sc_client_api_key, labelId : parseInt(labelId)})
			.then((result) => {
				notification["success"]({
			      	message: "消息",
			      	description: result.body.message
			    });
				this.setState({ label_list_data : result.body.label_list_data });
			})
			.catch((error) => { console.log(error) });
	}
	
	render(){
		const columns = [
			{ title: "标签ID", dataIndex: "labelId", key: "labelId", render: (text) => <a href="#">{ text }</a> }, 
			{ title: "标签名称", dataIndex: "labelName", key: "labelName" },
			{ title: "创建时间", dataIndex: "gmtCreated", key: "gmtCreated" },
			{ title: "操作", key: "operation", render: (text, record) => (
			  	<span>
			      	<a href="#" onClick = { (  ) => this.delete_label( record.labelId ) }>删除</a>
			    </span>
			  )
			}
		];
		return(
			<div className="SE_label_wrap">
				<div className="SE_label">
					<Table columns={ columns } dataSource={ this.state.label_list_data } />
				</div>
			</div>
		);
	};
};

export default Setting;