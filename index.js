const express = require('express')
const path = require('path')

const app = express()
const logger = require('./middleware/logger')
const handlebars = require('handlebars')

// Init middleware
// app.use(logger)

// Body Parser Middleware
app.use(express.json()) //This middleware allow us to read JSON objects on req object
// app.use(express.urlencoded({ extended: false })) //This middleware allow us to read form sumbissions

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

