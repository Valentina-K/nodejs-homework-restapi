const HttpError = require("../helpers/httperror");
const { User } = require("../models/user");

const verifyEmail = async (req, res, next)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user || !user.verify) {
            next(HttpError(400, "Verification failed"))
        } 
        next()       
    } catch {
        next(HttpError(400, "Verification failed"));
    }
}

module.exports = verifyEmail;