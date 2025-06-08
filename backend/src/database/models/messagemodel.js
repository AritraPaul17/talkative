const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String
    }
},{
    timestamps:true
})

const Message = mongoose.model('message',messageSchema);
module.exports = Message;