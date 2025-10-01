import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../Route protection/AuthContext';
import penImg from '../assets/pen-svgrepo-com.svg'

export default function Profile(){
    let {user, setUser, logout} = useContext(AuthContext)
    const [edit, setEdit] = useState(false)
    const [newUser, setNewUser] = useState({
        username: '',
        bio: '',
        phoneNumber: '',
        birthday: '',
        location: '',
        gender: ''
    })

    const info = [
        { label: 'Name', name: 'username' },
        { label: 'Bio', name: 'bio' },
        { label: 'Phone Number', name: 'phoneNumber' },
        { label: 'Birthday', name: 'birthday' },
        { label: 'Location', name: 'location' },
        { label: 'Gender', name: 'gender' }
    ]

    useEffect(()=>{
        if(user) setNewUser({...user})
        console.log({user})
    }, [user])

    const editInput = ()=>{//this is to handle the edit button click
        setEdit(!edit)
    }

    const handleInputChange = (e)=>{//this is to handle the input changes 
        let {name, value} = e.target
        setNewUser({...newUser, [name]: value})
    }

    const updateField = async ()=>{//this is to handle the update of the user profil
        const changes = Object.keys(newUser).some((key)=>newUser[key] !== user[key])

        console.log(changes, newUser)

        if(changes){
            try{
                const res = await fetch(`https://cheta-boqy.onrender.com/update/${user._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newUser)
            })
            let data = await res.json()
            setUser(data.user)
            }
            catch(err){
                console.error('Failed to update profile:', error)
            }
        }
        setEdit(false)
    }

    return(
    <div>
        <div className='p-8 mx-auto mt-10 text-2xl y-20 min-w-96 max-w-[500px] relative'>
            {edit ?
            <button onClick={updateField} className='border px-4 py-2 rounded-4xl bg-blue-400 text-sm text-white font-semibold absolute right-0 cursor-pointer top-16'>Done</button>

            :

            <img src={penImg} onClick={editInput} className='absolute p-2 right-0 border-2 rounded-4xl cursor-pointer top-16' width={40}/>
            } 
            
            <div>
                <div className='my-8 text-center relative'>
                    <h1 className='my-4 text-4xl font-bold'>Profile</h1>
                </div>

                <div className='mt-10 grid grid-cols-2'>
                        <div className='font-semibold'>Email: </div>
                        <div>{user?.email || <span>n/a</span>} </div>
                    </div>

                <div>
                    {info.map((infos, i)=>(
                        <div key={i} className='grid grid-cols-2'>                        
                            <div className='font-semibold'>{infos.label}:</div>
                            {edit?
                                <input 
                                type="text" 
                                name={infos.name}
                                value={newUser[infos.name] ?? ''}
                                onChange={handleInputChange}
                                className='outline-8 border rounded-2xl px-3'
                                />
                                :
                                <div className='min-w-32 bg-gray-50'>{newUser?.[infos.name] || `no ${infos.label}`}
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>

                <div className='text-center mt-10'>
                    <button className='border px-3 py-1 rounded-4xl text-sm text-white font-semibold bg-blue-400 mx-auto cursor-pointer' onClick={logout}>Logout</button>
                </div>
            </div>
            
    </div>
    )
}
