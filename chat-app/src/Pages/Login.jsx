import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/apiroutes';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  }

  useEffect(() => {
    if(localStorage.getItem("chat-app-user")){
      navigate("/chat")
    }
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username } = values
      const req = await fetch(loginRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
      const res = await req.json();
      if (res.status === false) {
        toast.error(res.msg, toastOptions)
      }
      if (res.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(res.user))
        navigate("/chat")
      }
    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleValidation = () => {
    const { password, username } = values
    if (password === "") {
      toast.error("Email and Password is required", toastOptions)
      return false;
    } else if (username.length === "") {
      toast.error("Email and Password is required", toastOptions)
      return false;
    }
    return true
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center font-[Helvetica] relative'>
      <div className="absolute z-10">
        <img className='w-[100vw] h-[100vh] opacity-[0.03]' src="https://imgs.search.brave.com/esBRi_SRR6vUsRz8OFvBxomsqFud6d9zuzYImsHGx7c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by90ZXh0dXJlXzEw/MzI2MzAtMjEzMi5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw" alt="" />
      </div>
      <form className='w-[32%] h-[65%] flex flex-col gap-8 rounded-xl bg-[#00000076] px-5 py-5 justify-center relative z-20' onSubmit={handleSubmit}>
        <div className="brand flex justify-center items-center gap-4">
          <div className="image">
            <img className='w-14 h-14 cursor-pointer transition-all duration-200 hover:scale-110 ease-in-out' src="https://imgs.search.brave.com/EipqmKKEBfKQzZepy7gntiE7pdbvFocQv-sCVwPRkGc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9lbS1j/b250ZW50LnpvYmou/bmV0L2NvbnRlbnQv/MjAxNS8wOC8yNi9z/bmFwY2hhdC1zY3Jl/ZW5zaG90LXRha2Vu/LW9mLWNoYXQtbWVz/c2FnZS5wbmc" alt="" />
          </div>
          <h1 className='text-4xl font-bold text-white uppercase'>Snap</h1>
        </div>
        <div className="inputs flex gap-5 flex-col justify-center items-center">
          <input className='bg-transparent border-x-2 border-y-2 border-[#4e0eff] rounded-md text-white w-[90%] text-xl p-3 focus:border-[#997af0] focus:outline-none' onChange={handleChange} type="text" name="username" placeholder='Username' id="" min="3" />
          <input className='bg-transparent border-x-2 border-y-2 border-[#4e0eff] rounded-md text-white w-[90%] text-xl p-3 focus:border-[#997af0] focus:outline-none' onChange={handleChange} type="password" name="password" placeholder='Password' id="" />        </div>
        <div className="button w-full flex justify-center items-center">
          <button type='submit' className='bg-[#997af0] w-[90%] text-white border-none font-bold p-3 cursor-pointer rounded-lg text-xl uppercase hover:bg-[#4e0eff] transition-all duration-150 ease-in-out'>Login</button>
        </div>
        <div className="foot w-full flex justify-center items-center gap-2">
          <div className='w-[90%] flex gap-2'>
            <div className='text-white uppercase font-medium'>Don't have an account?</div>
            <Link className='text-[#4e0eff] uppercase font-semibold cursor-pointer transition-all duration-200 hover:scale-105 ease-in-out' to="/">Register</Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
