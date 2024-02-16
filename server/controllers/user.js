// xac thuc nguoi dung
const asyncHandler = require("express-async-handler");

const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const getCurrent = asyncHandler(async (req, res) => {
    // phone, password, name, role = [user,agent] => thông tin mà phía client gửi lên cho server

    // Thông thường sẽ có các kiểu truyền data từ client -> server
    // 1. client = urlencoded || formdata => req.body (đây là kiểu mà ta chọn)
    // 2. client = params (?q=abczyx) => req.query
    // 3. client = api/user/:id => req.params

    //uid được lấy sau khi thằng middeware verifyToken được được thực hiện xong và không có lỗi
    const { uid } = req.user;

    // Ham handler xu ly logic
    const response = await db.User.findByPk(uid, {
        attributes: {
            exclude: ["password"],
        },
        include: [
            {
                model: db.User_Role,
                attributes: ["roleCode"],
                as: "userRoles",
                include: [
                    {
                        model: db.Role,
                        as: "roleName",
                        attributes: ["value"],
                        nest: false,
                    },
                ],
            },
        ],
    });
    return res.json({
        success: Boolean(response),
        mes: response ? "Got" : "Cannot get user.",
        currentUser: response,
    });
    // console.log("check response: ", response);
    //
});

const getRoles = asyncHandler(async (req, res) => {
    const response = await db.Role.findAll({
        attributes: ["code", "value"],
    });
    return res.json({
        success: Boolean(response),
        mes: response ? "Got" : "Cannot get roles.",
        roles: response,
    });
});

module.exports = {
    getCurrent,
    getRoles,
};
