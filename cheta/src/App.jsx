import { useState } from 'react'
import './App.css'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Onboarding from './Components/Onboarding'
import {ProtectedRoute} from './Route protection/ProtectedRoutes'

const router = createBrowserRouter(
  createRoutesFromElements(
  <>
    <Route path='/' element={<Login/>}/>
    <Route path='signup' element={<Signup/>}/>
    <Route path='/onboarding' element={<ProtectedRoute><Onboarding/></ProtectedRoute>}/>

    {/* <Route path='*' element={}/> */}
  </>
    
  )
)

function App() {
  return (<RouterProvider router={router}/>)
}

export default App
