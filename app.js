require('dotenv').config(); // need this to access connections
require("express-async-errors");
const express = require("express")
const authRoute = require("./routes/auth")
const bookRoute = require("./routes/books")
const connectDB = require("./db/connect")
const notFound = require("./middleware/notfound")
const errorHandler = require('./middleware/errorhandler')
const authorise = require('./middleware/auth')
const helmet = require('helmet')
const cors = require ('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

app = express();

app.use(express.json());

app.set('trust proxy',1 )
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,

}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req,res)=>{res.send("test")});

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/books', authorise, bookRoute)

app.use(notFound);
app.use(errorHandler)
const port = process.env.PORT || 3000;
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`testing for connection on port ${port}`))
    }
    catch (error) {
        console.log(error);
    }
}

start();