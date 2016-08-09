import React from "react";
import { fetch_data_get, fetch_data_post } from "../../../../fetch_function/fetch.js";
import { Tabs, Select, Input, Tooltip, Button, notification, Radio } from "antd";
import "../../../stylesheets/page_components/sending.scss";

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class Sending extends React.Component{
	constructor(props){
		super(props);
		window.scrollTo(0,0);
		this.state={
			api_user_list : [{  }],
			template_list : [{  }],
			address_list : [{  }],
			label_list : [{  }],
			// 普通发送
			send_loading : false,
			c_api_user : "",
			c_from : "",
			c_to : "",
			c_address : "",
			c_subject : "",
			c_label : "",
			c_content : "",
			// 模板发送
			template_send_loading : false,
			t_api_user : "",
			t_from : "",
			t_to : "",
			t_subject : "",
			t_label : "",
			template_name : "",
			// 是否使用地址列表
			c_use_mail_list : false,
			t_use_mail_list : false
		};
	}

	//get api_user list and template list
	componentDidMount(){
		var _this = this;
		fetch_data_get("/api/get_api_user_and_template", { apiUser: localStorage.sc_client_api_user, apiKey: localStorage.sc_client_api_key })
			.then((result) => {
				_this.setState({ 
					api_user_list: result.body.api_user_list, 
					template_list: result.body.template_list,
					address_list: result.body.address_list,
					label_list: result.body.label_list
				});
			})
			.catch((error) => { console.log(error) });
	}

	handleChange(event, type, value){
		switch(type){
			// 获取普通发送表单输入值
			case "c_api_user" :
				this.setState({ c_api_user : value.key });
				break;
			case "c_from" :
				this.setState({ c_from : event.target.value });
				break;
			case "c_use_mail_list" :
				// 初始化 state
				this.setState({ c_to : "" });
				this.setState({ c_address : "" });
				this.setState({ c_use_mail_list : event.target.value });
				break;
			// 发送地址，非地址列表
			case "c_to" :
				this.setState({ c_to : event.target.value });
				break;
			// 地址列表
			case "c_address" :
				this.setState({ c_address : value.key });
				break;
			case "c_subject" :
				this.setState({ c_subject : event.target.value });
				break;
			case "c_label" :
				this.setState({ c_label : value.key });
				break;
			case "c_content" :
				this.setState({ c_content : event.target.value });
				break;

			// 获取模板发送表单输入值
			case "t_api_user" :
				this.setState({ t_api_user : value.key });
				break;
			case "t_from" :
				this.setState({ t_from : event.target.value });
				break;
			case "t_use_mail_list" :
				// 初始化 state
				this.setState({ t_to : "" });
				this.setState({ t_address : "" });
				this.setState({ t_use_mail_list : event.target.value });
				break;
			// 发送地址，非地址列表
			case "t_to" :
				this.setState({ t_to : event.target.value });
				break;
			// 地址列表
			case "t_address" :
				this.setState({ t_address : value.key });
				break;
			case "t_subject" :
				this.setState({ t_subject : event.target.value });
				break;
			case "t_label" : 
				this.setState({ t_label : value.key });
				break;
			case "template" :
				this.setState({ template_name : value.key });
				break;
			default :
				break;
		};
	}

	// 表单验证
	validate_data(arr){
		// 判断表单是否全部填写完
		for(let i=0; i<arr.length; i++){
			if(arr[i].length == 0 || typeof(arr[i]) == "undefined"){
				notification["warning"]({
      				message: "提示",
      				description: "请把表单填写完再提交！",
    			});
				return false;
			}
		};
	}

	handleSubmit(tag){
		var _this = this;
		if(!tag){
			//普通发送
			let c_api_user = this.state.c_api_user;
			let c_from = this.state.c_from;
			// 非地址列表地址序列
			let c_to = this.state.c_to;
			// 地址列表
			let c_address = this.state.c_address;
			let c_subject = this.state.c_subject;
			let c_label = this.state.c_label;
			let c_content = this.state.c_content;

			// 如果没有使用地址列表则使用c_to作为发送地址，不然，使用c_address
			let c_data = this.state.c_use_mail_list == false ? [c_api_user,c_from,c_to,c_subject,c_label,c_content] : [c_api_user,c_from,c_address,c_subject,c_label,c_content];

			console.log(c_data);
			// 验证输入
			let c_validate_result = this.validate_data(c_data);

			if(c_validate_result != false){
				_this.setState({ send_loading : true });
				let c_post_data = {  };
				if(this.state.c_use_mail_list){
					// 使用地址列表
					c_post_data = {
						apiUser : c_api_user, 
						apiKey : localStorage.sc_client_api_key, 
						from : c_from, 
						to : c_address,
						subject : c_subject,
						labelId : parseInt(c_label),
						html : c_content,
						useAddressList : true
					}
				}else{
					// 不使用地址列表
					c_post_data = {
						apiUser : c_api_user, 
						apiKey : localStorage.sc_client_api_key, 
						from : c_from, 
						xsmtpapi : JSON.stringify({ "to" : c_to.split(";") }),
						subject : c_subject,
						labelId : parseInt(c_label),
						html : c_content
					}
				};
				fetch_data_post("/api/send", c_post_data)
					.then((result) => {
						_this.setState({ send_loading : false });
						if(result.body.error){
							notification["error"]({
			      				message: "错误",
			      				description: result.body.message,
			    			});
			    			return false;
						};
						notification["success"]({
			      			message: "成功",
			      			description: result.body.message,
			    		});
					})
					.catch((error) => { console.log(error) });
			};
		}else{
			//模板发送
			let t_api_user = this.state.t_api_user;
			let t_from = this.state.t_from;
			// 非地址列表地址序列
			let t_to = this.state.t_to;
			// 地址列表
			let t_address = this.state.t_address;
			let t_subject = this.state.t_subject;
			let t_label = this.state.t_label;
			let template_name = this.state.template_name;

			// 如果没有使用地址列表则使用t_to作为发送地址，不然，使用t_address
			let t_data = this.state.t_use_mail_list == false ? [t_api_user,t_from,t_to,t_subject,t_label,template_name] : [t_api_user,t_from,t_address,t_subject,t_label,template_name];			

			console.log(t_data);
			// 验证输入
			let t_validate_result = this.validate_data(t_data);

			// 输入合法
			if(t_validate_result != false){
				_this.setState({ template_send_loading : true });
				let t_post_data = {  };
				if(this.state.t_use_mail_list){
					// 使用地址列表
					t_post_data = {
						apiUser : t_api_user, 
						apiKey : localStorage.sc_client_api_key, 
						from : t_from, 
						to : t_address,
						subject : t_subject,
						t_label : parseInt(t_label),
						templateInvokeName : template_name,
						useAddressList : true
					}
				}else{
					// 不使用地址列表
					t_post_data = {
						apiUser : t_api_user, 
						apiKey : localStorage.sc_client_api_key, 
						from : t_from, 
						xsmtpapi : JSON.stringify({ "to" : t_to.split(";") }),
						subject : t_subject,
						t_label : parseInt(t_label),
						templateInvokeName : template_name
					}
				};
				fetch_data_post("/api/template_send", t_post_data)
					.then((result) => {
						_this.setState({ template_send_loading : false });
						if(result.body.error){
							notification["error"]({
			      				message: "错误",
			      				description: result.body.message,
			    			});
			    			return false;
						};
						notification["success"]({
			      			message: "成功",
			      			description: result.body.message,
			    		});
					})
					.catch((error) => { console.log(error) });
			};
		}
	}
	
	render(){
		return(
			<div className="SE_sending_wrap">
				<div className="SE_sending">
					<Tabs defaultActiveKey="1">
						{/*普通发送*/}
						<TabPane tab="普通发送" key="1">
							<div className = "TabPane_item">
								API_USER: 
								<Select labelInValue onChange={ (value) => this.handleChange(null, "c_api_user", value) }>
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
		        			<div className = "TabPane_item">发信地址: <Input onChange={ (event) => this.handleChange(event, "c_from") } size = "large" placeholder = "请使用 x x x @ 发信域名，作为发信地址" /></div>
		        			{
		        				this.state.c_use_mail_list == false 
		        				? 
		        				<div className = "TabPane_item">
		        					接收者地址: 
		        					<Input onChange={ (event) => this.handleChange(event, "c_to") } size = "large" placeholder = "多个地址用 ; 隔开" />
		        				</div> 
		        				: 
		        				<div className = "TabPane_item">
		        					地址列表: 
		        					<Select labelInValue onChange = { (value) => this.handleChange(null, "c_address", value) }>
							      	{
							      		this.state.address_list.map( (ele, key) => {
							      			return( 
							      				<Option key={ key } value={ ele.address }>
							      					<Tooltip title={ ele.description }>
    													<span>{ ele.name }</span>
  													</Tooltip>
							      				</Option> 
							      			)
							      		} )
							      	}
							    	</Select>
		        				</div> 
		        			}
		        			<div className = "TabPane_item">
		        				<RadioGroup value={ this.state.c_use_mail_list } onChange={ (event) => this.handleChange(event, "c_use_mail_list") }>
							    	<Radio value={ false }>不使用地址列表</Radio>
							        <Radio value={ true }>使用地址列表</Radio>
							    </RadioGroup>
		        			</div>
		        			<div className = "TabPane_item">邮件主题: <Input onChange={ (event) => this.handleChange(event, "c_subject") } size = "large" placeholder = "邮件主题" /></div>
		        			<div className = "TabPane_item">
		        				邮件标签: 
		        				<Select labelInValue onChange={ (value) => this.handleChange(null, "c_label", value) }>
							      	{
							      		this.state.label_list.map( (ele, key) => {
							      			return( 
							      				<Option key={ key } value={ ele.labelId }>
							      					{ ele.labelName }
							      				</Option> 
							      			)
							      		} )
							      	}
							    </Select>
		        			</div>
		        			<div className = "TabPane_item">自定义内容: <Input onChange={ (event) => this.handleChange(event, "c_content") } type="textarea" rows={ 4 } placeholder = "可以是文本格式或者 HTML 格式，请注意邮件内容须和通过审核的其中一个邮件模板内容匹配，否则将会出现匹配错误。" /></div>
		        			<div className = "TabPane_item"><Button type="primary" loading={ this.state.send_loading } onClick={ () => this.handleSubmit(0) }>发送</Button></div>
						</TabPane>

						{/*模板发送*/}
						<TabPane tab="模板发送" key="2">
							<div className = "TabPane_item">
								API_USER: 
								<Select labelInValue onChange={ (value) => this.handleChange(null, "t_api_user", value) }>
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
		        			<div className = "TabPane_item">发信地址: <Input onChange={ (event) => this.handleChange(event, "t_from") } size = "large" placeholder = "请使用 x x x @ 发信域名，作为发信地址" /></div>
		        			{
		        				this.state.t_use_mail_list == false 
		        				? 
		        				<div className = "TabPane_item">
		        					接收者地址: 
		        					<Input onChange={ (event) => this.handleChange(event, "t_to") } size = "large" placeholder = "多个地址用 ; 隔开" />
		        				</div> 
		        				: 
		        				<div className = "TabPane_item">
		        					地址列表: 
		        					<Select labelInValue onChange = { (value) => this.handleChange(null, "t_address", value) }>
							      	{
							      		this.state.address_list.map( (ele, key) => {
							      			return( 
							      				<Option key={ key } value={ ele.address }>
							      					<Tooltip title={ ele.description }>
    													<span>{ ele.name }</span>
  													</Tooltip>
							      				</Option> 
							      			)
							      		} )
							      	}
							    </Select>
		        				</div> 
		        			}
		        			<div className = "TabPane_item">
		        				<RadioGroup value={ this.state.t_use_mail_list } onChange={ (event) => this.handleChange(event, "t_use_mail_list") }>
							    	<Radio value={ false }>不使用地址列表</Radio>
							        <Radio value={ true }>使用地址列表</Radio>
							    </RadioGroup>
		        			</div>
		        			<div className = "TabPane_item">邮件主题: <Input onChange={ (event) => this.handleChange(event, "t_subject") } size = "large" placeholder = "邮件主题" /></div>
		        			<div className = "TabPane_item">
		        				邮件标签: 
		        				<Select labelInValue onChange={ (value) => this.handleChange(null, "t_label", value) }>
							      	{
							      		this.state.label_list.map( (ele, key) => {
							      			return( 
							      				<Option key={ key } value={ ele.labelId }>
							      					{ ele.labelName }
							      				</Option> 
							      			)
							      		} )
							      	}
							    </Select>
		        			</div>
		        			<div className = "TabPane_item">
		        				邮件模板: 
		        				<Select labelInValue placeholder="模板类型请保持和api_user类型一致" onChange={ (value) => this.handleChange(null, "template", value) }>
							      	{
							      		this.state.template_list.map( (ele, key) => {
							      			return( 
							      				<Option key={ key } value={ ele.invokeName }>
							      					<Tooltip title={ ele.templateType == 1 ? "批量" : "触发" }>
    													<span>{ ele.subject }</span>
  													</Tooltip>
							      				</Option> 
							      			)
							      		} )
							      	}
							    </Select>
		        			</div>
		        			<div className = "TabPane_item"><Button type="primary" loading={ this.state.template_send_loading } onClick={ () => this.handleSubmit(1) }>发送</Button></div>
						</TabPane>
					</Tabs>
				</div>
			</div>
		);
	};
};

export default Sending;