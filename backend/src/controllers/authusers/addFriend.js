const Friend = require("../../database/models/friendsModel");

const addFriend = async (req, res) => {
    try{
        const userDetails = req.userDetails;
        const {id:friendId} = req.body;
        if(!friendId){
            return res.status(401).send({
                success: false,
                message:"please send a friend.",
            })
        }
        let friends = await Friend.findOne({ userId:userDetails._id });
        let result = await Friend.findOneAndUpdate({userId: userDetails._id},{
            $set: {
                participants: [...friends.participants,friendId]
            }
          })
        let friends2 = await Friend.findOne({ userId:friendId });
        let result2 = await Friend.findOneAndUpdate({userId: friendId},{
            $set: {
                participants: [...friends2.participants,userDetails._id]
            }
          })
        return res.status(201).send({ success: true, data: result });
    }catch(err){
        return res.status(501).send({
            success: false,
            message:err.message,
            data:err
        })
    }
}

module.exports = addFriend;