const Email = require("../models/email-model")

const emailValidations = {
    to: {
        in: ['body'],
        exists: {
            errorMessage: 'Recipient email is required',
        },
        notEmpty: {
            errorMessage: 'Recipient email cannot be empty',
        },
        isEmail: {
            errorMessage: 'Recipient email must be a valid email address',
        },
        trim: true,
        normalizeEmail: true
    },
    subject: {
        in: ['body'],
        exists: {
            errorMessage: 'Subject is required',
        },
        notEmpty: {
            errorMessage: 'Subject cannot be empty',
        },
        trim: true
    },
    text: {
        in: ['body'],
        exists: {
            errorMessage: 'Email text is required',
        },
        notEmpty: {
            errorMessage: 'Email text cannot be empty',
        },
        trim: true
    }
};

module.exports = { emailValidations };
