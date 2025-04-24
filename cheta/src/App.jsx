import './App.css'
import { useState } from 'react'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router'

//components
import Login from './Components/Login'
import Signup from './Components/Signup'
import Onboarding from './Components/Onboarding'
import {ProtectedRoute} from './Route protection/ProtectedRoutes'
import Profile from './Components/Profile'
import { ProfileRedirect } from './Route protection/ProfileRedirect'

const router = createBrowserRouter(
  createRoutesFromElements(
  <>
    <Route path='/' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    <Route path='/signup' element={<ProfileRedirect><Signup/></ProfileRedirect>}/>
    <Route path='/onboarding' element={<ProtectedRoute><Onboarding/></ProtectedRoute>}/>
    <Route path='/login' element={<ProfileRedirect><Login/></ProfileRedirect>}/>

    {/* <Route path='*' element={}/> */}
  </>
    
  )
)

function App() {
  return (<RouterProvider router={router}/>)
}

export default App
