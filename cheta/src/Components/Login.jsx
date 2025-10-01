import { useNavigate, NavLink, Outlet, redirect } from 'react-router'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../Route protection/AuthContext'

//assets
import googleImg from '../assets/google-svgrepo-com.svg'
import facebookImg from '../assets/facebook-network-communication-internet-interaction-svgrepo-com.svg'
import xImg from '../assets/x-social-media-logo-icon (1).svg'
import eyesOpenImg from '../assets/eye-svgrepo-com.svg'
import eyesCloseImg from '../assets/eye-closed-svgrepo-com.svg'

 {/* <div>
        <div className='text-center text-gray-600 my-8'>or Sign in with:</div>

        <div className='text-center my-6'>
            <a href='http://localhost:5000/auth/google' className='cursor-pointer'>
                <img 
                src={googleImg} 
                alt="sign in with google" 
                width={30} 
                className='inline-block mx-4'
                />
            </a>

            </div>
        </div> */}

export default function Login(){
    const navigate = useNavigate()
    const {login, token, getUser} = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setformData] = useState({
        email: "",
        password: ''
    })

    useEffect(()=>{
            getUser(token)
        }, [])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(formData)
        try{
            await login(formData.email, formData.password)
            return navigate('/')
        }
        catch(err){
            console.log(err)
        }
    }

    const showPass = ()=>{
        setShowPassword(!showPassword)
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setformData({
            ...formData,
            [name]: value
        })
    }


    return(
        <>
            <div id="pageContainer">

                <form className='px-5 pt-0.5 md:w-100 md:shadow md:mx-auto md:pb-10 md:mt-10'>

                    <div className='text-center mt-5 mb-20 text-5xl font-bold'>Cheta</div>

                    <div className='font-semibold my-8'>Login to your Account</div>

                    <label>
                        <div className='shadow my-8 bg-gray-50'>
                            <div className='text-xs text-gray-400 px-3'>Input Email</div>
                            <input 
                            type="text" 
                            className='outline-none pl-3 w-full'
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
                            className="outline-none pl-3 w-full"
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

                    <div className='text-center'>
                        <button className='my-12 border px-4 py-2 rounded-4xl bg-black text-white cursor-pointer md:w-50 md:mx-auto' onClick={handleSubmit}
                            >Sign in
                        </button>
                    </div>

                    <div className='text-center my-16'>Dont have an account yet? <NavLink to='/signup' className='underline'>Sign up</NavLink></div>
                </form>
            </div>
            <Outlet/>
        </>
    )
}