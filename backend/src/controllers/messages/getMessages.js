const Conversation = require("../../database/models/conversationmodel");

const getMessages = async(req,res)=>{
    try{
        const userDetails = req.userDetails;
        const { id: messangerId } = req.params;
        if (!messangerId) {
            return res.status(401).send({
                success: false,
                message: "please select a friend.",
            })
        }
        let chats = await Conversation.findOne({ participants: { $all: [userDetails._id, messangerId] } }).populate("messages");
        if(!chats){
            return res.status(201).send({
                success: true,
                message: "No message",
                data: []
            })
        }
        return res.status(201).send({
            success: true,
            data: chats.messages
        })

    }catch(err){
        return res.status(501).send({
            success: false,
            message: err.message,
            data: err
        })
    }
}

module.exports = getMessages