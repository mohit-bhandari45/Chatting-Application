import express from "express"
const router = express.Router()

app.post('/register', async (req, res) => {
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

// module.exports = router