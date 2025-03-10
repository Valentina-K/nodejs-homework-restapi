const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const {sendEmail} = require("../../helpers");
require("dotenv").config();

const {BASE_URL} = process.env;

const resendEmail = async(req,res,next) => {
    const {email} =req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            throw HttpError(404, "User not found");
        }
        if(user.verify){
            throw HttpError(400, "Verification has already been passed");
        }
        const verifyEmail = {
            to: email,
            subject: "Verify email",
            html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`
        };

        await sendEmail(verifyEmail);
        res.status(200).json({
            message: "Verification email sent"
        })
        
    } catch (error) {
        next(error)
    }
    
}

module.exports = resendEmail;