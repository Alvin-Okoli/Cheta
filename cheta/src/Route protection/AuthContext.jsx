import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'

const AuthContext = createContext()

const AuthProvider = ({children})=>{

    const [token, setToken] = useState(Cookies.get('token'))
    const [user, setUser] = useState(null)

    useEffect(()=>{//used to set the token in the cookies when the user logs in and remove it when the user logs out
        if(token){
            Cookies.set('token', token, {expires: 2});
        } else {
            Cookies.remove('token')
        }
    }, [token])

    const signup =  async (email, password) =>{//this function is used to login the user and set the token and user state

        try{
            const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const data = await response.json()
        console.log(data)
        setUser(data.user)
        setToken(data.token)}
        catch(err){
            console.log(err)
        }
    }

    const login =  async (email, password) =>{//this function is used to login the user and set the token and user state

        try{
            console.log(email, password)
            const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const data = await response.json()
        console.log(data)
        setUser(data.user)
        setToken(data.token)}
        catch(err){
            console.log(err)
        }
    }

    const getUser = async (tokens)=>{//this is used to check if the user is logged in or not and get the user data in the login page
        try{
            const res = await fetch(`http://localhost:5000/user/${tokens}`)
            let client = await res.json()
            console.log(client)
            setUser(client.user)
        }
        catch(err){
            console.log(err)
        }
    }    
    
    const logout = ()=>{
        setUser(null)
        setToken(null)
    }

    return(
        <AuthContext.Provider value={{token, user, setUser, login,logout, signup, getUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}