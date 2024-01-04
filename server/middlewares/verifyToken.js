const { throwErrorWithStatus } = require("./errorHandler");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers?.authorization?.startsWith("Bearer");
    if (!token)
        return throwErrorWithStatus(401, "Creds not provide", res, next);
    const rowToken = req.headers?.authorization?.split(" ")[1];

    //Kiểm tra xem token có hợp lệ hay không
    jwt.verify(rowToken, process.env.JWT_SECRET, (err, decode) => {
        if (err) throwErrorWithStatus(401, "Creds invalid", res, next);
        console.log("Check decode in middleware in verifytoken", decode);
        // decode chính là cái object của user gồm: uid và role ->
        req.user = decode;
        next();
    });
};

module.exports = {
    verifyToken: verifyToken,
};
