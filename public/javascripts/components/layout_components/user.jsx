import React from "react";
import request from "superagent";
import { Modal, Button, Input, message } from "antd";

class User extends React.Component{
	constructor(props){
		super(props);
		this.state={
			confirmLoading : false,
      		visible : false,
			login : false, 
			user_name : ""
		};
	}

	showModal(){
    	this.setState({ visible: true });
  	}

  	handleSubmit(){
  		var _this=this;
    	this.setState({ confirmLoading: true });
    	request.post("/send_email/api/login")
    	.set("Content-Type", "application/json")
    	.send({ API_USER : this.refs.API_USER.refs.input.value, API_KEY : this.refs.API_KEY.refs.input.value})
    	.end(function(error, result){
    		if(error){
    			console.log(error);
    		};
    		_this.setState({ confirmLoading: false, visible: false, login : true, user_name : result.body.user_name});
    		setTimeout(() => { message.success("登录成功") }, 500)
    	});
  	}

  	handleCancel(){
    	this.setState({ visible: false });
  	}

	changeUserState(){
		if(this.state.login){
			this.setState({ login : false, user_name : "" });
			message.success("注销成功");
		}else{
			this.showModal();
		}
	}

	render(){
		return(
			<div className="user_box">
				<div className="user_name">{ this.state.login ? "你来啦！" + this.state.user_name : "" }</div>
				<div className="user_state">
					<Button type="primary" onClick={ () => this.changeUserState() }>{ this.state.login ? "注销" : "登录" }</Button>
				</div>
				<Modal title="登录"
		          	visible={ this.state.visible }
		          	onOk={ () => this.handleSubmit() }
		          	confirmLoading={ this.state.confirmLoading }
		          	onCancel={ () => this.handleCancel() }
		        >
		        	<div className="input_wrap">API_USER: <Input ref="API_USER" size="large" placeholder="请输入API_USER" /></div>
		        	<div className="input_wrap">API_KEY: <Input ref="API_KEY" size="large" placeholder="请输入API_KEY" /></div>
		        </Modal>
			</div>
		);
	};
};

export default User;