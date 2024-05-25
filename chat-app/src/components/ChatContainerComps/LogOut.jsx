import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiPowerOff } from "react-icons/bi"

const LogOut = () => {
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate("/login")
    }

    return (
        <button onClick={handleClick} className='bg-[#9a86f3] p-2 rounded-xl border-none outline-none flex justify-center items-center cursor-pointer'>
            <BiPowerOff className='text-[#ebe7ff] text-2xl' />
        </button>
    )
}

export default LogOut
