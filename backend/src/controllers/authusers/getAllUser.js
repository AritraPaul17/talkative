const User = require("../../database/models/usermodel");

const getAllUser = async (req, res) => {
    try{
        const userDetails = req.userDetails;
        const allUsers = await User.find({ _id: { $ne: userDetails._id } }).select("-password");
        return res.status(201).send({ success: true, data: allUsers });
    }catch(err){
        return res.status(501).send({
            success: false,
            message:err.message,
            data:err
        })
    }
}

module.exports = getAllUser;