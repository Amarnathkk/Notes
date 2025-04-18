import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider.jsx'


function Navbar({ setquery }) {

    const { user, logout } = useAuth()





    return (
        <nav className='bg-gray-900 p-4 text-gray-200 flex justify-between items-center flex-wrap'>

            <div className='text-xl font-bold'>
                <Link to="/">Notes App</Link>
            </div>

            <div className='w-full sm:w-auto flex justify-between items-center mt-4 sm:mt-0'>
                <input className='bg-gray-700 px-14 py-2 rounded w-full sm:w-auto' type="text" placeholder='Search Notes...' onChange={(e) => setquery(e.target.value)} />
            </div>

            <div className='flex items-center mt-4 sm:mt-0'>


                {!user ? (
                    <>
                        <Link to="/login" className='bg-indigo-700 px-4 py-2 rounded mr-4 hover:bg-indigo-400'>Login</Link>
                        <Link to="/register" className='bg-green-600 px-4 py-2 rounded mr-4 hover:bg-green-400'>SignUp</Link>
                    </>
                ) : (
                    <>
                        <span className='mr-4 text-white sm:block'>{user.name}</span>
                        <button className='px-4 py-2 rounded bg-red-800 hover:bg-red-700' onClick={logout}>Logout</button>
                    </>
                )}

            </div>
        </nav>
    )
}

export default Navbar
