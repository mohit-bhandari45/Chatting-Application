const express = require('express')
const { register, login, setAvatar } = require('../controllers/userscontroller')
const router = express.Router()
const cors=require("cors")

router.use(cors())
router.use(express.json())

router.post('/register',register)
router.post('/login',login)
router.post('/setAvatar/:id',setAvatar)

module.exports = router