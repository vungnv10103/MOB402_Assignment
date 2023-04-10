var md = require("../../models/user.model");
const bcrypt = require("bcrypt");

exports.listUser = async (req, res, next) => {
    try {
        let list = await md.userModel.find();
        if (list) {
            return res.render("manageUser", {
                title: "Quản lí người dùng ",
                data: list,
            });
            // return res.status(200).json({ data: list, msg: 'Lấy dữ liệu thành công' });
        } else {
            return res.status(204).json({ msg: "Không có dữ liệu" });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    // res.json( {status: 1, msg: 'Trang danh sách user'});
};

exports.login = async (req, res, next) => {
    try {
        const user = await md.userModel.findByCredentials(
            req.body.username,
            req.body.passwd
        );
        if (!user) {
            return res.status(401).json({ error: "Sai thông tin đăng nhập" });
        }
        // đăng nhập thành công, tạo token làm việc mới
        const token = await user.generateAuthToken();
        return res.redirect("/main");
        // return res.render('main', { title: 'Quản lí bán hàng' , token: token});
        // return res.status(200).json({ user, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
    // res.json( {status: 1, msg: 'Trang đăng nhập'});
};

exports.reg = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log(salt, req.body);
        const user = new md.userModel(req.body);
        user.passwd = await bcrypt.hash(req.body.passwd, salt);
        const token = await user.generateAuthToken();
        let new_u = await user.save();
        return res.redirect("/main");
        return res.status(201).json({ user: new_u, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
    // res.json( {status: 1, msg: 'Trang đăng ký'});
};

exports.profile = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const userInfo = await md.userModel.findOne({ id: userID });
        return res.render("profile", {
            title: "Thông tin người dùng ",
            data: userInfo,
        });
        return res.json({ data: userInfo });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    res.send(req.user);
    // res.json( {status: 1, msg: 'Trang thông tin'});
};
exports.getProfile = async (req, res, next) => {
    try {
        const userID = req.params._id;
        const userInfo = await md.userModel.findOne({ id: userID });
        return res.json({ data: userInfo });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    res.send(req.user);
    // res.json( {status: 1, msg: 'Trang thông tin'});
};
exports.updateProfile = async (req, res, next) => {
    try {
        const data = req.body;
        // return res.status(200).json(data);
        const username = data.username;
        const options = { new: true };

        const updateProfile = await md.userModel.findOneAndUpdate(
            { username },
            data,
            options
        );
        let dataUser = await md.userModel.find();
        if (dataUser) {
            return res.render("profile", {
                title: "Thông tin người dùng ",
                data: dataUser,
            });
            // return res.status(200).json({ data: list, msg: 'Lấy dữ liệu thành công' });
        } else {
            return res.status(204).json({ msg: "Không có dữ liệu" });
        }
        return res.status(200).json(updateProfile);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
exports.logout = async (req, res, next) => {
    try {
        console.log(req.user);
        // req.user.generateAuthToken();
        // req.user.token = null; //xóa token
        // await req.user.save()
        return res.redirect("/login");
        return res.status(200).json({ msg: "Đăng xuất thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
    //    res.json( {status: 1, msg: 'Trang đăng xuất'});
};
