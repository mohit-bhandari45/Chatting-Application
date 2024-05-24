import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/apiroutes';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
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
      navigate("/")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values
      const req = await fetch(registerRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      const res = await req.json();
      if (res.status === false) {
        toast.error(res.msg, toastOptions)
      }
      if (res.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(res.user))
        navigate("/")
      }
    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password Should be same", toastOptions)
      return false
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions)
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters", toastOptions)
      return false;
    } else if (email === "") {
      toast.error('Email is required', toastOptions)
      return false
    }
    return true
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center font-[Helvetica]'>
      <form className='w-[35%] h-[85%] flex flex-col gap-8 rounded-xl bg-[#00000076] px-5 py-5 justify-center' onSubmit={handleSubmit}>
        <div className="brand flex justify-center items-center gap-3">
          <div className="image">
            <img className='w-20 h-20' src="/src/assets/logo.svg" alt="" />
          </div>
          <h1 className='text-4xl font-bold text-white uppercase'>Snap</h1>
        </div>
        <div className="inputs flex gap-5 flex-col justify-center items-center">
          <input className='bg-transparent border-x-2 border-y-2 border-[#4e0eff] rounded-md text-white w-[90%] text-xl p-3 focus:border-[#997af0] focus:outline-none' onChange={handleChange} type="text" name="username" placeholder='Username' id="" />
          <input className='bg-transparent border-x-2 border-y-2 border-[#4e0eff] rounded-md text-white w-[90%] text-xl p-3 focus:border-[#997af0] focus:outline-none' onChange={handleChange} type="email" name="email" placeholder='Email' id="" />
          <input className='bg-transparent border-x-2 border-y-2 border-[#4e0eff] rounded-md text-white w-[90%] text-xl p-3 focus:border-[#997af0] focus:outline-none' onChange={handleChange} type="password" name="password" placeholder='Password' id="" />
          <input className='bg-transparent border-x-2 border-y-2 border-[#4e0eff] rounded-md text-white w-[90%] text-xl p-3 focus:border-[#997af0] focus:outline-none' onChange={handleChange} type="password" name="confirmPassword" placeholder='Confirm Password' id="" />
        </div>
        <div className="button w-full flex justify-center items-center">
          <button type='submit' className='bg-[#997af0] w-[90%] text-white border-none font-bold p-3 cursor-pointer rounded-lg text-xl uppercase hover:bg-[#4e0eff] transition-all duration-150 ease-in-out'>Create User</button>
        </div>
        <div className="foot w-full flex justify-center items-center gap-2">
          <div className='w-[90%] flex gap-2'>
            <div className='text-white uppercase font-medium'>Already have an account?</div>
            <Link className='text-[#4e0eff] uppercase font-semibold' to="/login">Login</Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Register
