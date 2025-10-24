require('dotenv').config()
const nodemailer = require('nodemailer')


const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS
    }
})

async function sendEmail({to, subject, html, text}){
    try{
        const info = await transport.sendMail({
            from: process.env.EMAILUSER,
            to,
            subject,
            html,
            text,
            headers: {
                'x-priority': '1',
                'x-msmail-priority': 'High',
                'importance': 'High'
            }
        })
        console.log('Email sent: ', info.messageId)
        return info
    }catch(err){
        console.log(err)
    }
}

// sendEmail({
//     to: 'okolichiomasharon@gmail.com',
//     subject: 'Test Email from Nodemailer',
//     html: '<h1>This is a test email sent using Nodemailer</h1>',
//     text: 'This is a test email sent using Nodemailer'
// });

module.exports = sendEmail;