const jwt = require('jsonwebtoken');
const { User } = require('../models');


const protect = async(req,res,next)=>{
    let token;
    if(re.headers.authorization && req.headers.authorization.startswith("Bearer")){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded =- await jwt.verify(token,process.env.jwt_secret);
            req.user = await User.findById(decoded.id).select("-password");
            return next();
        }catch(err){
            res.status(401).json({
                message:err.message
            })
        }
    }
    res.status(401).json({
        message:'No token Provided'
    })
}

const authorizeRole = (role)=>(req,res,next)=>{
    if(!req.user || !role.includes(req.user.role)){
        return res.status(403).json({
            message:`Access Denied: permission  not granted only ${role} can access!!`
        })
    }
    next();
}

module.exports = {
    protect,
    authorizeRole
}