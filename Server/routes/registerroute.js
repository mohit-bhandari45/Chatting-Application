import express from "express"
const router = express.Router()
import { registerRoute } from "../userscontroller/userscontroller.js"


router.post('/', registerRoute)

export default router