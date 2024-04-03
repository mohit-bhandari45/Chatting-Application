import express from "express"
const router = express.Router()
import { loginRoute } from "../userscontroller/userscontroller.js"


router.post('/', loginRoute)

export default router