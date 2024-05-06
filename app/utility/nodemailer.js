const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_FROM_EMAIL,
        pass: process.env.NODEMAILER_FROM_PASSWORD
    }
});

const sendTaskEmail = (assignedUserEmail) => {
    const mailBody = {
        from: process.env.NODEMAILER_FROM_EMAIL,
        to: assignedUserEmail,
        subject: 'Greetings! There is a new task for you',
        html: `<p>Hello,</p>
                <p>One new task has assign to you, please check it out</p>`
    }

    transporter.sendMail(mailBody, (error, info) => {
        if (error) {
            console.log('Error While sending Email', error.message)
        } else {
            console.log('Email sent successfully', info.response)
        }
    })
}

const sendRegistrationEmail = (userEmail, userName) => {
    const mailBody = {
        from: process.env.NODEMAILER_FROM_EMAIL,
        to: userEmail,
        subject: 'Congratulation! Your account has been created',
        html: `<p>Hello,  ${userName}</p>
                <p>Thankyou for registering with us, Keep enjoying our app</p>`
    }

    transporter.sendMail(mailBody, (error, info) => {
        if (error) {
            console.log('Error While sending Registration Email', error.message)
        } else {
            console.log('Registration Email sent successfully', info.response)
        }
    })
}


module.exports = { sendTaskEmail, sendRegistrationEmail }