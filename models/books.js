const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    Book :{
        type: String,
        required: [true, 'please provide book name'],
        maxlength: 50
    },
    Status : {
        type: String,
        enum: ['Not Started', 'Currently Reading', 'Finished'],
        default: 'Not Started'
    },
    Rating : {
        type: Number
    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        ref : 'user',
        required: [true, "provide user"]
    }

}, {timestamps: true})

module.exports = mongoose.model("books", bookSchema)