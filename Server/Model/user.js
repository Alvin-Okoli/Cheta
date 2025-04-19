const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 6
    },
    firstName: {
        type: String,
        default: null
    },
    middleName: {
        type: String, 
        default: null    
    },
    lastName: {
        type: String,  
        default: null   
    },
    birthday: {
        type: Number,
        default: null     
    },
    gender: {
        type: String,  
        default: null 
    },
    idNumber: {
        type: String,
        default: null  
    }
})

userSchema.pre('save', async function(next){
    if(this.password){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)
    }
    
    next();
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error ('incorrect password')
    }
    throw Error ('incorrect email')
}

// userSchema.statics.findOrCreate = async function(email){
//     const user = await this.findOne({email})
//     if(!user){
//         user = await this.create({email})
//     }
//     return user
// }

const User = mongoose.model('User', userSchema)

module.exports = {User} 

