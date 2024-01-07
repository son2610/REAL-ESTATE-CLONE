// xac thuc nguoi dung
const asyncHandler = require("express-async-handler");

const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const { Op, Sequelize } = require("sequelize");

const redis = require("../config/redis.config");

const createNewPropertyType = asyncHandler(async (req, res) => {
    // Ham handler xu ly logic
    const { name } = req.body;
    // findOrCreate trả về 1 mảng 2 đối số, 1 là dataValues, 2 là true/false
    const response = await db.PropertyType.findOrCreate({
        where: { name },
        defaults: req.body,
    });
    console.log("check response on create new property type", response);
    return res.json({
        success: response[1],
        mes: response[1] ? "Created" : "Name property duplicated",
        propertyType: response[0],
    });
});

const getNewPropertyType = asyncHandler(async (req, res) => {
    // Ham handler xu ly logic
    const { limit, page, fields, name, sort, ...query } = req.query;

    // Limit fields
    const options = {};
    if (fields) {
        const attributes = fields.split(",");
        const isExclude = attributes.some((item) => item.startsWith("-"));
        if (isExclude) {
            options.attributes = {
                exclude: attributes.map((item) => item.replace("-", "")),
            };
        } else {
            options.attributes = attributes;
        }
    }

    //Filter by client queries
    if (name)
        query.name = Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("name")),
            "LIKE",
            `%${name.toLocaleLowerCase()}%`
        ); // Sequelize query sensitive

    //Sorting
    //order = [[name, ASC], [Descriptors, DESC]]; <= cú pháp để sort trong Sequelize
    //sort = [name, -description] <= query params truyen len
    if (sort) {
        const order = sort
            .split(",")
            .map((item) =>
                item.startsWith("-")
                    ? [item.replace("-", ""), "DESC"]
                    : [item, "ASC"]
            );
        options.order = order;
    }

    if (!limit) {
        const response = await db.PropertyType.findAll({
            where: query,
            ...options,
        });
        redis.set("get-property-type", JSON.stringify(response));
        return res.json({
            success: response.length > 0,
            mes: response.length > 0 ? "Got" : "Can't get propertyType",
            propertyType: response,
        });
    }
    //Pagination
    //limit: số lượng phần tử 1 trang.
    //page: số trang
    //offset: phần tử từ phần tử thứ bao nhiêu, nếu page=2, limit=1, thì offset là ...1(Lay phan tu dau tien cua trang 2)
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const offset = (prevPage - 1) * limit;
    if (offset) options.offset = offset;
    options.limit = +limit;
    console.log(options);
    const response = await db.PropertyType.findAndCountAll({
        where: query,
        ...options,
    });
    return res.json({
        success: response.length > 0,
        mes: response.length > 0 ? "Got" : "Can't get propertyType",
        propertyType: response,
    });
});

const updateNewPropertyType = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0)
        return throwErrorWithStatus(
            403,
            "Need less 1 argument to update",
            res,
            next
        );
    const response = await db.PropertyType.update(req.body, {
        where: { id },
    });
    console.log("check response on create new property type", response);
    return res.json({
        success: response[0] > 0,
        mes: response[0] > 0 ? "Updated" : "No data is updated",
    });
});

const removeNewPropertyType = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const response = await db.PropertyType.destroy({
        where: { id },
    });
    console.log("check response on create new property type", response);
    return res.json({
        success: response > 0,
        mes: response > 0 ? "Removed" : "No data is Removed",
    });
});
module.exports = {
    createNewPropertyType,
    getNewPropertyType,
    updateNewPropertyType,
    removeNewPropertyType,
};
