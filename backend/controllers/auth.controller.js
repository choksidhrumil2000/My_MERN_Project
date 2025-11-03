const {authService} = require('../services/index');

const register = async (req,res)=>{
const user = req.body;
try{
    const result = await authService.registerUser(user);
    res.status(200).json({
        result,
        message:"User Registered Successfully!!!"
    })
}catch(err){
    res.status(400).json({
        message:err.message
    })
}
}

const login = async(req,res)=>{
    const userData = req.body;
    try{
        const result = await authService.loginUser(userData);
        res.status(200).json({
            message:'User LoggedIn Successfully!!'
        })
    }catch(err){
        res.status(401).json({
            message:err.message,
        })
    }
}

const logout = async(req,res)=>{

}


module.exports = {
    register,
    login,
    logout
}