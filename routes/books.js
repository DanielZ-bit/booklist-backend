const express = require("express");
router = express.Router();

const {getBooks, createBooks, getSingleBook, updateBooks, deleteBooks} = require('../controllers/books')

router.route('/').get(getBooks).post(createBooks);
router.route('/:id').get(getSingleBook).patch(updateBooks).delete(deleteBooks);

module.exports = router