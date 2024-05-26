import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAvatarRoute } from '../utils/apiroutes';
import loader from "../assets/loader.gif"
import axios from "axios"
import { Buffer } from "buffer"

const SetAvatar = () => {
    const api = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        closeOnClick: true,
    }

    const avatarSetting = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
            const buffer = new Buffer(image.data)
            data.push(buffer.toString("base64"))
        }
        setAvatars(data)
        setIsLoading(false)
    }

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please Select an Avatar", toastOptions)
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const req = await fetch(`${setAvatarRoute}/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    { image: avatars[selectedAvatar] }
                ),
            })
            const res = await req.json();
            if (res.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = res.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user))
                navigate("/chat")
            } else {
                toast.error("Error setting avatar, please try again", toastOptions)
            }
        }
    }


    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login")
        }
        avatarSetting()
    }, [])

    return (
        <>
            {
                isLoading ? <div className='w-full h-[100vh] justify-center flex items-center'>
                    <img className='loader' src={loader} alt="" />
                </div> : <div className='relative'>
                    <div className="absolute z-10">
                        <img className='w-[100vw] h-[100vh] opacity-[0.03]' src="https://imgs.search.brave.com/esBRi_SRR6vUsRz8OFvBxomsqFud6d9zuzYImsHGx7c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by90ZXh0dXJlXzEw/MzI2MzAtMjEzMi5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw" alt="" />
                    </div>
                    <div className="main w-full h-[100vh] font-[Helvetica] flex flex-col justify-center items-center gap-12 relative z-20">
                        <div className="title">
                            <h1 className='text-white text-4xl font-bold'>Pick your avatar as you profile picture</h1>
                        </div>
                        <div className="avatars flex gap-8">
                            {avatars.map((avatar, index) => {
                                return <div key={index} className={`avatar flex border-8 justify-center items-center transition-all duration-300 ease-in-out rounded-full p-2 ${selectedAvatar === index ? "border-[#7b54e8]" : "border-transparent"}`}>
                                    <img className='h-28 w-28 cursor-pointer transition-all duration-200 hover:scale-105 ease-in-out' onClick={() => setSelectedAvatar(index)} src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
                                </div>
                            })}
                        </div>
                        <button onClick={setProfilePicture} className='bg-[#997af0] w-[20%] text-white border-none font-bold p-3 cursor-pointer rounded-lg text-xl uppercase hover:bg-[#4e0eff] transition-all duration-150 ease-in-out'>Set as Profile Picture</button>
                    </div>
                </div>
            }
            <ToastContainer />
        </>
    )
}

export default SetAvatar
