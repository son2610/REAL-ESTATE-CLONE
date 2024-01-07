const { throwErrorWithStatus } = require("./errorHandler");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers?.authorization?.startsWith("Bearer");
    if (!token)
        return throwErrorWithStatus(401, "Creds not provide", res, next);

    const rawToken = req.headers?.authorization?.split(" ")[1];
    //Kiểm tra xem token có hợp lệ hay không
    jwt.verify(rawToken, process.env.JWT_SECRET, (err, decode) => {
        if (err) throwErrorWithStatus(401, "Creds invalid", res, next);
        console.log("Check decode in middleware in verifytoken", decode);
        // decode chính là cái object của user gồm: uid và role ->
        req.user = decode;
        next();
    });
};

// Hàm check này sẽ chạy sau hàm verify ở trên, để bản bảo hàng req.user đã được gán sau khi user đăng nhập thành công
const isAgent = (req, res, next) => {
    const { roleCode } = req.user;
    if (roleCode !== "ROLE1" || roleCode !== "ROLE3" || roleCode !== "ROLE5") {
        return throwErrorWithStatus(
            401,
            "Bạn không có quyền truy cập !!!",
            res,
            next
        );
    }
    next();
};
const isOwner = (req, res, next) => {
    const { roleCode } = req.user;
    if (roleCode !== "ROLE1" || roleCode !== "ROLE3") {
        return throwErrorWithStatus(
            401,
            "Bạn không có quyền truy cập !!!",
            res,
            next
        );
    }
    next();
};
const isAdmin = (req, res, next) => {
    const { roleCode } = req.user;
    console.log("check roleCode", roleCode);
    if (roleCode !== "ROLE1") {
        return throwErrorWithStatus(
            401,
            "Bạn không có quyền truy cập !!!",
            res,
            next
        );
    }
    next();
};

module.exports = {
    verifyToken: verifyToken,
    isAgent: isAgent,
    isOwner: isOwner,
    isAdmin: isAdmin,
};
