var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/send_email', function(req, res, next) {
  res.render('index', { title: 'SE' });
});
router.get('/send_email/*', function(req, res, next) {
  res.render('index', { title: 'SE' });
});

module.exports = router;
