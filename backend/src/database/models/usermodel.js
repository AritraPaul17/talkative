const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:16
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:4,
        max:16
    },
    profilepic:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const User = mongoose.model('user',userSchema);
module.exports = User;