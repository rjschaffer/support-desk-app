const path = require('path')
const express = require("express")
require('colors')
require("dotenv").config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
// const dotenv = require("dotenv").config({path: path.resolve(__dirname, '../.env')})

// connect to database

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the Support Desk API.'})
})

app.use(errorHandler)

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))


