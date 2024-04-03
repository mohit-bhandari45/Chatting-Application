import express from "express"
const router = express.Router()
import { registerRoute,loginRoute,setAvatarRoute } from "../userscontroller/userscontroller.js"


router.post('/', registerRoute)

export default router