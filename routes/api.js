var express = require('express');
var router = express.Router();
var api_u = require('../controllers/api/user.api');
var api_p = require('../controllers/api/product.api');
var mdw = require('../middleware/api.auth');

router.get('/users', mdw.api_auth, api_u.listUser); // ds u:  /api/users
router.post('/users/login', api_u.login); // đăng nhập
router.post('/users/reg', api_u.reg); // đăng ký
router.get('/users/profile', mdw.api_auth, api_u.profile); // lấy thông tin user
router.get('/users/logout', mdw.api_auth, api_u.logout); // đăng xuất

router.post('/add/product',  api_p.addProduct);  // thêm sản phẩm'
router.get('/manage/product', api_p.listProduct);  // hiển thị sản phẩm
router.delete('/manage/product/delete/:id', api_p.deleteProduct);
router.post('/manage/product/update/:id', api_p.updateProduct);
router.get('/manage/product/:id', api_p.getProduct);

module.exports = router;