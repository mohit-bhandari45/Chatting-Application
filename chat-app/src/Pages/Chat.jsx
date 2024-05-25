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
    <div className='h-[100vh] flex flex-col bg-[#131324] justify-center items-center'>
      <div className="chat w-[85vw] h-[85vh] bg-[#00000076] overflow-hidden flex">
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
