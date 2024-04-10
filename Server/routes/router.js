import express from "express"
import { loginRoute, registerRoute, setAvatarRoute } from "../userscontroller/userscontroller"
const router = express.Router()


router.post('/register', registerRoute)
router.post('/login', loginRoute)
router.post('/setavatar', setAvatarRoute)

export default router