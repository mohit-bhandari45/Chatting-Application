const Message = require("../models/messageModel")
const User = require("../models/userModels")
const bcrypt = require("bcrypt")

const addMessage = async (req, res) => {
    try {
        const { from, to, message } = req.body
        const data = Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })
        if (data) {
            return res.json({ msg: "Message added succussfully" })
        } else {
            return res.json({ msg: "failed to add message to database" })
        }
    } catch (error) {
        console.log(error)
    }
}

const getAllMessage = async (req, res) => {
    try {
        const { from, to } = req.body;
        const messages = await Message.find({
            users: {
                $all: [from, to],
            }
        }).sort({ updateAt: 1 })
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        return res.json(projectedMessages) 
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addMessage,
    getAllMessage
}