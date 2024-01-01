// xac thuc nguoi dung
const asyncHandler = require("express-async-handler");

const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
    // phone, password, name, role = [user,agent] => thông tin mà phía client gửi lên cho server

    // Thông thường sẽ có các kiểu truyền data từ client -> server
    // 1. client = urlencoded || formdata => req.body (đây là kiểu mà ta chọn)
    // 2. client = params (?q=abczyx) => req.query
    // 3. client = api/user/:id => req.params
    const { phone } = req.body;

    // Ham handler xu ly logic
    const response = await db.User.findOrCreate({
        where: { phone: phone },
        defaults: req.body, //bởi vì ta đã validate data nên ta có thể truyền thẳng req.body để gán dữ liệu, nếu k thì ta phải ghi là default: { password, phone, name, role }
    });
    return res.json({
        success: response[1],
        mes: response[1]
            ? "Your account is created successfully"
            : "Phone Numeber already had exists",
    });
    // console.log("check response: ", response);
    //
});

//Đăng nhập
const signIn = asyncHandler(async (req, res, next) => {
    const { phone, password } = req.body;

    const user = await db.User.findOne({
        where: { phone: phone },
    });
    if (!user) {
        return throwErrorWithStatus(
            403,
            "User not found or unregistered",
            res,
            next
        );
    }
    const isMatchingPassword = bcrypt.compareSync(password, user.password);
    if (!isMatchingPassword) {
        return throwErrorWithStatus(401, "Password is wrong", res, next);
    }
    const token = jwt.sign(
        { uid: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    return res.json({
        success: true,
        mes: "Sign in successfully",
        accessToken: token,
    });
});

module.exports = {
    register,
    signIn,
};
