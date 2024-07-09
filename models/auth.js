const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Name'],
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please Enter Email'],
        match: [
           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        minLength: 6,
}
})

authSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

authSchema.methods.createJWT =  function(){
    return jwt.sign({UserID: this._id, name: this.name},process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME}) 
}
authSchema.methods.comparePasswords = async function (userpassword) {
   const passMatch = await bcrypt.compare(userpassword, this.password)
   return passMatch
}
module.exports = mongoose.model("user", authSchema)