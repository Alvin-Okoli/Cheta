import { useContext, useEffect, useState } from 'react'  
import { AuthContext } from './AuthContext'
import { Navigate } from 'react-router'

export function ProfileRedirect({children}){
    const {token, user, getUser} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)  

    useEffect(
        ()=>{
           const fetchUser = async ()=>{
               if(token && !user && !isLoading){
                   setIsLoading(true)
                   try{
                       getUser(token)
                   return <Navigate to='/' replace/>
                   }
                   catch(err){
                       console.log(err)
                   }
                   finally{
                       setIsLoading(false)
                   }
           }}

           fetchUser()
       }, [])

       if(token && !user && isLoading){
           return <div>Loading...</div>
    }
    
    if(token && user){
        return <Navigate to='/' replace/>
    }
    return children
}