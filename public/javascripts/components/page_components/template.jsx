import React from "react";
import { Table, Modal, Spin } from "antd";
import { fetch_data_get } from "../../../../fetch_function/fetch.js";

import "../../../stylesheets/page_components/template.scss";

class Template extends React.Component{
	constructor(props){
		super(props);
		window.scrollTo(0,0);
		this.state={
			loading : false,
			template_loading : false,
			template_data : [{  }],
			preview_visible : false,
			template_html : ""
		};
	}

	//get template_data
	componentDidMount(){
		var _this = this;
		_this.setState({ loading : true });
		fetch_data_get("/api/get_template_data", { apiUser: localStorage.sc_client_api_user, apiKey: localStorage.sc_client_api_key })
			.then((result) => {
				let template_data = [];
				result.body.template_data.map((ele, key) => {
					template_data.push({
						key: key,
	  					name: ele.name,
	  					invokeName: ele.invokeName,
	  					templateType: parseInt(ele.templateType) == 1 ? "批量" : "触发",
	  					templateStat: parseInt(ele.templateStat) == 1 ? "审核通过" : "待审核",
	  					gmtUpdated: ele.gmtUpdated
					});
				});
				_this.setState({
					loading : false,
					template_data : template_data
				});
			})
			.catch((error) => { console.log(error) });
	}

	preview(invokeName){
		this.setState({ preview_visible : true, template_loading : true });
		fetch_data_get("/api/template_preview", {apiUser : localStorage.sc_client_api_user, apiKey : localStorage.sc_client_api_key, invokeName : invokeName})
			.then((result) => {
				this.setState({ template_loading : false, template_html : result.body.template_html });
			})
			.catch((error) => { console.log(error) });
	}

	preview_close(){
		this.setState({ preview_visible : false });
	}

	render(){
		const columns = [
			{ title: "模板名称", dataIndex: "name", key: "name", render: (text) => <a href="#">{ text }</a> }, 
			{ title: "调用名称", dataIndex: "invokeName", key: "invokeName" }, 
			{ title: "模板类型", dataIndex: "templateType", key: "templateType" },
			{ title: "审核状态", dataIndex: "templateStat", key: "templateStat" },
			{ title: "更新时间", dataIndex: "gmtUpdated", key: "gmtUpdated" },
			{ title: "操作", key: "operation", render: (text, record) => (
			  	<span>
			    	<a href="#" onClick = { (  ) => this.preview( record.invokeName ) }>预览</a>
			      	<span className="ant-divider"></span>
			      	<a href="#">编辑</a>
			      	<span className="ant-divider"></span>
			      	<a href="#">删除</a>
			    </span>
			  )
			}
		];
		return(
			<div className="SE_template_wrap">
				<div className="SE_template">
				<Spin size="large" spinning={ this.state.loading } >
					<Table columns={ columns } dataSource={ this.state.template_data } />
				</Spin>
				</div>
				<Modal wrapClassName="preview_box"
					title = "预览"
		          	visible = { this.state.preview_visible }
		          	onOk = { () => this.preview_close() }
		          	onCancel = { () => this.preview_close() }
		        >
		        	<Spin spinning={ this.state.template_loading } >
		        		<iframe srcDoc={ this.state.template_html } frameBorder="0" width="100%" height="350px">{ this.state.template_html }</iframe>
		        	</Spin>
		        </Modal>
			</div>
		);
	};
};

export default Template;