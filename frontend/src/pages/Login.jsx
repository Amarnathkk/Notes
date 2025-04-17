import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider.jsx'


function Login() {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );

      if (response.data.success) {
        login(response.data.user)
        localStorage.setItem("token", response.data.token)

        navigate("/")
      }


    }
    catch (error) {
      console.log(error);


    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen px-4'>

      <div className='border shadow-lg p-6 w-80 sm:w-96 bg-white'>

        <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>

        <form onSubmit={handlesubmit}>

          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="email">Email</label>
            <input onChange={(e) => setemail(e.target.value)} className='w-full px-3 py-2 border' type="email" placeholder='Enter Your Email' required />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="password">Password</label>
            <input onChange={(e) => setpassword(e.target.value)} className='w-full px-3 py-2 border' type="password" placeholder='Enter Your password' required />
          </div>

          <button type='submit' className='w-full bg-gray-800 text-white py-2 rounded hover:bg-green-600 mb-4 hover:text-black'>Login</button>
          <p>Don't have an account <Link to="/register" className='underline hover:text-blue-600 mx-1' >SignUp</Link></p>

        </form>
      </div>

    </div>
  )
}

export default Login