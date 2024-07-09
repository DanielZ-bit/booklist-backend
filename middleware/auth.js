const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const { authenticate } = require('../errors')

const auth = async( req, res, next)=>{
    const authorisation = req.headers.authorization;
    if (!authorisation || !authorisation.startsWith(`Bearer `)){
        throw new authenticate("Unauthorized");
    }
    const token = authorisation.split(' ')[1];
    
    try{
        const match = jwt.verify(token, process.env.JWT_SECRET)
        req.user ={ UserID: match.UserID, name: match.name};
        //console.log(req.user)
        next()
    }
    catch(err){
        throw new authenticate(err)
    }
}
module.exports = auth;