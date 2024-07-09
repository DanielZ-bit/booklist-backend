const { StatusCodes } = require("http-status-codes")
const User = require("../models/auth")
const { badRequest, authenticate } = require("../errors")

const register = async (req, res) =>{
    
    const user = await User.create({...req.body})
    token = user.createJWT()
    
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
    
}
const login = async (req, res) => {
    
    const {email, password} = req.body
    if (! email || !password){
        throw new badRequest ("Please Enter credentials")
    }
    const user = await User.findOne({email});
     if (!user){
         throw new authenticate("No user with that email")
     }
    
    const testingPassword = await user.comparePasswords(password);
    if (!testingPassword) {
        throw new authenticate("wrong password")
     }
     const token = user.createJWT()
     res.status(StatusCodes.OK).json({user: {user: user.name}, token})
     
 }

module.exports = { register, login}