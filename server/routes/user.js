const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/user");
const validateDto = require("../middlewares/validation");
const { stringReq, numberReq } = require("../middlewares/joiSchema");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/current", verifyToken, ctrls.getCurrent);
router.get("/roles", ctrls.getRoles);

module.exports = router;
