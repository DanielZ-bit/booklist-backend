express = require('express');
routes = express.Router();
const {register, login} = require('../controllers/auth')

routes.post('/register' , register)
routes.post('/login', login)

module.exports = routes;


