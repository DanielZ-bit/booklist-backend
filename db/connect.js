const { default: mongoose } = require("mongoose");

require("mongoose");

const connectDB= (url) =>{
    return mongoose.connect(url)

    
}

module.exports = connectDB;