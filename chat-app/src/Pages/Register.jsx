import React from 'react'
import { Link } from 'react-router-dom';
const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("form")
    }

    const handleChange=(e) => {
      
    }
    

    return (
        <>
                <form className='bg-blue-400' onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img className='w-[100px] h-[100px]' src="src/assets/logo.svg" alt="logo" />
                        <h1>Snapp</h1>
                    </div>
                    <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
                    <input type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Confirm Password' name='confirm password' onChange={(e) => handleChange(e)} />
                    <button type='Submit'>Create a User</button>
                    <span>Already have an account ? <Link to="/login">Login</Link>
                    </span>
                </form>
        </>
    )
}



export default Register
