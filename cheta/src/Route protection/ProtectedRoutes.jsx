import { useContext } from "react"
import {AuthContext} from "./AuthContext"
import { Navigate } from "react-router"

export const ProtectedRoute = ({children})=>{
    const {token, user} = useContext(AuthContext)
    console.log(token, user)

    if(!token || !user){
        return <Navigate to='/signup'/>
    }
    return children
}