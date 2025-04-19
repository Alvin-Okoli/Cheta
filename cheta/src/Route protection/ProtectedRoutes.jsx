import { useContext } from "react"
import {AuthContext} from "./AuthContext"
import { Navigate } from "react-router"

export const ProtectedRoute = ({children})=>{
    const {token} = useContext(AuthContext)

    if(!token){
        return <Navigate to='/'/>
    }
    return children
}