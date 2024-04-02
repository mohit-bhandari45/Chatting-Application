import express from "express"
const router = express.Router()
import mongoose from "mongoose";
import User from "Server/models/register.js"

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(()=>{
    console.log("DB connection Successful");
  }).catch((err)=>{
    console.log(err.message);
  })

// const app = express()
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const userCheck = await User.findOne({ username })
    if (userCheck) {
        res.json({ msg: "Username already exist", status: false })
    }
    const emailCheck = await User.findOne({ email })
    if (emailCheck) {
        res.json({ msg: "Email already used", status: false })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username, email, password: hashedPassword
    })
    delete user.password;
    res.json({ status: true, user })
})

export default { router }
// module.exports(router)