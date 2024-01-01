const { throwErrorWithStatus } = require("./errorHandler");

const validateDto = (schema) => (req, res, next) => {
    // * error trả về null nếu như validate data hợp lệ
    // * và trả về error nếu như việc validate req.body bị lỗi
    const { error } = schema.validate(req.body);
    if (error) {
        // console.log(error.details[0].message);
        const message = error.details[0].message.replaceAll(`\"`, "");
        // console.log(message);
        // error.details là 1 mảng các obj, trong đó có message, path, type,context
        throwErrorWithStatus(401, message, res, next);
    }
    next();
};

module.exports = validateDto;
