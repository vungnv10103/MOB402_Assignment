var md = require('../../models/product.model');
const multer = require('multer');
const fs = require('fs')


exports.listProduct = async (req, res, next) => {
    try {
        let list = await md.productModel.find();
        if (list) {
            return res.render('addProduct', { title: 'Quản lí sản phẩm ', data: list });
            // return res.status(200).json({ data: list, msg: 'Lấy dữ liệu thành công' });
        } else {
            return res.status(204).json({ msg: 'Không có dữ liệu' });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    // res.json( {status: 1, msg: 'Trang danh sách user'});
}

let dir = './public/images'
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    // SET STORAGE
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + "." + file.originalname.split(".")[1])
        }
    })
}
var upload = multer({ storage: storage })
exports.uploadFile = (upload.single('image'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
})
exports.addProduct = async (req, res, next) => {

    try {
        console.log(req.body);

        const product = new md.productModel(req.body);
        let new_p = await product.save()
        console.log(new_p)
        let list = await md.productModel.find();
        if (list) {
            return res.render('addProduct', { title: 'Quản lí sản phẩm ', data: list });
            // return res.status(200).json({ data: list, msg: 'Lấy dữ liệu thành công' });
        } else {
            return res.status(204).json({ msg: 'Không có dữ liệu' });
        }
        // return res.status(201).json({ product: new_p})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
    // res.json( {status: 1, msg: 'Trang đăng ký'});
}
exports.deleteProduct = async (req, res, next) => {
    try {
        const productID = req.params.id;
        const deletedProduct = await md.productModel.findOneAndDelete({ maSP: productID });
        return res.json({ deletedProduct })
        // res.json({ deletedProductID: productID });
        // let list = await md.productModel.find();
        // return res.render('addProduct', { title: 'Quản lí sản phẩm ' , data: list});
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}
exports.updateProduct = async (req, res, next) => {
    try {

        const data = req.body;
        const maSP = data.maSP
        const options = { new: true };

        const updatedProduct = await md.productModel.findOneAndUpdate(
            { maSP },
            data,
            options
        );
        let list = await md.productModel.find();
        if (list) {
            return res.render('addProduct', { title: 'Quản lí sản phẩm ', data: list });
            // return res.status(200).json({ data: list, msg: 'Lấy dữ liệu thành công' });
        } else {
            return res.status(204).json({ msg: 'Không có dữ liệu' });
        }
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
exports.getProduct = async (req, res, next) => {
    try {
        const productID = req.params.id;
        const product = await md.productModel.findOne({ maSP: productID });
        return res.json({ data: product });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};


