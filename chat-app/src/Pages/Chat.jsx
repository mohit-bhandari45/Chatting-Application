import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';
import axios from 'axios';

const Chat = () => {
  const navigate = useNavigate()
  return (
    <h1 style={{color: "#fff"}}>
      Chat component
    </h1>
  )
}

export default Chat
