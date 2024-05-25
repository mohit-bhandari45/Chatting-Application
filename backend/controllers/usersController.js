const User = require("../models/userModels")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const usernameCheck = await User.findOne({ username })
        if (usernameCheck) {
            return res.json({ msg: "Username already used", status: false })
        }
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.json({ msg: "Email already used", status: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        delete user.password
        return res.json({ status: true, user })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({ msg: "Incorrect username or password", status: false })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.json({ msg: "Incorrect username or password", status: false })
        }
        delete user.password
        return res.json({ status: true, user })
    } catch (error) {
        console.log(error)
    }
}

const setAvatar = async (req, res) => {
    try {
        const userId = req.params.id
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        })
        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
    } catch (error) {
        console.log(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "username",
            "email",
            "avatarImage",
            "_id",
        ])
        return res.json(users)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    register,
    login,
    setAvatar,
    getAllUsers
}