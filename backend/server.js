
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

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))


