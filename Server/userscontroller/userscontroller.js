import bcrypt from "bcrypt"
import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import User from "../models/registerschema.js"
import 'dotenv/config'

export const registerRoute = async (req,res) => {
    console.log("mohit")
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
    return res.json({ status: true, user })
}

export const loginRoute = async (req,res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    if (!user) {
        res.json({ msg: "Incorrect username or password", status: false })
    }
    const isPasswordValid = bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        res.json({ msg: "Incorrect username or password", status: false })
    }
    delete user.password
    return res.json({ status: true, user })
}

export const setAvatarRoute = async (req,res) => {
    console.log(req.body)
    const userId = req.body.userID;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
        isAvatarImageSet: true,
        avatarImage,
    })
    console.log(userData)
    console.log(userData.isAvatarImageSet)
    return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
}

