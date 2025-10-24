const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcrypt');
const {User} = require('./user');

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    hashedOtp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true
    },
    used: {
        type: Boolean,
        default: false
    },
    channel: {
        type: String,
        enum: ['sms', 'email'],
        required: true
    },
    attempts: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

function createOTP(digits=6){
    let otp = '';
    for(let i=0; i<digits; i++){
        otp += crypto.randomInt(0,10).toString();
    }
    return otp
}

otpSchema.statics.generateOtp = async function (email, channel, expiryMinutes=10, digits=6) {
   try{
        const user = await User.findOne({email})
        console.log(user)
        if(!user){
            return {
                success: false,
                message: 'User does not exist'
            }
        }
        //invalidate any unused otp
        await this.updateMany(
            {user: user._id, used: false},
            {used: true}
        )

        //create otp
        const otp = createOTP(digits)
        const salt = await bcrypt.genSalt()
        const hashedOtp = await bcrypt.hash(otp, salt)

        //save the otp Documnt
        const otpDoc = await this.create({
            user: user._id,
            channel,
            expiresAt: new Date(Date.now() + expiryMinutes*60*1000),
            hashedOtp,
        })

        return {otp, otpDoc, success: true}
   }
   catch(err){
    console.error(`Error generating OTP: ${err}`)
    throw new Error('Failed to generate OTP')
   }
}

otpSchema.statics.verifyOtp = async function (email, otp) {
    const user = await User.findOne({email})
    if(!user){
        return {success: false, message: 'user does not exist'}
    }
    const otpUser = await this.findOne({user: user._id, used: false}).sort({createdAt: -1})
    
    try{
        if(!otpUser){
            return {
                success: false, 
                message: 'No valid OTP found. Please request a new one.' 
            }
        }
        if(new Date() > otpUser.expiresAt || otpUser.attempts >= 3){
            return {
                success: false,
                message: 'Otp is invalid'
            }
        }

        otpUser.attempts += 1
        await otpUser.save()

        const isValid = await bcrypt.compare(otp, otpUser.hashedOtp)

        if(!isValid){
            return {success: false, message: 'Invalid OTP'}
        }
        otpUser.used = true
        await otpUser.save()
        return {success: true, message: 'OTP verified successfully' , user}
    }
    catch(err){
        return {error: `user doesn't exist,\n error message: ${err}`}
    }
}

const Otp = mongoose.model('Otp', otpSchema)
module.exports = {Otp}