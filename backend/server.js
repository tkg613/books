const express = require('express')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000


connectDB()

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/profile', require('./routes/profileRoutes'))
app.use('/api/books', require('./routes/bookRoutes'))

app.listen(PORT, console.log('Server started on port', PORT))
