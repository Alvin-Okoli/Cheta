import { useContext, useEffect, useState } from 'react'  
import { AuthContext } from './AuthContext'
import { Navigate } from 'react-router'

export function ProfileRedirect({children}){
    const {token, user, getUser} = useContext(AuthContext)

    useEffect(
        ()=>{
           const fetchUser = async ()=>{
               if(token && !user){
                   try{
                       getUser(token)
                   return <Navigate to='/' replace/>
                   }
                   catch(err){
                       console.log(err)
                   }
           }}

           fetchUser()
       }, [])
    
    if(token && user){
        return <Navigate to='/' replace/>
    }
    return children
}