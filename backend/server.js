const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
var cors = require('cors')

const app = express()
const port = 5000

// setup for post requests
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// handle cors 
app.use(cors())

// Connecting server to database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(console.log("Database Connected")).catch(err => console.log(err))

const profileRouter = require('./routes/profiles') 
app.use('/profile', profileRouter)


app.listen(port, () => console.log(`Listening on port ${port}`))
