import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'

const AuthContext = createContext()

const AuthProvider = ({children})=>{

    const [token, setToken] = useState(Cookies.get('token'))

    const login =  async (email, password) =>{
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const data = await response.json()
        setToken(data.token)
    }

    useEffect(()=>{
        if(token){
            Cookies.set('token', token, {expires: 7});
        } else {
            Cookies.remove('token')
        }
    }, [token])

    return(
        <AuthContext.Provider value={{token, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}