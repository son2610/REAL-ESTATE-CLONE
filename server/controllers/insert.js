// init những role ban đầu trước khi tạo crud trong file propertiy
const asyncHandler = require("express-async-handler");

const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const { roles } = require("../utils/constants");

const initRoles = asyncHandler(async (req, res) => {
    const response = await db.Role.bulkCreate(roles);
    return res.json({
        success: Boolean(response),
        mes: response ? "Inserted" : "Some thing went wrong!!!!",
    });
});

module.exports = {
    initRoles,
};
