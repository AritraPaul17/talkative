const jwt = require('jsonwebtoken');

const generateToken = async (id,res)=>{

    const token = jwt.sign({id}, process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
    // res.cookie("Talkative",token,{
    //     maxAge: 7*24*60*60*1000,
    //     httpOnly:false,
    //     // sameSite:"strict",
    // })
    
    return token;
}
module.exports = generateToken;