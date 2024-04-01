import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';
import axios from 'axios';
import Contact from './components/Contact';

const Chat = () => {
  // const [contacts, setcontacts] = useState([])
  // const [currentUser, setcurrentUser] = useState({})
  const navigate = useNavigate()

  // useEffect(async () => {
  //   if (!localStorage.getItem("chat-app-user")) {
  //     navigate("/login")
  //   } else {
  //     const user = await JSON.parse(localStorage.getItem("chat-app-user"));
  //     setcurrentUser(user)
  //     console.log("current user is:" + currentUser)
  //   }
  // }, [])


  // useEffect(async () => {
  //   console.log("mohit123456789")
  //   console.log(currentUser)
  //   if (currentUser) {
  //     console.log("mohit")
  //     if (currentUser.isAvatarImageSet) {
  //       let a = await fetch("http://localhost:3000/allusers", {
  //         method: "POST", headers: {
  //           "Content-Type": "application/json",
  //         }, body: JSON.stringify({ userID: currentUser._id })
  //       })
  //       let data = await a.json();
  //       console.log(data)
  //       setcontacts(data)
  //     }
  //   } else {
  //     console.log("mohitfgbfgbfgbfgbfgbfgbfgbfgbfgbfgbfgbfgbfgbfgbfgbfgbfgb")
  //     navigate("/setavatar")
  //   }
  // }, [currentUser])


  return (
    <>
      <div className="cont h-[100vh] w-[100vw] flex justify-center gap-[1rem] bg-[#131324] items-center">
        <div className="cont2 h-[85vh] w-[85vw] bg-[#00000076]">
          {/* <Contact contacts={contacts} currentuser={currentUser}/> */}
          Chat
        </div>
      </div>
    </>
  )
}

export default Chat
