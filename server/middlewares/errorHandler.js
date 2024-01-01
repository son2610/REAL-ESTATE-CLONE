const errorHandler = (err, req, res, next) => {
    const formattedMessage = err.message?.replaceAll(`\"`, "");
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: formattedMessage,
        success: false,
    });
};

const throwErrorWithStatus = (code, message, res, next) => {
    const formattedMessage = message?.replaceAll(`\"`, "");
    const error = new Error(formattedMessage);
    console.log("throwErrorWithStatus");
    res.status(code);
    next(error);
};

const badREquesExcepttion = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    console.log("bad REquesExcepttion");
    res.status(402);
    next(error);
};

module.exports = {
    errorHandler: errorHandler,
    throwErrorWithStatus: throwErrorWithStatus,
    badREquesExcepttion: badREquesExcepttion,
};
