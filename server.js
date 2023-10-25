// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')


// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})
// CONTROLLERS 
const bandsController = require('./controllers/bands_controller')
const eventsController= require('./controllers/event_controller')
const stagesController= require('./controllers/stage_controller')
app.use('/bands', bandsController)
app.use('/events', eventsController)
app.use('/stages', stagesController)


// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})