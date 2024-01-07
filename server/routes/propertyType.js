const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/propertyType");
const validateDto = require("../middlewares/validation");
const { stringReq, string } = require("../middlewares/joiSchema");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const rateLimiter = require("../middlewares/rateLimiter");

router.use(rateLimiter);
router.post(
    "/",
    verifyToken,
    isAdmin,
    validateDto(
        Joi.object({
            name: stringReq,
            description: stringReq,
            images: stringReq,
        })
    ),
    ctrls.createNewPropertyType
);
router.get("/", ctrls.getNewPropertyType);

router.patch(
    "/:id",
    verifyToken,
    isAdmin,
    validateDto(
        Joi.object({
            name: string,
            description: string,
            images: string,
        })
    ),
    ctrls.updateNewPropertyType
);

router.delete("/:id", verifyToken, isAdmin, ctrls.removeNewPropertyType);
module.exports = router;
