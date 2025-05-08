import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../Route protection/AuthContext';
import penImg from '../assets/pen-svgrepo-com.svg'

export default function Profile(){

    const [edit, setEdit] = useState(false)
    const [newUser, setNewUser] = useState({
        username: '',
        bio: '',
        phoneNumber: '',
        birthday: '',
        location: '',
        gender: ''
    })
    let {user, setUser, logout} = useContext(AuthContext)

    useEffect(()=>{
        setNewUser({...newUser, user})
    }, [user])

    const editInput = ()=>{//this is to handle the edit button click
            setEdit(true)
    }

    const handleUpdate = async (e)=>{//this is to handle the input changes 
        e.preventDefault()
        let {name, value} = e.target
        setNewUser({...newUser, [name]: value})
    }

    const updateField = async (e)=>{//this is to handle the update of the user profile
        e.preventDefault()
        let changes = 0

        Object.keys(newUser).forEach((key)=>{
            console.log(key)
            if(newUser[key] !== user[key]){
                changes ++ 
            }
        })
        console.log(changes, newUser)

        if(changes > 0){
            const res = await fetch('https://cheta-boqy.onrender.com/update/${user._id}', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newUser)
            })
            let data = await res.json()
            setUser(data.user)
        }

        changes = 0
        setEdit(false)
    }

    return(
    <div>
        <div className='p-8 mx-auto mt-10 text-2xl y-20 min-w-96 max-w-[500px] relative'>
            {edit ?
            <div type="text" onClick={updateField} className='border px-4 py-2 rounded-4xl bg-blue-400 text-sm text-white font-semibold absolute right-0 cursor-pointer top-16'>Done</div>

            :

            <img src={penImg} onClick={editInput} className='absolute p-2 right-0 border-2 rounded-4xl cursor-pointer top-16' width={40}/>
            } 
            
            <div>
                <div className='my-8 text-center relative'>
                    <div className='my-4 text-4xl font-bold'>Profile</div>
                </div>

                <div>
                    <div className='grid grid-cols-2'>
                        
                        <div className='font-semibold'>Name: </div>
                        {edit?
                            <input 
                            type="text" 
                            name="username"
                            value={newUser.username || user.username}
                            onChange={handleUpdate}
                            className='outline-8 border rounded-2xl px-3'
                            />
                            :
                            <div className='min-w-32 bg-gray-50'>{user.username || <span>n/a</span>}</div>}
                    </div>

                    <div className='my-5 grid grid-cols-2'>
                        <div className='font-semibold'>email: </div>
                        <div>{user.email || <span>n/a</span>} </div>
                    </div>

                    <div className='my-5 grid grid-cols-2'>
                        <div className='font-semibold'>Bio: </div>
                        {edit?
                            <input 
                            type="text" 
                            name='bio'
                            value={newUser.bio || user.bio}
                            onChange={handleUpdate}
                            className='outline-8 border rounded-2xl px-3'
                            />
                            :
                            <div className='min-w-32 bg-gray-50'>{user.bio || <span>n/a</span>}</div>}
                    </div>

                    <div className='my-5 grid grid-cols-2'>  
                        <div>Phone Number:</div>
                        {edit?
                            <input 
                            type="text" 
                            name='phoneNumber'
                            value={newUser.phoneNumber || user.phoneNumber}
                            onChange={handleUpdate}
                            className='outline-8 border rounded-2xl px-3'
                            />
                            :
                            <div className='min-w-32 bg-gray-50'>{user.phoneNumber || <span>n/a</span>}</div>}  
                    </div>

                    <div className='my-5 grid grid-cols-2'>
                        <div>Birthday: </div>
                        {edit?
                            <input 
                            type="text" 
                            name='birthday'
                            value={newUser.birthday || user.birthday}
                            onChange={handleUpdate}
                            className='outline-8 border rounded-2xl px-3'
                            />
                            :
                            <div className='min-w-32 bg-gray-50'>{user.birthday || <span>n/a</span>}</div>} 
                    </div>

                    <div className='my-5 grid grid-cols-2'>
                    <div>Location:</div>
                    {edit?
                            <input 
                            type="text" 
                            name='location'
                            value={newUser.location || user.location}
                            onChange={handleUpdate}
                            className='outline-8 border rounded-2xl px-3'
                            />
                            :
                            <div className='min-w-32 bg-gray-50'>{user.location || <span>n/a</span>}</div>} 
                    </div>

                    <div className='my-5 grid grid-cols-2'>
                        <div className=''>Gender: </div>
                        {edit?
                            <input 
                            type="text" 
                            name='gender'
                            value={newUser.gender || user.gender}
                            onChange={handleUpdate}
                            className='outline-8 border rounded-2xl px-3'
                            />
                            :
                            <div className='min-w-32 bg-gray-50'>{user.gender || <span>n/a</span>}</div>}
                    </div>

                    </div>
                </div>

                <div className='text-center mt-10'>
                    <button className='border px-3 py-1 rounded-4xl text-sm text-white font-semibold bg-blue-400 mx-auto cursor-pointer' onClick={logout}>Logout</button>
                </div>
            </div>
            
    </div>
    )
}
