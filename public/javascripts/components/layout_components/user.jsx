import React from "react";
import { browserHistory } from "react-router";
import { fetch_data_post } from "../../../../fetch_function/fetch.js";
import { Modal, Button, Input, message, Alert } from "antd";

class User extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			confirmLoading : false,
      		visible : false,
			login : false, 
			user_name : "",
			error_message : ""
		};
	}

	componentDidMount(){
		if(localStorage.sc_client_login_state){
			this.setState({ login : true, user_name : localStorage.sc_client_user_name});
		};
	}

	showModal(){
    	this.setState({ visible: true, error_message : "" });
  	}

  	handleSubmit(){
  		var _this = this;
  		var API_USER = this.refs.API_USER.refs.input.value;
  		var API_KEY = this.refs.API_KEY.refs.input.value;
    	this.setState({ confirmLoading: true });
    	if(API_USER == "" || API_KEY == ""){
    		_this.setState({ confirmLoading: false, error_message : "请填写完表单"});
	    	return;
    	};
    	fetch_data_post("/api/login", {apiUser : API_USER, apiKey : API_KEY})
    		.then((result) => {
    			if(result.body.error){
	    			_this.setState({ confirmLoading: false, error_message : result.body.error});
	    			return;
	    		};
	    		_this.setState({ confirmLoading: false, visible: false, login : true, user_name : result.body.user_name});
	    		// 本地维持用户登录状态并保存用户登录api_user，api_key
	    		localStorage.sc_client_login_state = true;
	    		localStorage.sc_client_user_name = result.body.user_name;
	    		localStorage.sc_client_api_user = API_USER;
	    		localStorage.sc_client_api_key = API_KEY;
	    		setTimeout(() => { message.success("登录成功") }, 500);
	    		browserHistory.push("/send_email/sending");
    		})
    		.catch((error) => { console.log(error) });
  	}

  	handleCancel(){
    	this.setState({ visible: false });
  	}

	changeUserState(){
		if(this.state.login){
			this.setState({ login : false, user_name : "" });
			delete localStorage.sc_client_login_state;
			delete localStorage.sc_client_user_name;
			delete localStorage.sc_client_api_user;
			delete localStorage.sc_client_api_key;
			message.success("注销成功");
			browserHistory.push("/send_email/notlogin");
		}else{
			this.showModal();
		}
	}

	render(){
		return(
			<div className="user_box">
				<div className="user_name">{ this.state.login ? "你来啦！" + this.state.user_name : "" }</div>
				<div className="user_state">
					<Button type="primary" onClick = { () => this.changeUserState() }>{ this.state.login ? "注销" : "登录" }</Button>
				</div>
				<Modal title = "登录"
		          	visible = { this.state.visible }
		          	onOk = { () => this.handleSubmit() }
		          	confirmLoading = { this.state.confirmLoading }
		          	onCancel = { () => this.handleCancel() }
		        >
		        	<div className = "input_wrap">API_USER: <Input ref = "API_USER" size = "large" placeholder = "请输入API_USER" /></div>
		        	<div className = "input_wrap">API_KEY: <Input ref = "API_KEY" size = "large" placeholder = "请输入API_KEY" /></div>
		        	<div className = "error_message" style = {{ "display" : this.state.error_message == "" ? "none" : "block" }}>
		        		<Alert message = { this.state.error_message } type = "error" showIcon />
		        	</div>
		        </Modal>
			</div>
		);
	};
};

export default User;