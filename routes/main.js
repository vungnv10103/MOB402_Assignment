var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/', function (req, res, next) {
    res.render('main', { title: 'Quản lí bán hàng' });
});

module.exports = router;