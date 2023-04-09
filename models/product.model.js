var db = require('./db');

var productSchema = new db.mongoose.Schema(
    {
        maSP: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
        image: { type: String, required: false },
        color: { type: String, required: true },
        loaiSP: { type: String, required: true },
        maKH: { type: String, required: true },
        nameKH: { type: String, required: true }
    }, { collection: 'products' }
);

let productModel = db.mongoose.model('productModel', productSchema);
module.exports = { productModel };