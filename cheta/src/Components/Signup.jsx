import { Navigate, NavLink, Outlet, redirect, useNavigate } from 'react-router'
import { useState } from 'react'

//assets
import googleImg from '../assets/google-svgrepo-com.svg'
import facebookImg from '../assets/facebook-network-communication-internet-interaction-svgrepo-com.svg'
import xImg from '../assets/x-social-media-logo-icon (1).svg'
import eyesOpenImg from '../assets/eye-svgrepo-com.svg'
import eyesCloseImg from '../assets/eye-closed-svgrepo-com.svg'

export default function Signup(){
    const [showPassword, setShowPassword] = useState(false)
    const [ formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData)
    }

    const handleChange = (e)=>{
        let {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const showPass = ()=>{
        if (showPassword === false){
            setShowPassword(true)
        } else setShowPassword(false)
    }

    return(
        <>
            <div id="pageContainer">

                <div id="background"></div>

                <form className='px-5 pb-5 md:w-100 md:shadow md:mx-auto md:py-4 md:mt-10'>

                    <div className='text-center my-10 text-5xl font-bold'>Cheta</div>

                    <div className='font-semibold my-8'>Create your Account</div>

                    <label>
                        <div className='shadow my-8'>
                            <div className='text-xs text-gray-400 px-3'>Input Email</div>
                            <input 
                            type="text" 
                            className='outline-none pl-3'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            />
                        </div>
                    </label>

                    <div className='shadow my-8 relative'>
                        <label>
                            <div className='text-xs text-gray-400 px-3'>Password</div>
                            <input 
                            type={showPassword? 'text':'password'} 
                            className="outline-none pl-3"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            />
                        </label>

                        <button 
                            type="button" 
                            className='absolute right-2 bottom-2' 
                            onClick={showPass}>
                            {showPassword?<img src={eyesCloseImg} alt="hide" width={25}/> : 
                            <img src={eyesOpenImg} alt="reveal" width={25}/>}
                        </button>
                    </div>


                    <NavLink to="/onboarding" onClick={handleSubmit}>
                        <div className='text-center'>
                            <div className='my-8 border px-4 py-1 rounded-4xl bg-black text-white md:w-50 md:mx-auto'>
                                Sign up
                            </div>
                        </div>
                    </NavLink>
                    

                    <div>
                        <div className='text-center text-gray-600 my-8'>or Sign up with:</div>

                        <div className='text-center my-6'>
                            <img src={googleImg} alt="sign in with google" width={30} className='inline-block mx-4 shadow'/>

                            <img src={facebookImg} alt="sign in with facebook" width={30} className='inline-block mx-4'/>

                            <img src={xImg} alt="sign in with x" width={30} className='inline-block mx-4'/>
                        </div>
                    </div>

                    <div className='text-center my-10'>Already have an account? <NavLink to='/' className='underline'>Sign in instead</NavLink></div>
                </form>
            </div>
            <Outlet/>
        </>
    )
}