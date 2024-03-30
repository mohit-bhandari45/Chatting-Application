import React from 'react'
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate=useNavigate()
    const [values, setvalues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            let a = await fetch("http://localhost:3000/register", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify(values)
            })
            let data = await a.json();
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if(data.status===true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user))
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        if(localStorage.getItem("chat-app-user")){
          navigate("/")
        }
      }, [])

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be same", toastOptions)
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater then 3 characters", toastOptions)
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters");
            return false;
        } else if (email.length == 0) {
            toast.error("Email is required", toastOptions)
            return false;
        }
        return true;
    }


    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div className="bg-[#131324] w-[100vw] h-[100vh] flex justify-center items-center">
                <form className='bg-[#00000076] flex flex-col w-1/3 h- gap-5 p-8 border-none rounded-2xl' onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand flex justify-center items-center">
                        <img className='w-[100px] h-[100px]' src="src/assets/logo.svg" alt="logo" />
                        <h1 className='text-4xl font-bold text-white'>SNAPP</h1>
                    </div>
                    <input className='text-white bg-transparent w-[100%] text-lg p-[1rem] border-[#4e0eff] border-[1px] rounded-xl' type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
                    <input className='text-white bg-transparent w-full text-lg p-[1rem] border-[#4e0eff] border-[1px] rounded-xl' type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)} />
                    <input className='text-white bg-transparent w-full text-lg p-[1rem] border-[#4e0eff] border-[1px] rounded-xl' type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
                    <input className='text-white bg-transparent w-full text-lg p-[1rem] border-[#4e0eff] border-[1px] rounded-xl' type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)} />
                    <button className='bg-[#997af0] flex justify-center items-center text-white px-2 py-3 ease-in-out duration-200 transition-all rounded-xl border-none font-bold cursor-pointer text-xl hover:bg-[#4e0eff]' type='Submit'>CREATE A USER</button>
                    <span className='text-white uppercase'>Already have an account ? <Link className='text-[#4e0eff]' to="/login">Login</Link>
                    </span>
                </form>
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
            </div>
        </>
    )
}



export default Register
