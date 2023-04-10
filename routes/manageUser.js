var express = require('express');
var router = express.Router();

/* GET add product page. */
router.get('/', function (req, res, next) {
    res.render('manageUser', { title: 'Quản lí người dùng'});
});

module.exports = router;
