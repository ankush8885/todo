class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const ErrorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.StatusCode = err.statusCode || 500;

    return res.json({
        message: err.message,
        statusCode: err.StatusCode
    })
}

export default ErrorHandler;