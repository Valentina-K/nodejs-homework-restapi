const isEmptyBody = () => {
    return (req, res, next) => {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            const error = new Error("missing fields");
            error.status = 400;
            next(error);
        }
        next();
    }
}
module.exports = isEmptyBody;