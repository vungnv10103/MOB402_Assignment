var db = require('./db');

const jwt = require('jsonwebtoken');//  Cần chạy lệnh cài đặt: npm install jsonwebtoken --save 
require('dotenv').config(); // su dung thu vien doc file env:   npm install dotenv --save
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt");  // cài npm install bcrypt  --save

var userSchema = new db.mongoose.Schema(
    {
        username: { type: String, required: true },
        passwd: { type: String, required: true },
        email: { type: String, required: true },
        token: {  // trường hợp lưu nhiều token thì phải dùng mảng. Trong demo này sẽ dùng 1 token
            type: String, required: false
        }
    }, { collection: 'tb_user' }
);

userSchema.methods.generateAuthToken = async function () {
    const user = this
    console.log(user)
    const token = jwt.sign({ _id: user._id, username: user.username }, chuoi_ky_tu_bi_mat)
    // user.tokens = user.tokens.concat({token}) // code này dành cho nhiều token, ở demo này dùng 1 token
    user.token = token;
    await user.save()
    return token
}
// dùng cho đăng nhập: 
userSchema.statics.findByCredentials = async (username, passwd) => {
    const user = await userModel.findOne({ username });
    if (!user) {
        throw new Error({ error: 'Không tồn tại user' })
    }
    const isPasswordMatch = await bcrypt.compare(passwd, user.passwd)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Sai password' })
    }
    return user
}
let userModel = db.mongoose.model('userModel', userSchema);
module.exports = { userModel };