import React, { useState } from 'react'
import Picker from "emoji-picker-react"
import { IoMdSend } from "react-icons/io"
import { BsEmojiSmileFill } from "react-icons/bs"

const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("")

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (e, emoji) => {
        let message = msg;
        message += emoji.emoji
        setMsg(message)
    }
    
    const sendChat=(e) => {
      e.preventDefault()
      if(msg.length>0){
        handleSendMsg(msg)
        setMsg("")
      }
    }
    

    const handleMsgChange = (e) => {
        setMsg(e.target.value)
    }
    return (
        <div className='inputs flex h-[12%] justify-center items-center bg-[#080420] px-5 gap-3 py-6'>
            <div className='button-container flex justify-center items-center'>
                <div className="emoji relative">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} className='cursor-pointer text-2xl text-[#ffff00c8]' />
                    {
                        showEmojiPicker && <div className='absolute top-[-500px]'>
                            <Picker className='bg-[#080420] border-[#9186f3] border-2 shadow-sm shadow-[#9a86f3]' onEmojiClick={handleEmojiClick} />
                        </div>
                    }
                </div>
            </div>
            <form onSubmit={sendChat} className='input-container w-[100%] rounded-3xl flex justify-center items-center gap-4 bg-[#ffffff34]'>
                <input className='w-[88%] pl-4 h-[50%] bg-transparent text-white border-none outline-none text-base' value={msg} onChange={handleMsgChange} type="text" name="" placeholder='Type Your Message Here' id="" />
                <button className='py-2 px-10 bg-[#9a86f3] border-none outline-none text-black rounded-3xl' type="submit">
                    <IoMdSend className='text-2xl text-white' /></button>
            </form>
        </div>
    )
}

export default ChatInput
