const {User} = require('../models/index');
const jwt = require('jsonwebtoken');

const registerUser = async ({name,email,password})=>{
    const existingUser = await User.findOne({email});
    if(existingUser) throw new Error("User Already Registered!!");
    const user = await User.create({name,email,password});
    return generateTokenResponse(user);
}

const loginUser  = async({email,password})=>{
const existingUser = await User.findOne({email});
if(!existingUser) throw new Error("Invalid Credentials");

const isPasswordMatch = await existingUser.comparePassword(password);
if(!isPasswordMatch)throw new Error("Invalid Credentials");

return generateTokenResponse(existingUser);
}

const generateTokenResponse = (user)=>{
    const token = jwt.sign({id:user._id},process.env.jwt_secret,{
        expiresIn:process.env.jwt_expiresIn
    })

    return {
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    }
} 

module.exports = {
    registerUser,
    loginUser
}