const getuser = async(req,res)=>{
    const userDetails = req.userDetails;
    return res.status(201).send({success:true,data:userDetails});
}

module.exports = getuser;