const { urlencoded } = require('express')
const express = require('express')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

const app = express()
app.use(urlencoded({extended: false}))
app.use(express.json())

connectDB()

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/profile', require('./routes/profileRoutes'))
app.use('/api/books', require('./routes/bookRoutes'))

app.listen(PORT, console.log('Server started on port', PORT))
