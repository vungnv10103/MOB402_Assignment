var express = require('express');
var router = express.Router();

/* GET add product page. */
router.get('/', function (req, res, next) {
    res.render('profile', { title: 'Thông tin tài khoản'});
});

module.exports = router;
