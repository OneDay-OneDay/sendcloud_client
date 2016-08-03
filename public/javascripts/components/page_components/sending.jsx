import React from "react";
import request from "superagent";
import { Tabs, Select, Input, Tooltip } from "antd";
import "../../../stylesheets/page_components/sending.scss";

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Sending extends React.Component{
	constructor(props){
		super(props);
		window.scrollTo(0,0);
		this.state={
			api_user_list : [{  }]
		};
	}

	componentDidMount(){
		var _this = this;
		request.get("/api/get_api_user")
			.set("Accept", "application/json")
			.query({ 
				apiUser : localStorage.sc_client_api_user,
				apiKey : localStorage.sc_client_api_key
			})
			.end(function(error, result){
				_this.setState({ api_user_list : result.body.api_user_list });
			});
	}

	handleChange(value){
		console.log(value);
	}
	
	render(){
		return(
			<div className="SE_sending_wrap">
				<div className="SE_sending">
					<Tabs defaultActiveKey="1">
						<TabPane tab="普通发送" key="1">
							<div className = "TabPane_item">
								API_USER: 
								<Select labelInValue onChange={ (value) => this.handleChange(value) }>
							      	{
							      		this.state.api_user_list.map( (ele, key) => {
							      			return( 
							      				<Option key={ key } value={ ele.name }>
							      					<Tooltip title={ ele.emailType }>
    													<span>{ ele.name }</span>
  													</Tooltip>
							      				</Option> 
							      			)
							      		} )
							      	}
							    </Select>
							</div>
		        			<div className = "TabPane_item">发信地址: <Input ref = "common_api_key" size = "large" placeholder = "请使用 x x x @ 发信域名，作为发信地址" /></div>
		        			<div className = "TabPane_item">接收者地址: <Input ref = "common_api_key" size = "large" placeholder = "多个地址用 ; 隔开" /></div>
		        			<div className = "TabPane_item">邮件主题: <Input ref = "common_api_key" size = "large" placeholder = "" /></div>
		        			<div className = "TabPane_item">自定义内容: <Input ref = "common_api_key" size = "large" placeholder = "" /></div>
						</TabPane>
						<TabPane tab="模板发送" key="2"></TabPane>
					</Tabs>
				</div>
			</div>
		);
	};
};

export default Sending;