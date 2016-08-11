import React from "react";
import { Table, notification, Button, Modal, Alert, Input, Spin } from "antd";
import { fetch_data_get } from "../../../../fetch_function/fetch.js";

import "../../../stylesheets/page_components/label.scss";

class Setting extends React.Component{
	constructor(props){
		super(props);
		window.scrollTo(0,0);
		this.state={
			loading : false,
			label_list_data : [{  }],
			confirmLoading : false,
      		visible : false,
      		error_message : ""
		};
	}

	//get label_list_data
	componentDidMount(){
		var _this = this;
		_this.setState({ loading : true });
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
					loading : false,
					label_list_data : label_list_data
				});
			})
			.catch((error) => { console.log(error) });
	}

	add_label(){
		this.setState({ visible: true, error_message : "" });
	}

	handleSubmit(){
		var _this = this;
  		var label_name = this.refs.label_name.refs.input.value;
  		this.setState({ confirmLoading: true });
  		if(label_name == "" || typeof(label_name) == "undefined"){
    		_this.setState({ confirmLoading: false, error_message : "请填写标签名"});
	    	return;
    	};
    	fetch_data_get("/api/add_label", { apiUser : localStorage.sc_client_api_user, apiKey : localStorage.sc_client_api_key, labelName : label_name })
    		.then((result) => {
    			_this.setState({ confirmLoading: false, visible: false });
    			if(result.body.error){
					notification["error"]({
			      		message: "错误",
			      		description: result.body.message,
			    	});
			    	return false;
				};
    			notification["success"]({
			      	message: "消息",
			      	description: result.body.message
			    });
	    		_this.setState({ label_list_data : result.body.label_list_data });
    		})
    		.catch((error) => { console.log(error) });
	}

	handleCancel(){
		this.setState({ visible: false });
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
					<Spin size="large" spinning={ this.state.loading } >
						<Button type="primary" onClick = { (  ) => this.add_label() }>添加标签</Button>
						<Table columns={ columns } dataSource={ this.state.label_list_data } />
					</Spin>
					<Modal title = "添加新标签"
			          	visible = { this.state.visible }
			          	onOk = { () => this.handleSubmit() }
			          	confirmLoading = { this.state.confirmLoading }
			          	onCancel = { () => this.handleCancel() }
			        >
			        	<div className = "input_wrap">标签名称: <Input ref = "label_name" size = "large" placeholder = "" /></div>
			        	<div className = "error_message" style = {{ "display" : this.state.error_message == "" ? "none" : "block" }}>
			        		<Alert message = { this.state.error_message } type = "error" showIcon />
			        	</div>
			        </Modal>
				</div>
			</div>
		);
	};
};

export default Setting;