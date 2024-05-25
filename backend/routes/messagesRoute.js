const express = require('express')
const { addMessage, getAllMessage } = require('../controllers/messagesController')
const messagesrouter = express.Router()
const cors=require("cors")

messagesrouter.use(cors())
messagesrouter.use(express.json())

messagesrouter.post('/getmsg',getAllMessage)
messagesrouter.post('/addmsg',addMessage)

module.exports = messagesrouter