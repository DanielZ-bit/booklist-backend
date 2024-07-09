const { badRequest } = require("../errors");
const notFound = require("../middleware/notfound");
const Books = require("../models/books")
const {StatusCodes} = require("http-status-codes")

const getBooks = async (req, res) =>{
    const getbooks = await Books.find({createdBy : req.user.UserID}).sort("Book")
    res.status(StatusCodes.OK).json({getbooks, count: getbooks.length})
}

const createBooks = async(req, res) =>{
    req.body.createdBy = req.user.UserID
    books = await Books.create(req.body)
    res.status(StatusCodes.CREATED).json(books)
}

const getSingleBook = async(req, res) =>{
    //console.log(req.user)
     const { user: {UserID}, params: {id: textID}} = req;
     const book = await Books.findOne({_id:textID, createdBy:UserID})
     if (!book) {
        // If book is not found, send 404 Not Found response
        return notFound("book not found");
    }
     res.status(StatusCodes.OK).json(book);
}
const updateBooks = async(req, res) =>{
    const { user: {UserID}, params: {id: textID}, body: {Book}} = req;
    if (Book === '') {
        throw new badRequest("Please enter a book");
    }
    const book = await Books.findOneAndUpdate({_id:textID, createdBy:UserID}, req.body, {new: true, runValidators: true})
    if (!book) {
       // If book is not found, send 404 Not Found response
       return notFound("No Book Found");
   }
    res.status(StatusCodes.OK).json(book);
}

const deleteBooks = async(req, res) =>{
    const { user: {UserID}, params: {id: textID}} = req;
    const book = await Books.findOneAndDelete({_id:textID, createdBy:UserID})
    if (!book) {
       // If book is not found, send 404 Not Found response
       return res.status(404).json({ error: 'Book not found' });
   }
    res.status(StatusCodes.OK).send("Deleted");
}

module.exports = {
    getBooks, createBooks, getSingleBook, updateBooks, deleteBooks
}