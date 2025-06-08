const Conversation = require("../../database/models/conversationmodel");
const Message = require("../../database/models/messagemodel");
const { getRecieverId, io } = require('../../socket/socket');

const sendMessage = async (req,res) => {
    try {
        const userDetails = req.userDetails;
        const { id: messangerId } = req.params;
        const { content } = req.body;
        if (!messangerId) {
            return res.status(401).send({
                success: false,
                message: "please select a friend.",
            })
        }
        let chats = await Conversation.findOne({ participants: { $all: [userDetails._id, messangerId] } });

        if (!chats) {
            chats = new Conversation({
                participants: [userDetails._id, messangerId]
            })
            chats = await chats.save();
        }
        let sendResult = new Message({
            senderId: userDetails._id,
            recieverId: messangerId,
            content
        })
        sendResult = await sendResult.save();
        if(!sendResult){
            return res.status(401).send({
                success: false,
                message: "Coun dot send message."
            })
        }
        let result = await Conversation.findOneAndUpdate({ participants:{ $all: [userDetails._id, messangerId]}}, {
            $set: {
                messages: [...chats.messages, sendResult._id]
            }
        })

        // socket funtionality
        const recieverSocketId = getRecieverId(messangerId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit('newMessage',sendResult);
        }
        return res.status(201).send({ success: true, data: sendResult });
    } catch (err) {
        return res.status(501).send({
            success: false,
            message: err.message,
            data: err
        })
    }
}

module.exports = sendMessage;