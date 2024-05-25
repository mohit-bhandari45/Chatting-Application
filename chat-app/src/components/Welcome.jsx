import React from 'react'
import Robot from "../assets/robot.gif"
import { useState, useEffect } from 'react'

const Welcome = ({currentUser,loadingUser}) => {
  return (
    <>
      {loadingUser ? "" : <div className='text-white w-full h-full flex justify-center items-center flex-col font-[Helvetica]'>
        <img className='h-96' src={Robot} alt="" />
        <h1 className='text-4xl font-bold'>Welcome, <span className='text-[#4e0eff]'>{currentUser.username}!</span></h1>
        <h3>Please select a chat to start messaging</h3>
      </div>}
    </>
  )
}

export default Welcome
