import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute, host } from '../utils/apiroutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import { io } from "socket.io-client"

const Chat = () => {
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate()

  const setUser = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login")
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setTimeout(async () => {
        setLoadingUser(false);
      }, 1000);
    }
  }

  const getContacts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const req = await fetch(`${allUsersRoute}/${currentUser._id}`);
        const res = await req.json()
        setContacts(res)
      } else {
        navigate("/setavatar")
      }
    }
  }

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  useEffect(() => {
    setUser();
  }, [])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host)
      socket.current.emit("add-user",currentUser._id)
    }
  }, [currentUser])


  useEffect(() => {
    getContacts()
  }, [loadingUser])


  return (
    <div className='h-[100vh] flex flex-col bg-[#131324] justify-center items-center relative'>
      <div className="absolute z-10">
        <img className='w-[100vw] h-[100vh] opacity-5' src="https://imgs.search.brave.com/esBRi_SRR6vUsRz8OFvBxomsqFud6d9zuzYImsHGx7c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by90ZXh0dXJlXzEw/MzI2MzAtMjEzMi5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw" alt="" />
      </div>
      <div className="chat w-[85vw] h-[85vh] bg-[#00000076] overflow-hidden flex rounded-md relative z-20">
        <div className="contacts w-[30%] h-full">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        </div>
        <div className="welcome w-[70%]">
          {currentChat === undefined ? <Welcome currentUser={currentUser} loadingUser={loadingUser} /> : <ChatContainer socket={socket} currentUser={currentUser} currentChat={currentChat} />}
        </div>
      </div>
    </div>
  )
}

export default Chat
