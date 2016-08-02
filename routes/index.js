var express = require('express');
var router = express.Router();

// 应用主页
router.get('/send_email', function(req, res, next) {
  res.render('index', { title: 'SendCloud Client' });
});
router.get('/send_email/*', function(req, res, next) {
  res.render('index', { title: 'SendCloud Client' });
});

// 登录
router.post('/send_email/api/login', function(req, res, next){
	res.json({ user_name : "有人星夜赶科场" });
});

module.exports = router;
