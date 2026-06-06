const jwt = require("jsonwebtoken");
const user = require("../models/user.model")

 const protect = async (req,res,next)=>{
      
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
       try{
         token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await user.findById(decoded.id).select("-password")

        return next();
       }
       catch(err){
        console.error("Token Verification fails",err.message)
        return res.status(401).json({message:"Not authorized"})
       }
    }
     return res.status(401).json({message:"Not authorized"})
}

module.exports = {protect};