const express = require('express')
const { register, login, setAvatar, getAllUsers } = require('../controllers/userscontroller')
const router = express.Router()
const cors=require("cors")

router.use(cors())
router.use(express.json())

router.post('/register',register)
router.post('/login',login)
router.post('/setAvatar/:id',setAvatar)
router.get('/allUsers/:id',getAllUsers)

module.exports = router