const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        default:[]
    }],
},{
    timestamps:true
})

const Friend = mongoose.model('friend',friendSchema);
module.exports = Friend;