import React, { useEffect, useRef, useState } from 'react'
import LogOut from './ChatContainerComps/LogOut'
import ChatInput from './ChatContainerComps/ChatInput'
import Messages from './ChatContainerComps/Messages'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/apiroutes'
import { v4 as uuidv4 } from "uuid"

const ChatContainer = ({ socket, currentUser, currentChat }) => {

    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    useEffect(() => {
        getMessages()
    }, [currentChat])

    const getMessages = async () => {
        const req = await fetch(getAllMessagesRoute, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: currentUser._id,
                to: currentChat._id,
            }),
        })
        const res = await req.json();
        setMessages(res)
    }


    const handleSendMsg = async (msg) => {
        const req = await fetch(sendMessageRoute, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            }),
        })
        const res = await req.json();
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        })

        const msgs = [...messages]
        msgs.push({ fromSelf: true, message: msg })
        setMessages(msgs)
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                console.log({msg})
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [])
    
    useEffect(() => {
        arrivalMessage && setMessages((prevmsgs) => {
            const arr=[...prevmsgs]
            arr.push(arrivalMessage)
            return arr
        })
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages])



    return (
        <div className='w-full h-full chat-header bg-[#131324] text-white font-[Helvetica] pt-5'>
            <div className="user-details flex justify-between items-center gap-4 px-8 h-[10%]">
                <div className="users flex justify-center items-center gap-4">
                    <div className="avatar">
                        <img className='w-16 h-16 cursor-pointer transition-all duration-200 hover:scale-110 ease-in-out' src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                    </div>
                    <div className="username text-2xl font-bold">
                        <h1>{currentChat.username}</h1>
                    </div>
                </div>
                <LogOut className="cursor-pointer transition-all duration-200 hover:scale-110 ease-in-out" />
            </div>
            <div className="messages h-[78%] py-5 flex flex-col gap-3 overflow-auto px-8">
                {messages.map((message) => {
                    return (<div ref={scrollRef} key={uuidv4()}>
                        <div className={`message flex items-center ${message.fromSelf ? "sended justify-end" : "received justify-start"}`}>
                            <div className={`content max-w-[40%] p-3 text-xl rounded-md text-[#d1d1d1] ${message.fromSelf ? "sended bg-[#4f04ff21]" : "received bg-[#9900ff20]"}`}>
                                <p>{message.message}</p>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    )
}

export default ChatContainer
