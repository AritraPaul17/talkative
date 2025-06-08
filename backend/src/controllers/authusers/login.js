const User = require("../../database/models/usermodel");
const bcryptjs = require('bcryptjs');
const generateToken = require("../../helpers/token");

const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:"Please fill all the field."
            })
        }
        //finding user
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send({
                success: false,
                message:"Incorrect Email / Password.",
            })
        }
        //matching password
        const checkPassword = await bcryptjs.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).send({
                success: false,
                message: "Incorrect Email / Password."
            })
        }
        const token = generateToken(user._id,res);
        return res.status(201).send(
            {
                success: true,
                message:"successfully logged in.",
                data:user,
                token
            }
        )
    }
    catch(err){
        return res.status(501).send({
            success: false,
            message:err.message,
            data:err
        })
    }
}

module.exports = login;