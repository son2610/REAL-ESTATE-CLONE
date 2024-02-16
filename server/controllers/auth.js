// xac thuc nguoi dung
const asyncHandler = require("express-async-handler");

const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
    // phone, password, name, roleCode = [user,agent] => thông tin mà phía client gửi lên cho server

    // Thông thường sẽ có các kiểu truyền data từ client -> server
    // 1. client = urlencoded || formdata => req.body (đây là kiểu mà ta chọn)
    // 2. client = params (?q=abczyx) => req.query
    // 3. client = api/user/:id => req.params
    const { phone, name, password } = req.body;

    // Ham handler xu ly logic
    const response = await db.User.findOrCreate({
        where: { phone: phone },
        defaults: {
            phone,
            name,
            password,
        }, //bởi vì ta đã validate data nên ta có thể truyền thẳng req.body để gán dữ liệu, nếu k thì ta phải ghi là default: { password, phone, name, roleCode }
    });
    const userId = response[0].id;
    if (userId) {
        const roleCode = ["ROLE7"];
        if (req.body.roleCode) roleCode.push(req.body.roleCode);
        const roleCodeBulk = roleCode.map((role) => ({
            userId,
            roleCode: role,
        }));
        const updateRole = await db.User_Role.bulkCreate(roleCodeBulk);
        if (!updateRole) {
            await db.User.destroy({ where: { id: userId } });
        }
    }
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
        { uid: user.id, roleCode: user.roleCode },
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
