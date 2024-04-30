const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your@gmail.com',
        pass: 'yourpassword'
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
    from: 'your@gmail.com',
    to: to,
    subject: subject,
    text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail;
