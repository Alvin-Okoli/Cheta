import { Navigate, NavLink, Outlet, redirect, useNavigate } from 'react-router'
import { useState, useContext } from 'react'
import { AuthContext } from '../Route protection/AuthContext'

//assets
import googleImg from '../assets/google-svgrepo-com.svg'
import facebookImg from '../assets/facebook-network-communication-internet-interaction-svgrepo-com.svg'
import xImg from '../assets/x-social-media-logo-icon (1).svg'
import eyesOpenImg from '../assets/eye-svgrepo-com.svg'
import eyesCloseImg from '../assets/eye-closed-svgrepo-com.svg'

export default function Signup(){
    const [showPassword, setShowPassword] = useState(false)
    let {signup} = useContext(AuthContext)
    const navigate = useNavigate()
    const [ formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData)
        try{
            signup(formData.email, formData.password)
            return navigate('/')
        }
        catch(err){
            console.log(err)
        }
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

                <form className='px-5 pt-0.5 md:w-100 md:shadow md:mx-auto md:pb-10 md:mt-10'>

                    <div className='text-center mt-5 mb-20 text-5xl font-bold'>Cheta</div>

                    <div className='font-semibold my-8'>Create your Account</div>

                    <label>
                        <div className='shadow my-8 bg-gray-50'>
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

                    <div className='shadow my-8 relative bg-gray-50'>
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


                    <>
                        <div className='text-center'>
                            <div className='my-12 border px-4 py-1 rounded-4xl bg-black text-white md:w-50 md:mx-auto' onClick={handleSubmit}>
                                Sign up
                            </div>
                        </div>
                    </>
                    

                    

                    <div className='text-center my-20'>Already have an account? <NavLink to='/login' className='underline'>Sign in instead</NavLink></div>
                </form>
            </div>
            <Outlet/>
        </>
    )
}