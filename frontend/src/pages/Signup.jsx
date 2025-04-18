import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/ContextProvider'




function Signup() {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    const {backendurl} = useAuth()

    const handlesubmit = async (e) => {
        
        e.preventDefault()
       
        try {
            const response = await axios.post(
                backendurl+'/api/auth/register',
                { name, email, password }
            );
            

            if (response.data.success) {
                navigate("/login")

            }


        }
        catch (error) {
            console.log(error);


        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen px-4'>

            <div className='border shadow-lg p-6 w-80 sm:w-96 bg-white'>

                <h2 className='text-2xl font-bold mb-4 text-center'>SignUp</h2>

                <form onSubmit={handlesubmit}>

                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="name">Name</label>
                        <input onChange={(e) => setname(e.target.value)} className='w-full px-3 py-2 border' type="text" placeholder='Enter Your Name' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="email">Email</label>
                        <input onChange={(e) => setemail(e.target.value)} className='w-full px-3 py-2 border' type="email" placeholder='Enter Your Email' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="password">Password</label>
                        <input onChange={(e) => setpassword(e.target.value)} className='w-full px-3 py-2 border' type="password" placeholder='Enter Your password' required />
                    </div>

                    <button type='submit' className='w-full bg-gray-800 text-white py-2 rounded hover:bg-green-600 hover:text-black mb-4'>SignUp</button>
                    <p>Already Have An Account? <Link to="/login" className='underline hover:text-blue-600 mx-1'  >Login</Link></p>

                </form>
            </div>

        </div>
    )
}

export default Signup