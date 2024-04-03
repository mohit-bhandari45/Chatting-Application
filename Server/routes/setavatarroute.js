import express from "express"
const router = express.Router()
import { setAvatarRoute } from "../userscontroller/userscontroller.js"


router.post('/', setAvatarRoute)

export default router