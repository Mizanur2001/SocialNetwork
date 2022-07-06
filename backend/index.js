import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import web from './routers/web.js'
import bodyParser from 'body-parser'
import cors from 'cors'


//Calling Functions
dotenv.config()
const app = express()


//Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: "http://localhost:3000"
}))

//Calling .env file value
const URL = process.env.MONGODB_CONNECTION_STRING
const port = process.env.PORT

//Connect to mongoDB
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(port, () => {
        console.log(`listiening at port ${port}`);
    })
}).catch((error) => console.log(`Unable to connect because -> ${error}`))


//routes
web(app)
app.use((req, res) => {
    res.status(404).send("Page not found")
})

