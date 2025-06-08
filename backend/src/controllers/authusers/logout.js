const logout = (req,res)=>{
    res.cookie("Talkative","",{
        maxAge: 0,
    })
    res.status(201).send({
        success:true,
        message:"Logged out successfully."
    })
}
module.exports = logout;