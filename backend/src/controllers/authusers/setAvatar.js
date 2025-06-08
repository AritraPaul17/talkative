const User = require("../../database/models/usermodel");

const setAvatar = async (req, res) => {
    const { image } = req.body;
    const userDetails = req.userDetails;
    
    try {
        if(image===undefined){
            return res.status(401).send({
                success:false,
                message:"Please send a picture."
            })
        }
        const response = await User.findByIdAndUpdate(userDetails._id, { profilepic:image }, { new: true });
        if (!response) {
            return res.status(501).send({
                success: false,
                message:"Some internal error occured.",
            })
        }
        return res.status(201).send({
            success: true,
            message:"Profile picture uploaded.",
            data:response
        })
    }catch(err){
        return res.status(501).send({
            success: false,
            message:err.message,
            data:err
        })
    }
}

module.exports = setAvatar;