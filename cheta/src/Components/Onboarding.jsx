import { useState } from "react"


export default function Onboarding(){

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        dob: '',
        gender: '',
        idNumber: ''
    })

    const handleChange = (e)=>{
        let {name, value} = e.target;
        setFormData({
            ...formData,
         [name] : value
        })
    }

    return(
        <>
        <div id="pageContainer" className="mx-3">

            <div id="background">
            </div>

            <div id="form" className="text-gray-500 text-sm">

                <div className='my-10 text-center text-black text-5xl font-bold'>Cheta</div>

                    <div className="pl-2 text-black text-3xl font-semibold">Create a new account</div>

                <div className="shadow my-8 m-2 px-3 py-1 min-w-xl mx-auto">
                <label>
                        <div>
                            <div>First Name</div>
                            <input 
                            type="text" 
                            className="text-black h-10"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            />
                        </div>
                    </label>
                </div>

                <div className="shadow my-8 m-2 px-3 py-1 min-w-xl mx-auto">
                <label>
                        <div>
                            <div>Middle Name</div>
                            <input 
                            type="text" 
                            className="text-black h-10"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            />
                        </div>
                    </label>
                </div>

                    <div className="shadow my-8 m-2 px-3 py-1 min-w-xl mx-auto">
                    <label>
                        <div>
                            <div>Last Name</div>
                            <input 
                            type="text" 
                            className="text-black h-10"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            />
                        </div>
                    </label>
                    </div>

                    <div className="shadow my-8 m-2 px-3 py-1 min-w-xl mx-auto">
                    <label>
                        <div>
                            <div>Phone Number</div>
                            <input 
                            type="email" 
                            className="text-black h-10"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            />
                        </div>
                    </label>
                    </div>

                    <div className="shadow my-8 m-2 px-3 py-1 min-w-xl mx-auto">
                    <label>
                        <div>Date of Birth</div>
                        <input 
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        />
                    </label>
                    </div>


                    <div>
                        <div>Gender:</div>
                        <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        >
                            <option value="male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label>
                            <div className="inline-block mr-4">Id Number : </div>
                            <input 
                            type="number" 
                            className="shadow"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleChange}
                            />
                        </label>
                    </div>
            </div>
        </div>
        </>
    )
}