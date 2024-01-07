const {
    errorHandler,
    badREquesExcepttion,
} = require("../middlewares/errorHandler");
const auth = require("./auth");
const user = require("./user");
const insert = require("./insert");
const propertyType = require("./propertyType");

//Hàm này dùng để import tất cả các router cần có dể chạy api
// Và sẽ chạy từ trên xuống dưới
const initRoutes = (app) => {
    app.use("/api/user", user);
    app.use("/api/auth", auth);
    app.use("/api/insert", insert);
    app.use("/api/property-type", propertyType);

    app.use(badREquesExcepttion); // tương đương app.use("/",badREquesExcepttion);
    app.use(errorHandler);
};

module.exports = initRoutes;
