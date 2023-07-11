const express = require("express")
const path = require('path')
const dotenv = require("dotenv").config({path: path.resolve(__dirname, '../../.env')})
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the Support Desk API.'})
})

app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))


