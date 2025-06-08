const jwt = require('jsonwebtoken');

const generateToken = async (id,res)=>{

    const token = jwt.sign({id}, process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
    res.cookie("Talkative",token,{
        domain:"http://localhost:5173",
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
        // sameSite:"strict",
    })
    return token;
}
module.exports = generateToken;