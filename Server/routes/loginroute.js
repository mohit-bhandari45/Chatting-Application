import express from "express"
const router = express.Router()
import { registerRoute,loginRoute,setAvatarRoute } from "../controllers/userscontroller.js"


router.post('/', loginRoute)

export default router