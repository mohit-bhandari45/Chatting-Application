import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';
import axios from 'axios';

const SetAvatar = () => {
    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [selectedAvatar, setselectedAvatar] = useState(undefined)
    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
    }

    useEffect(async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"))
        }
        setAvatars(data)
        isLoading(false)
    }, [])


    return (
        <>
            <div className="cont flex justify-center items-center flex-col bg-[#131324] h-[100vh] gap-16 w-[100vw]">
                <div className="title">
                    <h1 className='text-4xl font-bold text-white'>Pick an avatar as your profile picture</h1>
                </div>
                <div className="avatars flex gap-20">
                    {avatars.map((avatar, index) => {
                        return (
                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                <img className='h-[100px] w-[100px]' src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => { setselectedAvatar(index) }} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
        </>
    )
}

export default SetAvatar
