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
    // const [boolcon, setboolcon] = useState(false)

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
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login")
        }
    }, [])


    useEffect(async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"))
        }
        setAvatars(data)
        setLoading(false)
    }, [])


    // useEffect(() => {
    //     if(localStorage.getItem("chat-app-user")){
    //       navigate("/")
    //     }
    //   }, [])
    

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please Select an Avatar", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const avatarapi = "http://localhost:3000/setAvatar";
            let a = await fetch(avatarapi, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ image: avatars[selectedAvatar], userID: user._id })
            })
            let data = await a.json();
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user))
                // setboolcon(true)
                navigate("/")
            } else {
                toast.error("Error setting avatar please try again", toastOptions)
            }
        }
    }

    return (
        <>
            {
                isLoading ? <img src="src/assets/loader.gif" alt="" /> : (
                    <div className="cont flex justify-center items-center flex-col bg-[#131324] h-[100vh] gap-10 w-[100vw]">
                        <div className="title">
                            <h1 className='text-4xl font-bold text-white'>Pick an avatar as your profile picture</h1>
                        </div>
                        <div className="avatars flex gap-14">
                            {avatars.map((avatar, index) => {
                                return (
                                    <div key={index} className={`avatar ${selectedAvatar === index ? "selected p-2 border-8 border-blue-500 rounded-full transition-all duration-200" : "selected p-2 border-8 border-transparent rounded-full"}`}>
                                        <img className='h-[100px] w-[100px]' src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => { setselectedAvatar(index) }} />
                                    </div>
                                )
                            })}
                        </div>
                        <button onClick={setProfilePicture} className='submit-btn bg-[#997af0] flex justify-center items-center text-white px-8 py-3 ease-in-out duration-200 transition-all rounded-xl border-none font-bold cursor-pointer text-xl hover:bg-[#4e0eff]'>Set as Profile Picture</button>
                    </div>

                )}
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
