import React from 'react'
import { useState, useEffect } from 'react'
import Logo from "../assets/logo.svg"

const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])


    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }



    return (
        <>
            {currentUserImage && currentUserName && (
                <div className="contact w-full bg-[#080420] font-[Helvetica] flex flex-col justify-center h-full">
                    <div className="brand flex justify-center items-center gap-4 h-[10%] py-10">
                        <img className='w-10 h-10 cursor-pointer transition-all duration-200 hover:scale-110 ease-in-out' src="https://imgs.search.brave.com/EipqmKKEBfKQzZepy7gntiE7pdbvFocQv-sCVwPRkGc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9lbS1j/b250ZW50LnpvYmou/bmV0L2NvbnRlbnQv/MjAxNS8wOC8yNi9z/bmFwY2hhdC1zY3Jl/ZW5zaG90LXRha2Vu/LW9mLWNoYXQtbWVz/c2FnZS5wbmc" alt="Logo" />
                        <h1 className='text-white font-bold text-2xl uppercase'>Snap</h1>
                    </div>
                    <div className="contacts flex flex-col justify-center items-center gap-4 overflow-auto h-[75%] pt-12">
                        {contacts.map((contact, index) => {
                            return (
                                <div key={index} onClick={() => {
                                    changeCurrentChat(index, contact)
                                }} className={index === currentSelected ?"contact transition-all duration-500 ease-in-out cursor-pointer p-2 gap-5 flex justify-start rounded-md items-center w-[90%] bg-[#867bea]" : "contact bg-[#ffffff39] transition-all duration-500 ease-in-out cursor-pointer p-2 gap-5 flex justify-start rounded-md items-center w-[90%]"}>
                                    <div className="avatar">
                                        <img className='w-16 h-16 cursor-pointer transition-all duration-200 hover:scale-110 ease-in-out' src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                    </div>
                                    <div className="username">
                                        <h1 className='font-bold text-xl text-white'>{contact.username}</h1>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="current-user bg-[#0d0d30] flex justify-center items-center gap-5 h-[15%] py-5">
                        <div className="avatar">
                            <img className='w-16 h-16 cursor-pointer transition-all duration-200 hover:scale-110 ease-in-out' src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                        </div>
                        <div className="username">
                            <h1 className='text-white font-bold text-xl'>{currentUserName}</h1>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Contacts
