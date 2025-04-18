import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const authContext = createContext()


function ContextProvider({ children }) {



    const [user, setuser] = useState()
    const backendurl = import.meta.env.VITE_BACKEND_URL

    const login = (user) => {
        setuser(user)
    }

    const logout  = ()=>{
        localStorage.removeItem("token")
        setuser(null)
    }


    useEffect(() => {

        const verifyuser = async () => {
            try {
                const response = await axios.get(backendurl+"/api/auth/verify", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                if (response.data.success) {
                    setuser(response.data.user)
                }

                else {
                    setuser(null)
                }

            }
            catch (error) {
                console.log(error);

            }
        }
        verifyuser()
    }, [])

    return (

        <authContext.Provider value={{ user, login,logout,backendurl }}>
            {children}
        </authContext.Provider>

    )
}


export const useAuth = () => useContext(authContext)

export default ContextProvider