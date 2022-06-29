import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import web from './routers/web.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import MongoDbStore from 'connect-mongo'
import session from 'express-session'


//Calling Functions
const MongoDBSTORE = MongoDbStore(session)
dotenv.config()
const app = express()


//Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

//Calling .env file value
const URL = process.env.MONGODB_CONNECTION_STRING
const port = process.env.PORT

//Connect to mongoDB
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(port, () => {
        console.log(`listiening at port ${port}`);
    })
}).catch((error) => console.log(`Unable to connect because -> ${error}`))

const connection = mongoose.connection

//Session connection
let mongoStore = new MongoDBSTORE({
    mongooseConnection: connection,
    collection: 'sessions'
})

app.use(session({
    secret: process.env.SECTRE_KEY,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 10 } //life 10 min
}))

//Set Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

//routes
web(app)
app.use((req, res) => {
    res.status(404).send("Page not found")
})

