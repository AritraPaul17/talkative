const Friend = require("../../database/models/friendsModel");
const User = require("../../database/models/usermodel");

const getFriend = async (req, res) => {
    try{
        const userDetails = req.userDetails;
        const friends = await Friend.find({ userId:userDetails._id }).populate("participants").select("-password");
        if(!friends){
            return res.status(201).send({ success: false, data: friends[0].participants });
        }
        return res.status(201).send({ success: true, data: friends[0].participants });
    }catch(err){
        // console.log(err.message);
        return res.status(501).send({
            success: false,
            message:err.message,
            data:err
        })
    }
}

module.exports = getFriend; 