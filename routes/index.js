var express = require('express');
var router = express.Router();
var request = require("superagent");

// 应用主页
router.get("/send_email", function(req, res, next) {
  res.render("index", { title: 'SendCloud Client' });
});
router.get("/send_email/*", function(req, res, next) {
  res.render("index", { title: 'SendCloud Client' });
});

// 登录
router.post("/api/login", function(req, res, next){
	var api_user = req.body.API_USER;
	var api_key = req.body.API_KEY;
	request.get("http://www.sendcloud.net/webapi/userinfo.get.json")
		.set("Accept", "application/json")
		.query({ api_user : api_user, api_key : api_key })
		.end(function(error, result){
			if(error){
				console.log(error);
			};
			if(result.body.errors){
				res.json({ error : "错误的API_USER或API_KEY" });
				return;
			};
			var user_name = result.body.userinfo.userName;
			res.json({ user_name : user_name });
		});
});

// 获取api_user
router.get("/api/get_api_user", function(req, res, next){
	request.get("http://api.sendcloud.net/apiv2/apiuser/list")
		.set("Accept", "application/json")
		.query(req.query)
		.end(function(error, result){
			if(error){
				console.log(error);
			};
			var api_user_list = result.body.info.dataList;
			res.json({ api_user_list : api_user_list });
		});
});

module.exports = router;
