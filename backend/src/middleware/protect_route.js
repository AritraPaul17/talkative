const jwt = require('jsonwebtoken');
const User = require('../database/models/usermodel');

const protectRoute = async (req, res, next) => {
    try {
        // const token = req.cookies.Talkative;
        // console.log(token);
        const token = req.header("Talkative");
        
        if (!token) {
            return res.status(201).send({ success: false, message: "Please login....." })
        }
        const tokenDetails = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!tokenDetails) {
            return res.status(401).send({ success: false, message: "Please login." })
        }
        const userDetails = await User.findById(tokenDetails.id).select("-password");
        if (!userDetails) {
            return res.status(401).send({ success: false, message: "Please login first." })
        }
        req.userDetails = userDetails;
        next();
    } catch (err) {
        console.log(err);
        return res.status(501).send({
            success: false,
            message: err.message,
            data: err
        })
    }
}

module.exports = protectRoute;